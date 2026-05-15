import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { LoginInput, RegisterInput } from "./auth.validators";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_DAYS = 7;
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MINUTES = 15;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET is missing or too weak");
  }

  return secret;
}

function signAccessToken(user: { id: string; role: string }) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    getJwtSecret(),
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
}

function safeUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function createRawRefreshToken() {
  return crypto.randomBytes(48).toString("hex");
}

function getRefreshExpiry() {
  return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
}

function getLockUntilDate() {
  return new Date(Date.now() + LOCK_TIME_MINUTES * 60 * 1000);
}

function isLocked(lockedUntil: Date | null) {
  if (!lockedUntil) return false;
  return lockedUntil.getTime() > Date.now();
}

async function createRefreshToken(userId: string) {
  const rawToken = createRawRefreshToken();

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(rawToken),
      userId,
      expiresAt: getRefreshExpiry(),
    },
  });

  return rawToken;
}

export async function registerUser(data: RegisterInput) {
  const email = data.email.toLowerCase().trim();
  const name = data.name.trim();

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  const accessToken = signAccessToken(user);
  const refreshToken = await createRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: safeUser(user),
  };
}

export async function loginUser(data: LoginInput) {
  const email = data.email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (isLocked(user.lockedUntil)) {
    throw new Error("Account locked");
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) {
    const nextFailedAttempts = user.failedLoginAttempts + 1;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: nextFailedAttempts,
        lockedUntil:
          nextFailedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS
            ? getLockUntilDate()
            : null,
      },
    });

    throw new Error("Invalid credentials");
  }

  if (user.failedLoginAttempts > 0 || user.lockedUntil) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  const accessToken = signAccessToken(user);
  const refreshToken = await createRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: safeUser(user),
  };
}

export async function refreshSession(rawRefreshToken: string | undefined) {
  if (!rawRefreshToken) {
    throw new Error("Refresh token missing");
  }

  const tokenHash = hashToken(rawRefreshToken);

  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });

  if (
    !storedToken ||
    storedToken.revokedAt ||
    storedToken.expiresAt.getTime() <= Date.now()
  ) {
    throw new Error("Invalid refresh token");
  }

  await prisma.refreshToken.update({
    where: { id: storedToken.id },
    data: {
      revokedAt: new Date(),
    },
  });

  const accessToken = signAccessToken(storedToken.user);
  const refreshToken = await createRefreshToken(storedToken.user.id);

  return {
    accessToken,
    refreshToken,
    user: safeUser(storedToken.user),
  };
}

export async function revokeRefreshToken(rawRefreshToken: string | undefined) {
  if (!rawRefreshToken) return;

  await prisma.refreshToken.updateMany({
    where: {
      tokenHash: hashToken(rawRefreshToken),
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}
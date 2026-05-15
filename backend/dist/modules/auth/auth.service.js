"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.refreshSession = refreshSession;
exports.revokeRefreshToken = revokeRefreshToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../config/prisma");
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
function signAccessToken(user) {
    return jsonwebtoken_1.default.sign({
        userId: user.id,
        role: user.role,
    }, getJwtSecret(), {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
}
function safeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };
}
function hashToken(token) {
    return crypto_1.default.createHash("sha256").update(token).digest("hex");
}
function createRawRefreshToken() {
    return crypto_1.default.randomBytes(48).toString("hex");
}
function getRefreshExpiry() {
    return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
}
function getLockUntilDate() {
    return new Date(Date.now() + LOCK_TIME_MINUTES * 60 * 1000);
}
function isLocked(lockedUntil) {
    if (!lockedUntil)
        return false;
    return lockedUntil.getTime() > Date.now();
}
async function createRefreshToken(userId) {
    const rawToken = createRawRefreshToken();
    await prisma_1.prisma.refreshToken.create({
        data: {
            tokenHash: hashToken(rawToken),
            userId,
            expiresAt: getRefreshExpiry(),
        },
    });
    return rawToken;
}
async function registerUser(data) {
    const email = data.email.toLowerCase().trim();
    const name = data.name.trim();
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
    const user = await prisma_1.prisma.user.create({
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
async function loginUser(data) {
    const email = data.email.toLowerCase().trim();
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    if (isLocked(user.lockedUntil)) {
        throw new Error("Account locked");
    }
    const passwordMatch = await bcryptjs_1.default.compare(data.password, user.password);
    if (!passwordMatch) {
        const nextFailedAttempts = user.failedLoginAttempts + 1;
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginAttempts: nextFailedAttempts,
                lockedUntil: nextFailedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS
                    ? getLockUntilDate()
                    : null,
            },
        });
        throw new Error("Invalid credentials");
    }
    if (user.failedLoginAttempts > 0 || user.lockedUntil) {
        await prisma_1.prisma.user.update({
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
async function refreshSession(rawRefreshToken) {
    if (!rawRefreshToken) {
        throw new Error("Refresh token missing");
    }
    const tokenHash = hashToken(rawRefreshToken);
    const storedToken = await prisma_1.prisma.refreshToken.findUnique({
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
    if (!storedToken ||
        storedToken.revokedAt ||
        storedToken.expiresAt.getTime() <= Date.now()) {
        throw new Error("Invalid refresh token");
    }
    await prisma_1.prisma.refreshToken.update({
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
async function revokeRefreshToken(rawRefreshToken) {
    if (!rawRefreshToken)
        return;
    await prisma_1.prisma.refreshToken.updateMany({
        where: {
            tokenHash: hashToken(rawRefreshToken),
            revokedAt: null,
        },
        data: {
            revokedAt: new Date(),
        },
    });
}

import { Request, Response } from "express";
import {
  loginUser,
  refreshSession,
  registerUser,
  revokeRefreshToken,
} from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validators";
import { AuthRequest } from "../../middleware/auth.middleware";
import { prisma } from "../../config/prisma";
import { setCsrfCookie } from "../../middleware/csrf.middleware";

const isProduction = process.env.NODE_ENV === "production";

const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: 15 * 60 * 1000,
  path: "/",
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const clearAccessCookieOptions = {
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  path: "/",
};

const clearRefreshCookieOptions = {
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  path: "/",
};

function setAuthCookies(
  res: Response,
  tokens: {
    accessToken: string;
    refreshToken: string;
  }
) {
  res.cookie("accessToken", tokens.accessToken, accessCookieOptions);
  res.cookie("refreshToken", tokens.refreshToken, refreshCookieOptions);
}

function clearAuthCookies(res: Response) {
  res.clearCookie("accessToken", clearAccessCookieOptions);
  res.clearCookie("refreshToken", clearRefreshCookieOptions);
  res.clearCookie("csrfToken", { path: "/" });
}

export async function csrf(_req: Request, res: Response) {
  const csrfToken = setCsrfCookie(res);

  return res.json({
    csrfToken,
  });
}

export async function register(req: Request, res: Response) {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid registration data",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const result = await registerUser(parsed.data);

    setAuthCookies(res, result);
    setCsrfCookie(res);

    return res.status(201).json({
      user: result.user,
    });
  } catch (error: any) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    return res.status(500).json({
      message: "Registration failed",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid login data",
      });
    }

    const result = await loginUser(parsed.data);

    setAuthCookies(res, result);
    setCsrfCookie(res);

    return res.status(200).json({
      user: result.user,
    });
  } catch (error: any) {
    if (error.message === "Account locked") {
      return res.status(423).json({
        message: "Account temporarily locked. Try again later.",
      });
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const result = await refreshSession(req.cookies?.refreshToken);

    setAuthCookies(res, result);
    setCsrfCookie(res);

    return res.status(200).json({
      user: result.user,
    });
  } catch {
    clearAuthCookies(res);

    return res.status(401).json({
      message: "Session expired",
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    await revokeRefreshToken(req.cookies?.refreshToken);
    clearAuthCookies(res);

    return res.json({
      message: "Logged out successfully",
    });
  } catch {
    clearAuthCookies(res);

    return res.json({
      message: "Logged out successfully",
    });
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch user",
    });
  }
}
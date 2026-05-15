import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type UserRole = "USER" | "ADMIN" | "SCORER";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}

type JwtPayload = {
  userId: string;
  role: UserRole;
};

function getTokenFromRequest(req: Request) {
  const cookieToken = req.cookies?.accessToken;

  if (cookieToken) return cookieToken;

  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
}

export function protect(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "Server auth configuration error",
      });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export function requireRoles(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
}
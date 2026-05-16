import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  return next();
}

export function requireAdminOrScorer(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "ADMIN" && req.user.role !== "SCORER") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  return next();
}
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const csrfCookieOptions = {
  httpOnly: false,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

export const CSRF_COOKIE_NAME = "csrfToken";
export const CSRF_HEADER_NAME = "x-csrf-token";

export function createCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function setCsrfCookie(res: Response) {
  const token = createCsrfToken();

  res.cookie(CSRF_COOKIE_NAME, token, csrfCookieOptions);

  return token;
}

export function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];

  if (safeMethods.includes(req.method)) {
    return next();
  }

  const csrfCookie = req.cookies?.[CSRF_COOKIE_NAME];
  const csrfHeader = req.headers[CSRF_HEADER_NAME];

  if (
    !csrfCookie ||
    !csrfHeader ||
    Array.isArray(csrfHeader) ||
    csrfCookie !== csrfHeader
  ) {
    return res.status(403).json({
      message: "Invalid CSRF token",
    });
  }

  return next();
}
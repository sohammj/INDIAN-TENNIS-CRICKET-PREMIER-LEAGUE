"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRF_HEADER_NAME = exports.CSRF_COOKIE_NAME = void 0;
exports.createCsrfToken = createCsrfToken;
exports.setCsrfCookie = setCsrfCookie;
exports.csrfProtection = csrfProtection;
const crypto_1 = __importDefault(require("crypto"));
const isProduction = process.env.NODE_ENV === "production";
const csrfCookieOptions = {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
};
exports.CSRF_COOKIE_NAME = "csrfToken";
exports.CSRF_HEADER_NAME = "x-csrf-token";
function createCsrfToken() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
function setCsrfCookie(res) {
    const token = createCsrfToken();
    res.cookie(exports.CSRF_COOKIE_NAME, token, csrfCookieOptions);
    return token;
}
function csrfProtection(req, res, next) {
    const safeMethods = ["GET", "HEAD", "OPTIONS"];
    if (safeMethods.includes(req.method)) {
        return next();
    }
    const csrfCookie = req.cookies?.[exports.CSRF_COOKIE_NAME];
    const csrfHeader = req.headers[exports.CSRF_HEADER_NAME];
    if (!csrfCookie ||
        !csrfHeader ||
        Array.isArray(csrfHeader) ||
        csrfCookie !== csrfHeader) {
        return res.status(403).json({
            message: "Invalid CSRF token",
        });
    }
    return next();
}

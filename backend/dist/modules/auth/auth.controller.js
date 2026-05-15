"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrf = csrf;
exports.register = register;
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
exports.me = me;
const auth_service_1 = require("./auth.service");
const auth_validators_1 = require("./auth.validators");
const prisma_1 = require("../../config/prisma");
const csrf_middleware_1 = require("../../middleware/csrf.middleware");
const isProduction = process.env.NODE_ENV === "production";
const accessCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
};
const refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
};
function setAuthCookies(res, tokens) {
    res.cookie("accessToken", tokens.accessToken, accessCookieOptions);
    res.cookie("refreshToken", tokens.refreshToken, refreshCookieOptions);
}
function clearAuthCookies(res) {
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });
    res.clearCookie("csrfToken", { path: "/" });
}
async function csrf(_req, res) {
    const csrfToken = (0, csrf_middleware_1.setCsrfCookie)(res);
    return res.json({
        csrfToken,
    });
}
async function register(req, res) {
    try {
        const parsed = auth_validators_1.registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid registration data",
                errors: parsed.error.flatten().fieldErrors,
            });
        }
        const result = await (0, auth_service_1.registerUser)(parsed.data);
        setAuthCookies(res, result);
        (0, csrf_middleware_1.setCsrfCookie)(res);
        return res.status(201).json({
            token: result.accessToken,
            user: result.user,
        });
    }
    catch (error) {
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
async function login(req, res) {
    try {
        const parsed = auth_validators_1.loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid login data",
            });
        }
        const result = await (0, auth_service_1.loginUser)(parsed.data);
        setAuthCookies(res, result);
        (0, csrf_middleware_1.setCsrfCookie)(res);
        return res.status(200).json({
            token: result.accessToken,
            user: result.user,
        });
    }
    catch (error) {
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
async function refresh(req, res) {
    try {
        const result = await (0, auth_service_1.refreshSession)(req.cookies?.refreshToken);
        setAuthCookies(res, result);
        (0, csrf_middleware_1.setCsrfCookie)(res);
        return res.status(200).json({
            token: result.accessToken,
            user: result.user,
        });
    }
    catch {
        clearAuthCookies(res);
        return res.status(401).json({
            message: "Session expired",
        });
    }
}
async function logout(req, res) {
    try {
        await (0, auth_service_1.revokeRefreshToken)(req.cookies?.refreshToken);
        clearAuthCookies(res);
        return res.json({
            message: "Logged out successfully",
        });
    }
    catch {
        clearAuthCookies(res);
        return res.json({
            message: "Logged out successfully",
        });
    }
}
async function me(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch {
        return res.status(500).json({
            message: "Failed to fetch user",
        });
    }
}

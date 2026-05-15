"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = protect;
exports.requireRoles = requireRoles;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getTokenFromRequest(req) {
    const cookieToken = req.cookies?.accessToken;
    if (cookieToken)
        return cookieToken;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    return null;
}
function protect(req, res, next) {
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
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded.userId || !decoded.role) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        return next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
function requireRoles(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        return next();
    };
}

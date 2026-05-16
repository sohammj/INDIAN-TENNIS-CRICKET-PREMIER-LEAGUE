"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
exports.requireAdminOrScorer = requireAdminOrScorer;
function requireAdmin(req, res, next) {
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
function requireAdminOrScorer(req, res, next) {
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

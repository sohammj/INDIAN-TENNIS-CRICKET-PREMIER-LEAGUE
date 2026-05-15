"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
exports.getParam = getParam;
exports.validateBody = validateBody;
exports.sanitizeString = sanitizeString;
exports.sanitizeOptionalString = sanitizeOptionalString;
exports.handleControllerError = handleControllerError;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
class ApiError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.ApiError = ApiError;
function getParam(value, name) {
    if (!value || Array.isArray(value)) {
        throw new ApiError(400, `${name} is required`);
    }
    return value;
}
function validateBody(schema, body) {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        throw new ApiError(400, "Invalid request data", parsed.error.flatten());
    }
    return parsed.data;
}
function sanitizeString(value) {
    return value.trim().replace(/[<>]/g, "");
}
function sanitizeOptionalString(value) {
    if (!value)
        return undefined;
    const sanitized = sanitizeString(value);
    return sanitized.length > 0 ? sanitized : undefined;
}
function handleControllerError(res, error, fallback = "Something went wrong") {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            message: error.message,
            ...(error.details ? { errors: error.details } : {}),
        });
    }
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: error.flatten(),
        });
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return res.status(mapPrismaStatus(error)).json({
            message: mapPrismaMessage(error),
        });
    }
    console.error(error);
    return res.status(500).json({
        message: fallback,
    });
}
function mapPrismaStatus(error) {
    switch (error.code) {
        case "P2002":
            return 409;
        case "P2003":
            return 400;
        case "P2025":
            return 404;
        default:
            return 500;
    }
}
function mapPrismaMessage(error) {
    switch (error.code) {
        case "P2002":
            return "This record already exists.";
        case "P2003":
            return "This action cannot be completed because related records exist or are missing.";
        case "P2025":
            return "Record not found.";
        default:
            return "Database operation failed.";
    }
}

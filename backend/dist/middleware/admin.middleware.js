"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminOrScorer = exports.requireAdmin = void 0;
const auth_middleware_1 = require("./auth.middleware");
exports.requireAdmin = (0, auth_middleware_1.requireRoles)("ADMIN");
exports.requireAdminOrScorer = (0, auth_middleware_1.requireRoles)("ADMIN", "SCORER");

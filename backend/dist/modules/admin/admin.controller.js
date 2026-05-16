"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverview = getOverview;
exports.getUsers = getUsers;
exports.getPayments = getPayments;
const admin_service_1 = require("./admin.service");
const http_1 = require("../../utils/http");
async function getOverview(_req, res) {
    try {
        const overview = await (0, admin_service_1.getAdminOverview)();
        return res.json(overview);
    }
    catch (error) {
        return (0, http_1.handleControllerError)(res, error, "Failed to fetch admin overview.");
    }
}
async function getUsers(_req, res) {
    try {
        const users = await (0, admin_service_1.getAdminUsers)();
        return res.json(users);
    }
    catch (error) {
        return (0, http_1.handleControllerError)(res, error, "Failed to fetch users.");
    }
}
async function getPayments(_req, res) {
    try {
        const payments = await (0, admin_service_1.getAdminPayments)();
        return res.json(payments);
    }
    catch (error) {
        return (0, http_1.handleControllerError)(res, error, "Failed to fetch payments.");
    }
}

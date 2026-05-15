"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverview = getOverview;
exports.getUsers = getUsers;
exports.getPayments = getPayments;
const admin_service_1 = require("./admin.service");
async function getOverview(req, res) {
    try {
        const overview = await (0, admin_service_1.getAdminOverview)();
        return res.json(overview);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch admin overview",
        });
    }
}
const admin_service_2 = require("./admin.service");
async function getUsers(_req, res) {
    try {
        const users = await (0, admin_service_2.getAdminUsers)();
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch users",
        });
    }
}
async function getPayments(_req, res) {
    try {
        const payments = await (0, admin_service_2.getAdminPayments)();
        return res.json(payments);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch payments",
        });
    }
}

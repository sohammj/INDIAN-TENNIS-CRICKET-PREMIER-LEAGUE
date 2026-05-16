"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeDashboard = getMeDashboard;
const dashboard_service_1 = require("./dashboard.service");
const http_1 = require("../../utils/http");
async function getMeDashboard(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const dashboard = await (0, dashboard_service_1.getMyDashboard)(req.user.userId);
        return res.json(dashboard);
    }
    catch (error) {
        return (0, http_1.handleControllerError)(res, error, "Failed to fetch dashboard.");
    }
}

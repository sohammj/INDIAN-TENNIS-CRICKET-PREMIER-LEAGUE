"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeDashboard = getMeDashboard;
const dashboard_service_1 = require("./dashboard.service");
async function getMeDashboard(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const dashboard = await (0, dashboard_service_1.getMyDashboard)(req.user.userId);
        return res.json(dashboard);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch dashboard",
        });
    }
}

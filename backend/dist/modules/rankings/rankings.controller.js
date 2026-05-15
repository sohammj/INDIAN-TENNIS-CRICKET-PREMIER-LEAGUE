"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingsController = void 0;
const rankings_service_1 = require("./rankings.service");
exports.rankingsController = {
    async findAll(_req, res) {
        try {
            const rankings = await rankings_service_1.rankingsService.findAll();
            return res.json(rankings);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message || "Failed to fetch rankings",
            });
        }
    },
};

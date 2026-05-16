"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingsController = void 0;
const rankings_service_1 = require("./rankings.service");
const http_1 = require("../../utils/http");
exports.rankingsController = {
    async findAll(_req, res) {
        try {
            const rankings = await rankings_service_1.rankingsService.findAll();
            return res.json(rankings);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch rankings.");
        }
    },
};

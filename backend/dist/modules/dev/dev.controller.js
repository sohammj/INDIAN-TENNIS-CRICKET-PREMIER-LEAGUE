"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const devSeed_service_1 = require("./devSeed.service");
async function seed(_req, res) {
    if (process.env.NODE_ENV === "production") {
        return res.status(404).json({
            message: "Not found",
        });
    }
    try {
        const result = await (0, devSeed_service_1.seedDevData)();
        return res.json(result);
    }
    catch {
        return res.status(500).json({
            message: "Failed to seed data",
        });
    }
}

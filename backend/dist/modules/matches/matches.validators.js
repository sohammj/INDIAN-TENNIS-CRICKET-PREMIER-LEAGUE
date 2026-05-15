"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchSchema = exports.createMatchSchema = void 0;
const zod_1 = require("zod");
const emptyToUndefined = (value) => {
    if (typeof value === "string" && value.trim() === "") {
        return undefined;
    }
    return value;
};
const baseMatchSchema = zod_1.z.object({
    tournamentId: zod_1.z.preprocess(emptyToUndefined, zod_1.z.string().trim().optional()),
    teamAId: zod_1.z.string().trim().min(1, "teamAId is required"),
    teamBId: zod_1.z.string().trim().min(1, "teamBId is required"),
    venue: zod_1.z.preprocess(emptyToUndefined, zod_1.z.string().trim().max(200).optional()),
    matchDate: zod_1.z.preprocess(emptyToUndefined, zod_1.z.string().trim().optional()),
    status: zod_1.z
        .enum(["UPCOMING", "LIVE", "COMPLETED", "CANCELLED"])
        .optional(),
    summary: zod_1.z.preprocess(emptyToUndefined, zod_1.z.string().trim().max(1000).optional()),
});
exports.createMatchSchema = baseMatchSchema.refine((data) => data.teamAId !== data.teamBId, {
    message: "Team A and Team B cannot be the same.",
    path: ["teamBId"],
});
exports.updateMatchSchema = baseMatchSchema.partial().refine((data) => {
    if (!data.teamAId || !data.teamBId)
        return true;
    return data.teamAId !== data.teamBId;
}, {
    message: "Team A and Team B cannot be the same.",
    path: ["teamBId"],
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPlayerSchema = exports.updateTeamSchema = exports.createTeamSchema = void 0;
const zod_1 = require("zod");
const emptyToUndefined = (value) => {
    if (typeof value === "string" && value.trim() === "") {
        return undefined;
    }
    return value;
};
const cleanString = zod_1.z.string().trim().max(120);
const cleanLongString = zod_1.z.string().trim().max(500);
exports.createTeamSchema = zod_1.z.object({
    name: cleanString.min(2, "Team name must be at least 2 characters"),
    city: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
    zone: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
    logoUrl: zod_1.z.preprocess(emptyToUndefined, zod_1.z.string().trim().url("Logo URL must be a valid URL").max(500).optional()),
});
exports.updateTeamSchema = exports.createTeamSchema.partial();
exports.assignPlayerSchema = zod_1.z.object({
    playerId: zod_1.z.string().trim().min(1, "playerId is required"),
    role: zod_1.z.preprocess(emptyToUndefined, cleanLongString.optional()),
});

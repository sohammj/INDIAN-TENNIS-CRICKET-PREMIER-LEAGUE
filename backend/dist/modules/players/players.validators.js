"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerSchema = exports.createPlayerSchema = void 0;
const zod_1 = require("zod");
const emptyToUndefined = (value) => {
    if (typeof value === "string" && value.trim() === "") {
        return undefined;
    }
    return value;
};
const cleanString = zod_1.z.string().trim().max(120);
const cleanLongString = zod_1.z.string().trim().max(500);
exports.createPlayerSchema = zod_1.z.object({
    userId: zod_1.z.string().trim().min(1, "userId is required"),
    playerId: zod_1.z.string().trim().min(2, "playerId is required").max(50),
    name: cleanString.min(2, "Player name must be at least 2 characters"),
    phone: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
    city: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
    zone: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
    address: zod_1.z.preprocess(emptyToUndefined, cleanLongString.optional()),
    photoUrl: zod_1.z.preprocess(emptyToUndefined, zod_1.z.string().trim().url("Photo URL must be valid").max(500).optional()),
});
exports.updatePlayerSchema = exports.createPlayerSchema
    .omit({ userId: true })
    .partial();

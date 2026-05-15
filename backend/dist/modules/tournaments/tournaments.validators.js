"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTournamentSchema = exports.createTournamentSchema = void 0;
const zod_1 = require("zod");
const emptyToUndefined = (value) => {
    if (typeof value === "string" && value.trim() === "") {
        return undefined;
    }
    return value;
};
const cleanString = zod_1.z.string().trim().max(120);
exports.createTournamentSchema = zod_1.z.object({
    name: cleanString.min(2, "Tournament name must be at least 2 characters"),
    city: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
    zone: zod_1.z.preprocess(emptyToUndefined, cleanString.optional()),
});
exports.updateTournamentSchema = exports.createTournamentSchema.partial();

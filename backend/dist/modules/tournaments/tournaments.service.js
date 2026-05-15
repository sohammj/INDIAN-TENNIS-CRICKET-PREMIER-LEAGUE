"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentsService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../utils/http");
exports.tournamentsService = {
    create(data) {
        return prisma_1.prisma.tournament.create({
            data: {
                name: (0, http_1.sanitizeString)(data.name),
                city: (0, http_1.sanitizeOptionalString)(data.city),
                zone: (0, http_1.sanitizeOptionalString)(data.zone),
            },
        });
    },
    findAll() {
        return prisma_1.prisma.tournament.findMany({
            orderBy: { createdAt: "desc" },
        });
    },
    findById(id) {
        return prisma_1.prisma.tournament.findUnique({
            where: { id },
        });
    },
    update(id, data) {
        return prisma_1.prisma.tournament.update({
            where: { id },
            data: {
                name: data.name ? (0, http_1.sanitizeString)(data.name) : undefined,
                city: (0, http_1.sanitizeOptionalString)(data.city),
                zone: (0, http_1.sanitizeOptionalString)(data.zone),
            },
        });
    },
    delete(id) {
        return prisma_1.prisma.tournament.delete({
            where: { id },
        });
    },
};

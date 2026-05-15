"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playersService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../utils/http");
exports.playersService = {
    create(data) {
        return prisma_1.prisma.playerProfile.create({
            data: {
                userId: data.userId,
                playerId: (0, http_1.sanitizeString)(data.playerId),
                name: (0, http_1.sanitizeString)(data.name),
                phone: (0, http_1.sanitizeOptionalString)(data.phone),
                city: (0, http_1.sanitizeOptionalString)(data.city),
                zone: (0, http_1.sanitizeOptionalString)(data.zone),
                address: (0, http_1.sanitizeOptionalString)(data.address),
                photoUrl: (0, http_1.sanitizeOptionalString)(data.photoUrl),
            },
        });
    },
    findAll() {
        return prisma_1.prisma.playerProfile.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
                teamLinks: {
                    include: {
                        team: true,
                    },
                },
            },
        });
    },
    findById(id) {
        return prisma_1.prisma.playerProfile.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                    },
                },
                teamLinks: {
                    include: {
                        team: true,
                    },
                },
                matchStats: true,
            },
        });
    },
    update(id, data) {
        return prisma_1.prisma.playerProfile.update({
            where: { id },
            data: {
                playerId: data.playerId ? (0, http_1.sanitizeString)(data.playerId) : undefined,
                name: data.name ? (0, http_1.sanitizeString)(data.name) : undefined,
                phone: (0, http_1.sanitizeOptionalString)(data.phone),
                city: (0, http_1.sanitizeOptionalString)(data.city),
                zone: (0, http_1.sanitizeOptionalString)(data.zone),
                address: (0, http_1.sanitizeOptionalString)(data.address),
                photoUrl: (0, http_1.sanitizeOptionalString)(data.photoUrl),
            },
        });
    },
    delete(id) {
        return prisma_1.prisma.playerProfile.delete({
            where: { id },
        });
    },
};

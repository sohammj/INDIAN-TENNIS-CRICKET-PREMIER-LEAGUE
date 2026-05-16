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
            select: {
                id: true,
                playerId: true,
                name: true,
                city: true,
                zone: true,
                photoUrl: true,
                createdAt: true,
            },
        });
    },
    findAll() {
        return prisma_1.prisma.playerProfile.findMany({
            take: 50,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                playerId: true,
                name: true,
                city: true,
                zone: true,
                photoUrl: true,
                createdAt: true,
                teamLinks: {
                    select: {
                        id: true,
                        role: true,
                        status: true,
                        team: {
                            select: {
                                id: true,
                                name: true,
                                city: true,
                                zone: true,
                            },
                        },
                    },
                },
            },
        });
    },
    findById(id) {
        return prisma_1.prisma.playerProfile.findUnique({
            where: { id },
            select: {
                id: true,
                playerId: true,
                name: true,
                city: true,
                zone: true,
                photoUrl: true,
                createdAt: true,
                teamLinks: {
                    select: {
                        id: true,
                        role: true,
                        status: true,
                        team: {
                            select: {
                                id: true,
                                name: true,
                                city: true,
                                zone: true,
                            },
                        },
                    },
                },
                matchStats: {
                    select: {
                        id: true,
                        runs: true,
                        ballsFaced: true,
                        fours: true,
                        sixes: true,
                        oversBowled: true,
                        runsConceded: true,
                        wickets: true,
                        catches: true,
                        runOuts: true,
                        mvpPoints: true,
                    },
                },
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
            select: {
                id: true,
                playerId: true,
                name: true,
                city: true,
                zone: true,
                photoUrl: true,
                updatedAt: true,
            },
        });
    },
    delete(id) {
        return prisma_1.prisma.playerProfile.delete({
            where: { id },
        });
    },
};

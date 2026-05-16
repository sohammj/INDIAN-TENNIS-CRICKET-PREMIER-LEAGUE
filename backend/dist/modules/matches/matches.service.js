"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../utils/http");
function toDate(value) {
    if (!value)
        return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        throw new http_1.ApiError(400, "Invalid match date.");
    }
    return date;
}
exports.matchesService = {
    async create(data) {
        if (data.teamAId === data.teamBId) {
            throw new http_1.ApiError(400, "Team A and Team B cannot be the same.");
        }
        return prisma_1.prisma.match.create({
            data: {
                tournamentId: data.tournamentId,
                teamAId: data.teamAId,
                teamBId: data.teamBId,
                venue: (0, http_1.sanitizeOptionalString)(data.venue),
                matchDate: toDate(data.matchDate),
                status: data.status,
                summary: (0, http_1.sanitizeOptionalString)(data.summary),
            },
        });
    },
    findAll() {
        return prisma_1.prisma.match.findMany({
            take: 50,
            select: {
                id: true,
                venue: true,
                matchDate: true,
                status: true,
                summary: true,
                tournament: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        zone: true,
                        status: true,
                    },
                },
                teamA: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        zone: true,
                    },
                },
                teamB: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        zone: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },
    findById(id) {
        return prisma_1.prisma.match.findUnique({
            where: { id },
            include: {
                tournament: true,
                teamA: true,
                teamB: true,
                playerStats: {
                    include: {
                        player: true,
                    },
                },
            },
        });
    },
    async update(id, data) {
        if (data.teamAId && data.teamBId && data.teamAId === data.teamBId) {
            throw new http_1.ApiError(400, "Team A and Team B cannot be the same.");
        }
        return prisma_1.prisma.match.update({
            where: { id },
            data: {
                tournamentId: data.tournamentId,
                teamAId: data.teamAId,
                teamBId: data.teamBId,
                venue: (0, http_1.sanitizeOptionalString)(data.venue),
                matchDate: toDate(data.matchDate),
                status: data.status,
                summary: (0, http_1.sanitizeOptionalString)(data.summary),
            },
        });
    },
    delete(id) {
        return prisma_1.prisma.match.delete({
            where: { id },
        });
    },
};

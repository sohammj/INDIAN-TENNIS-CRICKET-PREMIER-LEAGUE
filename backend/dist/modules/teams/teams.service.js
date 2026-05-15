"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../utils/http");
exports.teamsService = {
    async assignPlayer(teamId, data) {
        const team = await prisma_1.prisma.team.findUnique({
            where: { id: teamId },
            select: { id: true },
        });
        if (!team) {
            throw new http_1.ApiError(404, "Team not found.");
        }
        const player = await prisma_1.prisma.playerProfile.findUnique({
            where: { id: data.playerId },
            select: { id: true },
        });
        if (!player) {
            throw new http_1.ApiError(404, "Player not found.");
        }
        const existing = await prisma_1.prisma.teamPlayer.findUnique({
            where: {
                teamId_playerId: {
                    teamId,
                    playerId: data.playerId,
                },
            },
            select: { id: true },
        });
        if (existing) {
            throw new http_1.ApiError(409, "Player is already assigned to this team.");
        }
        return prisma_1.prisma.teamPlayer.create({
            data: {
                teamId,
                playerId: data.playerId,
                role: (0, http_1.sanitizeOptionalString)(data.role),
            },
            include: {
                team: true,
                player: true,
            },
        });
    },
    async removePlayer(linkId) {
        return prisma_1.prisma.teamPlayer.delete({
            where: {
                id: linkId,
            },
        });
    },
    create(data) {
        return prisma_1.prisma.team.create({
            data: {
                name: (0, http_1.sanitizeString)(data.name),
                city: (0, http_1.sanitizeOptionalString)(data.city),
                zone: (0, http_1.sanitizeOptionalString)(data.zone),
                logoUrl: (0, http_1.sanitizeOptionalString)(data.logoUrl),
            },
        });
    },
    findAll() {
        return prisma_1.prisma.team.findMany({
            include: {
                players: {
                    include: {
                        player: true,
                    },
                    orderBy: {
                        joinedAt: "desc",
                    },
                },
                homeMatches: true,
                awayMatches: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },
    findById(id) {
        return prisma_1.prisma.team.findUnique({
            where: {
                id,
            },
            include: {
                players: {
                    include: {
                        player: true,
                    },
                    orderBy: {
                        joinedAt: "desc",
                    },
                },
                homeMatches: true,
                awayMatches: true,
            },
        });
    },
    update(id, data) {
        return prisma_1.prisma.team.update({
            where: {
                id,
            },
            data: {
                name: data.name ? (0, http_1.sanitizeString)(data.name) : undefined,
                city: (0, http_1.sanitizeOptionalString)(data.city),
                zone: (0, http_1.sanitizeOptionalString)(data.zone),
                logoUrl: (0, http_1.sanitizeOptionalString)(data.logoUrl),
            },
        });
    },
    delete(id) {
        return prisma_1.prisma.team.delete({
            where: {
                id,
            },
        });
    },
};

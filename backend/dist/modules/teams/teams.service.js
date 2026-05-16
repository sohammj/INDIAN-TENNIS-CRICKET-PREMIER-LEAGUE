"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../utils/http");
const safeTeamInclude = {
    players: {
        select: {
            id: true,
            role: true,
            status: true,
            joinedAt: true,
            player: {
                select: {
                    id: true,
                    playerId: true,
                    name: true,
                    city: true,
                    zone: true,
                    photoUrl: true,
                },
            },
        },
        orderBy: {
            joinedAt: "desc",
        },
    },
    homeMatches: {
        select: {
            id: true,
            venue: true,
            matchDate: true,
            status: true,
            summary: true,
        },
    },
    awayMatches: {
        select: {
            id: true,
            venue: true,
            matchDate: true,
            status: true,
            summary: true,
        },
    },
};
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
            select: {
                id: true,
                role: true,
                status: true,
                joinedAt: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        zone: true,
                    },
                },
                player: {
                    select: {
                        id: true,
                        playerId: true,
                        name: true,
                        city: true,
                        zone: true,
                        photoUrl: true,
                    },
                },
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
            select: {
                id: true,
                name: true,
                city: true,
                zone: true,
                logoUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
    findAll() {
        return prisma_1.prisma.team.findMany({
            take: 50,
            include: safeTeamInclude,
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
            include: safeTeamInclude,
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
            select: {
                id: true,
                name: true,
                city: true,
                zone: true,
                logoUrl: true,
                createdAt: true,
                updatedAt: true,
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

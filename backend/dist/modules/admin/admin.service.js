"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminOverview = getAdminOverview;
exports.getAdminUsers = getAdminUsers;
exports.getAdminPayments = getAdminPayments;
const prisma_1 = require("../../config/prisma");
async function getAdminOverview() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const [totalUsers, totalRegisteredPlayers, totalTeams, totalMatches, matchesToday, paymentsCompleted, teamsAndPlayers, playerProfiles, recentMatches,] = await Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.playerProfile.count(),
        prisma_1.prisma.team.count(),
        prisma_1.prisma.match.count(),
        prisma_1.prisma.match.count({
            where: {
                matchDate: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        }),
        prisma_1.prisma.payment.count({
            where: {
                status: "COMPLETED",
            },
        }),
        prisma_1.prisma.teamPlayer.findMany({
            take: 12,
            orderBy: {
                joinedAt: "desc",
            },
            select: {
                id: true,
                role: true,
                status: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                player: {
                    select: {
                        id: true,
                        playerId: true,
                        name: true,
                        city: true,
                        zone: true,
                    },
                },
            },
        }),
        prisma_1.prisma.playerProfile.findMany({
            select: {
                id: true,
                playerId: true,
                name: true,
                city: true,
                zone: true,
                matchStats: {
                    select: {
                        runs: true,
                        wickets: true,
                        mvpPoints: true,
                    },
                },
                teamLinks: {
                    select: {
                        team: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        }),
        prisma_1.prisma.match.findMany({
            take: 6,
            orderBy: [
                {
                    matchDate: "desc",
                },
                {
                    createdAt: "desc",
                },
            ],
            select: {
                id: true,
                venue: true,
                matchDate: true,
                status: true,
                tournament: {
                    select: {
                        name: true,
                    },
                },
                teamA: {
                    select: {
                        name: true,
                    },
                },
                teamB: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
    ]);
    const rankings = playerProfiles
        .map((player) => {
        const mvpPoints = player.matchStats.reduce((sum, stat) => sum + stat.mvpPoints, 0);
        const totalRuns = player.matchStats.reduce((sum, stat) => sum + stat.runs, 0);
        const totalWickets = player.matchStats.reduce((sum, stat) => sum + stat.wickets, 0);
        return {
            id: player.id,
            playerId: player.playerId,
            name: player.name,
            city: player.city,
            zone: player.zone,
            team: player.teamLinks[0]?.team.name ?? "Unassigned",
            mvpPoints,
            totalRuns,
            totalWickets,
        };
    })
        .sort((a, b) => b.mvpPoints - a.mvpPoints)
        .slice(0, 10);
    return {
        stats: {
            totalUsers,
            totalRegisteredPlayers,
            totalTeams,
            totalMatches,
            matchesToday,
            paymentsCompleted,
        },
        teamsAndPlayers: teamsAndPlayers.map((link) => ({
            id: link.id,
            playerId: link.player.playerId,
            name: link.player.name,
            city: link.player.city,
            zone: link.player.zone,
            role: link.role,
            status: link.status,
            team: link.team.name,
        })),
        rankings,
        recentMatches: recentMatches.map((match) => ({
            id: match.id,
            tournament: match.tournament?.name ?? "Tournament TBA",
            teamA: match.teamA.name,
            teamB: match.teamB.name,
            venue: match.venue,
            matchDate: match.matchDate,
            status: match.status,
        })),
    };
}
async function getAdminUsers() {
    return prisma_1.prisma.user.findMany({
        take: 100,
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            playerProfile: {
                select: {
                    id: true,
                    playerId: true,
                    phone: true,
                    city: true,
                    zone: true,
                },
            },
        },
    });
}
async function getAdminPayments() {
    return prisma_1.prisma.payment.findMany({
        take: 100,
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            provider: true,
            providerRef: true,
            createdAt: true,
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            player: {
                select: {
                    id: true,
                    playerId: true,
                    name: true,
                    city: true,
                    zone: true,
                },
            },
            tournament: {
                select: {
                    id: true,
                    name: true,
                    city: true,
                    zone: true,
                },
            },
        },
    });
}

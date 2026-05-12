import { prisma } from "../../config/prisma";

export async function getAdminOverview() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [
    totalUsers,
    totalRegisteredPlayers,
    totalTeams,
    totalMatches,
    matchesToday,
    paymentsCompleted,
    teamsAndPlayers,
    playerProfiles,
    recentMatches,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.playerProfile.count(),

    prisma.team.count(),

    prisma.match.count(),

    prisma.match.count({
      where: {
        matchDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    }),

    prisma.payment.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.teamPlayer.findMany({
      take: 12,
      orderBy: {
        joinedAt: "desc",
      },
      include: {
        team: true,
        player: true,
      },
    }),

    prisma.playerProfile.findMany({
      include: {
        matchStats: true,
        teamLinks: {
          include: {
            team: true,
          },
        },
      },
    }),

    prisma.match.findMany({
      take: 6,
      orderBy: [
        {
          matchDate: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        tournament: true,
        teamA: true,
        teamB: true,
      },
    }),
  ]);

  const rankings = playerProfiles
    .map((player) => {
      const mvpPoints = player.matchStats.reduce(
        (sum, stat) => sum + stat.mvpPoints,
        0
      );

      const totalRuns = player.matchStats.reduce(
        (sum, stat) => sum + stat.runs,
        0
      );

      const totalWickets = player.matchStats.reduce(
        (sum, stat) => sum + stat.wickets,
        0
      );

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

export async function getAdminUsers() {
  return prisma.user.findMany({
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

export async function getAdminPayments() {
  return prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      player: true,
      tournament: true,
    },
  });
}
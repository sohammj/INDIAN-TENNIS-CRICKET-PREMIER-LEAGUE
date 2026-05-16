import { prisma } from "../../config/prisma";

export async function getMyDashboard(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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
          name: true,
          phone: true,
          city: true,
          zone: true,
          address: true,
          photoUrl: true,
          matchStats: true,
          registrations: {
            select: {
              id: true,
              status: true,
              tournament: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  zone: true,
                  status: true,
                },
              },
            },
          },
          payments: {
            select: {
              id: true,
              amount: true,
              currency: true,
              status: true,
              provider: true,
              providerRef: true,
              createdAt: true,
              tournament: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
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
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const stats = user.playerProfile?.matchStats ?? [];
  const payments = user.playerProfile?.payments ?? [];
  const registrations = user.playerProfile?.registrations ?? [];

  const totalRuns = stats.reduce((sum, item) => sum + item.runs, 0);
  const totalBalls = stats.reduce((sum, item) => sum + item.ballsFaced, 0);
  const totalFours = stats.reduce((sum, item) => sum + item.fours, 0);
  const totalSixes = stats.reduce((sum, item) => sum + item.sixes, 0);
  const innings = stats.reduce((sum, item) => sum + item.innings, 0);
  const notOuts = stats.reduce((sum, item) => sum + item.notOuts, 0);

  const totalOvers = stats.reduce((sum, item) => sum + item.oversBowled, 0);
  const totalWickets = stats.reduce((sum, item) => sum + item.wickets, 0);
  const totalRunsConceded = stats.reduce(
    (sum, item) => sum + item.runsConceded,
    0
  );
  const totalDotBalls = stats.reduce((sum, item) => sum + item.dotBalls, 0);

  const totalCatches = stats.reduce((sum, item) => sum + item.catches, 0);
  const totalRunOuts = stats.reduce((sum, item) => sum + item.runOuts, 0);
  const totalMvpPoints = stats.reduce((sum, item) => sum + item.mvpPoints, 0);

  const dismissals = Math.max(innings - notOuts, 1);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },

    playerProfile: user.playerProfile
      ? {
          id: user.playerProfile.id,
          playerId: user.playerProfile.playerId,
          name: user.playerProfile.name,
          phone: user.playerProfile.phone,
          city: user.playerProfile.city,
          zone: user.playerProfile.zone,
          address: user.playerProfile.address,
          photoUrl: user.playerProfile.photoUrl,
        }
      : null,

    overview: {
      matchesPlayed: stats.length,
      tournamentsPlayed: registrations.length,
      totalRuns,
      totalWickets,
      paymentsMade: payments.filter((payment) => payment.status === "COMPLETED")
        .length,
      mvpPoints: totalMvpPoints,
    },

    batting: {
      runs: totalRuns,
      ballsFaced: totalBalls,
      strikeRate:
        totalBalls > 0 ? Number(((totalRuns / totalBalls) * 100).toFixed(2)) : 0,
      average: Number((totalRuns / dismissals).toFixed(2)),
      fours: totalFours,
      sixes: totalSixes,
    },

    bowling: {
      overs: totalOvers,
      wickets: totalWickets,
      runsConceded: totalRunsConceded,
      economy:
        totalOvers > 0 ? Number((totalRunsConceded / totalOvers).toFixed(2)) : 0,
      dotBalls: totalDotBalls,
    },

    fielding: {
      catches: totalCatches,
      runOuts: totalRunOuts,
    },

    tournaments: registrations.map((registration) => ({
      id: registration.tournament.id,
      name: registration.tournament.name,
      city: registration.tournament.city,
      zone: registration.tournament.zone,
      status: registration.tournament.status,
      registrationStatus: registration.status,
    })),

    teams:
      user.playerProfile?.teamLinks.map((link) => ({
        id: link.team.id,
        name: link.team.name,
        city: link.team.city,
        zone: link.team.zone,
        role: link.role,
        status: link.status,
      })) ?? [],

    payments: payments.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      provider: payment.provider,
      providerRef: payment.providerRef,
      createdAt: payment.createdAt,
      tournament: payment.tournament,
    })),
  };
}
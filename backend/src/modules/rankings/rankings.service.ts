import { prisma } from "../../config/prisma";

export const rankingsService = {
  async findAll() {
    const players = await prisma.playerProfile.findMany({
      include: {
        matchStats: true,
        teamLinks: {
          include: {
            team: true,
          },
        },
      },
    });

    const rankings = players
      .map((player) => {
        const matches = player.matchStats.length;

        const runs = player.matchStats.reduce((sum, stat) => sum + stat.runs, 0);
        const wickets = player.matchStats.reduce((sum, stat) => sum + stat.wickets, 0);
        const catches = player.matchStats.reduce((sum, stat) => sum + stat.catches, 0);
        const runOuts = player.matchStats.reduce((sum, stat) => sum + stat.runOuts, 0);
        const mvpPoints = player.matchStats.reduce((sum, stat) => sum + stat.mvpPoints, 0);

        const calculatedPoints =
          mvpPoints +
          runs +
          wickets * 25 +
          catches * 10 +
          runOuts * 15;

        return {
          id: player.id,
          playerId: player.playerId,
          name: player.name,
          city: player.city,
          zone: player.zone,
          matches,
          runs,
          wickets,
          catches,
          runOuts,
          points: calculatedPoints,
          mvpPoints,
          team: player.teamLinks[0]?.team.name ?? "Unassigned",
        };
      })
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({
        ...player,
        rank: `#${index + 1}`,
      }));

    return rankings;
  },
};
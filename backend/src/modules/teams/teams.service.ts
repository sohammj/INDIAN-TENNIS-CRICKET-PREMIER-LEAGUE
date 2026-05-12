import { prisma } from "../../config/prisma";

export const teamsService = {
  assignPlayer(teamId: string, data: { playerId: string; role?: string }) {
    return prisma.teamPlayer.create({
      data: {
        teamId,
        playerId: data.playerId,
        role: data.role,
      },
      include: {
        team: true,
        player: true,
      },
    });
  },

  removePlayer(linkId: string) {
    return prisma.teamPlayer.delete({
      where: {
        id: linkId,
      },
    });
  },
  create(data: {
    name: string;
    city?: string;
    zone?: string;
    logoUrl?: string;
  }) {
    return prisma.team.create({
      data,
    });
  },

  findAll() {
    return prisma.team.findMany({
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

  findById(id: string) {
    return prisma.team.findUnique({
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

  update(
    id: string,
    data: {
      name?: string;
      city?: string;
      zone?: string;
      logoUrl?: string;
    }
  ) {
    return prisma.team.update({
      where: {
        id,
      },
      data,
    });
  },

  delete(id: string) {
    return prisma.team.delete({
      where: {
        id,
      },
    });
  },
};


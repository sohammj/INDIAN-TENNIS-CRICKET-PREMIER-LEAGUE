import { prisma } from "../../config/prisma";
import {
  ApiError,
  sanitizeOptionalString,
  sanitizeString,
} from "../../utils/http";

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
      joinedAt: "desc" as const,
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

export const teamsService = {
  async assignPlayer(teamId: string, data: { playerId: string; role?: string }) {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { id: true },
    });

    if (!team) {
      throw new ApiError(404, "Team not found.");
    }

    const player = await prisma.playerProfile.findUnique({
      where: { id: data.playerId },
      select: { id: true },
    });

    if (!player) {
      throw new ApiError(404, "Player not found.");
    }

    const existing = await prisma.teamPlayer.findUnique({
      where: {
        teamId_playerId: {
          teamId,
          playerId: data.playerId,
        },
      },
      select: { id: true },
    });

    if (existing) {
      throw new ApiError(409, "Player is already assigned to this team.");
    }

    return prisma.teamPlayer.create({
      data: {
        teamId,
        playerId: data.playerId,
        role: sanitizeOptionalString(data.role),
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

  async removePlayer(linkId: string) {
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
      data: {
        name: sanitizeString(data.name),
        city: sanitizeOptionalString(data.city),
        zone: sanitizeOptionalString(data.zone),
        logoUrl: sanitizeOptionalString(data.logoUrl),
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
    return prisma.team.findMany({
      take: 50,
      include: safeTeamInclude,
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
      include: safeTeamInclude,
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
      data: {
        name: data.name ? sanitizeString(data.name) : undefined,
        city: sanitizeOptionalString(data.city),
        zone: sanitizeOptionalString(data.zone),
        logoUrl: sanitizeOptionalString(data.logoUrl),
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

  delete(id: string) {
    return prisma.team.delete({
      where: {
        id,
      },
    });
  },
};
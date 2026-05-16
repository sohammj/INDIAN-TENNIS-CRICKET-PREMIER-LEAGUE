import { prisma } from "../../config/prisma";
import { sanitizeOptionalString, sanitizeString } from "../../utils/http";

export const playersService = {
  create(data: {
    userId: string;
    playerId: string;
    name: string;
    phone?: string;
    city?: string;
    zone?: string;
    address?: string;
    photoUrl?: string;
  }) {
    return prisma.playerProfile.create({
      data: {
        userId: data.userId,
        playerId: sanitizeString(data.playerId),
        name: sanitizeString(data.name),
        phone: sanitizeOptionalString(data.phone),
        city: sanitizeOptionalString(data.city),
        zone: sanitizeOptionalString(data.zone),
        address: sanitizeOptionalString(data.address),
        photoUrl: sanitizeOptionalString(data.photoUrl),
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
    return prisma.playerProfile.findMany({
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

  findById(id: string) {
    return prisma.playerProfile.findUnique({
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

  update(
    id: string,
    data: {
      playerId?: string;
      name?: string;
      phone?: string;
      city?: string;
      zone?: string;
      address?: string;
      photoUrl?: string;
    }
  ) {
    return prisma.playerProfile.update({
      where: { id },
      data: {
        playerId: data.playerId ? sanitizeString(data.playerId) : undefined,
        name: data.name ? sanitizeString(data.name) : undefined,
        phone: sanitizeOptionalString(data.phone),
        city: sanitizeOptionalString(data.city),
        zone: sanitizeOptionalString(data.zone),
        address: sanitizeOptionalString(data.address),
        photoUrl: sanitizeOptionalString(data.photoUrl),
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

  delete(id: string) {
    return prisma.playerProfile.delete({
      where: { id },
    });
  },
};
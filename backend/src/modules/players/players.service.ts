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
    });
  },

  findAll() {
    return prisma.playerProfile.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        teamLinks: {
          include: {
            team: true,
          },
        },
      },
    });
  },

  findById(id: string) {
    return prisma.playerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        teamLinks: {
          include: {
            team: true,
          },
        },
        matchStats: true,
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
    });
  },

  delete(id: string) {
    return prisma.playerProfile.delete({
      where: { id },
    });
  },
};
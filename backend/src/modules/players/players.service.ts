import { prisma } from "../../config/prisma";

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
    return prisma.playerProfile.create({ data });
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
        user: true,
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
      data,
    });
  },

  delete(id: string) {
    return prisma.playerProfile.delete({
      where: { id },
    });
  },
};
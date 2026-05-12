import { prisma } from "../../config/prisma";

export const tournamentsService = {
  create(data: {
    name: string;
    city?: string;
    zone?: string;
  }) {
    return prisma.tournament.create({ data });
  },

  findAll() {
    return prisma.tournament.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: string) {
    return prisma.tournament.findUnique({
      where: { id },
    });
  },

  update(id: string, data: {
    name?: string;
    city?: string;
    zone?: string;
  }) {
    return prisma.tournament.update({
      where: { id },
      data,
    });
  },

  delete(id: string) {
    return prisma.tournament.delete({
      where: { id },
    });
  },
};
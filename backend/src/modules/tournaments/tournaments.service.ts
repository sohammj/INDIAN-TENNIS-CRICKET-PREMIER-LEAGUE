import { prisma } from "../../config/prisma";
import { sanitizeOptionalString, sanitizeString } from "../../utils/http";

export const tournamentsService = {
  create(data: {
    name: string;
    city?: string;
    zone?: string;
  }) {
    return prisma.tournament.create({
      data: {
        name: sanitizeString(data.name),
        city: sanitizeOptionalString(data.city),
        zone: sanitizeOptionalString(data.zone),
      },
    });
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

  update(
    id: string,
    data: {
      name?: string;
      city?: string;
      zone?: string;
    }
  ) {
    return prisma.tournament.update({
      where: { id },
      data: {
        name: data.name ? sanitizeString(data.name) : undefined,
        city: sanitizeOptionalString(data.city),
        zone: sanitizeOptionalString(data.zone),
      },
    });
  },

  delete(id: string) {
    return prisma.tournament.delete({
      where: { id },
    });
  },
};
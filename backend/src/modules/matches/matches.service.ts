import { MatchStatus } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { ApiError, sanitizeOptionalString } from "../../utils/http";

type CreateMatchInput = {
  tournamentId?: string;
  teamAId: string;
  teamBId: string;
  venue?: string;
  matchDate?: string;
  status?: MatchStatus;
  summary?: string;
};

type UpdateMatchInput = Partial<CreateMatchInput>;

function toDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, "Invalid match date.");
  }

  return date;
}

export const matchesService = {
  async create(data: CreateMatchInput) {
    if (data.teamAId === data.teamBId) {
      throw new ApiError(400, "Team A and Team B cannot be the same.");
    }

    return prisma.match.create({
      data: {
        tournamentId: data.tournamentId,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        venue: sanitizeOptionalString(data.venue),
        matchDate: toDate(data.matchDate),
        status: data.status,
        summary: sanitizeOptionalString(data.summary),
      },
    });
  },

  findAll() {
    return prisma.match.findMany({
      take: 50,
      select: {
        id: true,
        venue: true,
        matchDate: true,
        status: true,
        summary: true,
        tournament: {
          select: {
            id: true,
            name: true,
            city: true,
            zone: true,
            status: true,
          },
        },
        teamA: {
          select: {
            id: true,
            name: true,
            city: true,
            zone: true,
          },
        },
        teamB: {
          select: {
            id: true,
            name: true,
            city: true,
            zone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: string) {
    return prisma.match.findUnique({
      where: { id },
      include: {
        tournament: true,
        teamA: true,
        teamB: true,
        playerStats: {
          include: {
            player: true,
          },
        },
      },
    });
  },

  async update(id: string, data: UpdateMatchInput) {
    if (data.teamAId && data.teamBId && data.teamAId === data.teamBId) {
      throw new ApiError(400, "Team A and Team B cannot be the same.");
    }

    return prisma.match.update({
      where: { id },
      data: {
        tournamentId: data.tournamentId,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        venue: sanitizeOptionalString(data.venue),
        matchDate: toDate(data.matchDate),
        status: data.status,
        summary: sanitizeOptionalString(data.summary),
      },
    });
  },

  delete(id: string) {
    return prisma.match.delete({
      where: { id },
    });
  },
};
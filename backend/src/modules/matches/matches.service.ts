import { MatchStatus } from "@prisma/client";
import { prisma } from "../../config/prisma";

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

export const matchesService = {
  create(data: CreateMatchInput) {
    return prisma.match.create({
      data: {
        tournamentId: data.tournamentId,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        venue: data.venue,
        matchDate: data.matchDate ? new Date(data.matchDate) : undefined,
        status: data.status,
        summary: data.summary,
      },
    });
  },

  findAll() {
    return prisma.match.findMany({
      include: {
        tournament: true,
        teamA: true,
        teamB: true,
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

  update(id: string, data: UpdateMatchInput) {
    return prisma.match.update({
      where: { id },
      data: {
        tournamentId: data.tournamentId,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        venue: data.venue,
        matchDate: data.matchDate ? new Date(data.matchDate) : undefined,
        status: data.status,
        summary: data.summary,
      },
    });
  },

  delete(id: string) {
    return prisma.match.delete({
      where: { id },
    });
  },
};
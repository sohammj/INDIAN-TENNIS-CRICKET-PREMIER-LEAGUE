import { z } from "zod";

export const createMatchSchema = z.object({
  tournamentId: z.string().optional(),
  teamAId: z.string().min(1),
  teamBId: z.string().min(1),
  venue: z.string().optional(),
  matchDate: z.string().optional(),
  status: z.enum(["UPCOMING", "LIVE", "COMPLETED", "CANCELLED"]).optional(),
  summary: z.string().optional(),
});

export const updateMatchSchema = createMatchSchema.partial();
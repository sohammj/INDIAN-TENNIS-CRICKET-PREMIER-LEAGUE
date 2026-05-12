import { z } from "zod";

export const createTournamentSchema = z.object({
  name: z.string().min(2),
  city: z.string().optional(),
  zone: z.string().optional(),
});

export const updateTournamentSchema = createTournamentSchema.partial();
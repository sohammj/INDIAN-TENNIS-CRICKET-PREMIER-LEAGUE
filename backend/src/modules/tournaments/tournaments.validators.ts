import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const cleanString = z.string().trim().max(120);

export const createTournamentSchema = z.object({
  name: cleanString.min(2, "Tournament name must be at least 2 characters"),
  city: z.preprocess(emptyToUndefined, cleanString.optional()),
  zone: z.preprocess(emptyToUndefined, cleanString.optional()),
});

export const updateTournamentSchema = createTournamentSchema.partial();
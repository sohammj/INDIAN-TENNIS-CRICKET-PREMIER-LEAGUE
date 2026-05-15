import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const cleanString = z.string().trim().max(120);
const cleanLongString = z.string().trim().max(500);

export const createTeamSchema = z.object({
  name: cleanString.min(2, "Team name must be at least 2 characters"),
  city: z.preprocess(emptyToUndefined, cleanString.optional()),
  zone: z.preprocess(emptyToUndefined, cleanString.optional()),
  logoUrl: z.preprocess(
    emptyToUndefined,
    z.string().trim().url("Logo URL must be a valid URL").max(500).optional()
  ),
});

export const updateTeamSchema = createTeamSchema.partial();

export const assignPlayerSchema = z.object({
  playerId: z.string().trim().min(1, "playerId is required"),
  role: z.preprocess(emptyToUndefined, cleanLongString.optional()),
});
import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

export const createTeamSchema = z.object({
  name: z.string().trim().min(2, "Team name must be at least 2 characters"),
  city: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  zone: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  logoUrl: z.preprocess(
    emptyToUndefined,
    z.string().trim().url("Logo URL must be a valid URL").optional()
  ),
});

export const updateTeamSchema = createTeamSchema.partial();
import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

export const createPlayerSchema = z.object({
  userId: z.string().min(1),
  playerId: z.string().min(2),
  name: z.string().min(2),
  phone: z.preprocess(emptyToUndefined, z.string().optional()),
  city: z.preprocess(emptyToUndefined, z.string().optional()),
  zone: z.preprocess(emptyToUndefined, z.string().optional()),
  address: z.preprocess(emptyToUndefined, z.string().optional()),
  photoUrl: z.preprocess(
    emptyToUndefined,
    z.string().url().optional()
  ),
});

export const updatePlayerSchema = createPlayerSchema
  .omit({ userId: true })
  .partial();
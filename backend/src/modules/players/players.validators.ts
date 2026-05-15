import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const cleanString = z.string().trim().max(120);
const cleanLongString = z.string().trim().max(500);

export const createPlayerSchema = z.object({
  userId: z.string().trim().min(1, "userId is required"),
  playerId: z.string().trim().min(2, "playerId is required").max(50),
  name: cleanString.min(2, "Player name must be at least 2 characters"),
  phone: z.preprocess(emptyToUndefined, cleanString.optional()),
  city: z.preprocess(emptyToUndefined, cleanString.optional()),
  zone: z.preprocess(emptyToUndefined, cleanString.optional()),
  address: z.preprocess(emptyToUndefined, cleanLongString.optional()),
  photoUrl: z.preprocess(
    emptyToUndefined,
    z.string().trim().url("Photo URL must be valid").max(500).optional()
  ),
});

export const updatePlayerSchema = createPlayerSchema
  .omit({ userId: true })
  .partial();
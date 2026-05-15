import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const baseMatchSchema = z.object({
  tournamentId: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  teamAId: z.string().trim().min(1, "teamAId is required"),
  teamBId: z.string().trim().min(1, "teamBId is required"),
  venue: z.preprocess(emptyToUndefined, z.string().trim().max(200).optional()),
  matchDate: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  status: z
    .enum(["UPCOMING", "LIVE", "COMPLETED", "CANCELLED"])
    .optional(),
  summary: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(1000).optional()
  ),
});

export const createMatchSchema = baseMatchSchema.refine(
  (data) => data.teamAId !== data.teamBId,
  {
    message: "Team A and Team B cannot be the same.",
    path: ["teamBId"],
  }
);

export const updateMatchSchema = baseMatchSchema.partial().refine(
  (data) => {
    if (!data.teamAId || !data.teamBId) return true;
    return data.teamAId !== data.teamBId;
  },
  {
    message: "Team A and Team B cannot be the same.",
    path: ["teamBId"],
  }
);
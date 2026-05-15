import { Request, Response } from "express";
import { seedDevData } from "./devSeed.service";

export async function seed(_req: Request, res: Response) {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({
      message: "Not found",
    });
  }

  try {
    const result = await seedDevData();
    return res.json(result);
  } catch {
    return res.status(500).json({
      message: "Failed to seed data",
    });
  }
}
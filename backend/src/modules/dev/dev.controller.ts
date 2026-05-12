import { Request, Response } from "express";
import { seedDevData } from "./devSeed.service";

export async function seed(req: Request, res: Response) {
  try {
    const result = await seedDevData();
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to seed data",
    });
  }
}
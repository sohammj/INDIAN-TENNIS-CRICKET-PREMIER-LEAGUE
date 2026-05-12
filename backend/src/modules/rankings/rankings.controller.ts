import { Request, Response } from "express";
import { rankingsService } from "./rankings.service";

export const rankingsController = {
  async findAll(_req: Request, res: Response) {
    try {
      const rankings = await rankingsService.findAll();
      return res.json(rankings);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch rankings",
      });
    }
  },
};
import { Request, Response } from "express";
import { rankingsService } from "./rankings.service";
import { handleControllerError } from "../../utils/http";

export const rankingsController = {
  async findAll(_req: Request, res: Response) {
    try {
      const rankings = await rankingsService.findAll();
      return res.json(rankings);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch rankings.");
    }
  },
};
import { Request, Response } from "express";
import { matchesService } from "./matches.service";
import { createMatchSchema, updateMatchSchema } from "./matches.validators";
import { getParam } from "../../utils/http";

export const matchesController = {
  async create(req: Request, res: Response) {
    const parsed = createMatchSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid match data",
        errors: parsed.error.flatten(),
      });
    }

    const match = await matchesService.create(parsed.data);
    return res.status(201).json(match);
  },

  async findAll(_req: Request, res: Response) {
    const matches = await matchesService.findAll();
    return res.json(matches);
  },

  async findById(req: Request, res: Response) {
    const match = await matchesService.findById(getParam(req.params.id, "id"));

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    return res.json(match);
  },

  async update(req: Request, res: Response) {
    const parsed = updateMatchSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid match data",
        errors: parsed.error.flatten(),
      });
    }

    const match = await matchesService.update(getParam(req.params.id, "id"), parsed.data);
    return res.json(match);
  },

  async delete(req: Request, res: Response) {
    await matchesService.delete(getParam(req.params.id, "id"));
    return res.json({ message: "Match deleted successfully" });
  },
};
import { Request, Response } from "express";
import { playersService } from "./players.service";
import { createPlayerSchema, updatePlayerSchema } from "./players.validators";
import { getParam } from "../../utils/http";

export const playersController = {
  async create(req: Request, res: Response) {
    const parsed = createPlayerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid player data",
        errors: parsed.error.flatten(),
      });
    }

    const player = await playersService.create(parsed.data);
    return res.status(201).json(player);
  },

  async findAll(_req: Request, res: Response) {
    const players = await playersService.findAll();
    return res.json(players);
  },

  async findById(req: Request, res: Response) {
    const player = await playersService.findById(getParam(req.params.id, "id"));

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.json(player);
  },

  async update(req: Request, res: Response) {
    const parsed = updatePlayerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid player data",
        errors: parsed.error.flatten(),
      });
    }

    const player = await playersService.update(getParam(req.params.id, "id"), parsed.data);
    return res.json(player);
  },

  async delete(req: Request, res: Response) {
    await playersService.delete(getParam(req.params.id, "id"));
    return res.json({ message: "Player deleted successfully" });
  },
};
import { Request, Response } from "express";
import { playersService } from "./players.service";
import { createPlayerSchema, updatePlayerSchema } from "./players.validators";
import { getParam, handleControllerError, validateBody } from "../../utils/http";

export const playersController = {
  async create(req: Request, res: Response) {
    try {
      const body = validateBody(createPlayerSchema, req.body);
      const player = await playersService.create(body);

      return res.status(201).json(player);
    } catch (error) {
      return handleControllerError(res, error, "Failed to create player.");
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const players = await playersService.findAll();
      return res.json(players);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch players.");
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const player = await playersService.findById(id);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      return res.json(player);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch player.");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const body = validateBody(updatePlayerSchema, req.body);

      const player = await playersService.update(id, body);

      return res.json(player);
    } catch (error) {
      return handleControllerError(res, error, "Failed to update player.");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      await playersService.delete(id);

      return res.json({ message: "Player deleted successfully" });
    } catch (error) {
      return handleControllerError(res, error, "Failed to delete player.");
    }
  },
};
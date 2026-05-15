import { Request, Response } from "express";
import { matchesService } from "./matches.service";
import { createMatchSchema, updateMatchSchema } from "./matches.validators";
import { getParam, handleControllerError, validateBody } from "../../utils/http";

export const matchesController = {
  async create(req: Request, res: Response) {
    try {
      const body = validateBody(createMatchSchema, req.body);
      const match = await matchesService.create(body);

      return res.status(201).json(match);
    } catch (error) {
      return handleControllerError(res, error, "Failed to create match.");
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const matches = await matchesService.findAll();
      return res.json(matches);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch matches.");
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const match = await matchesService.findById(id);

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      return res.json(match);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch match.");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const body = validateBody(updateMatchSchema, req.body);

      const match = await matchesService.update(id, body);

      return res.json(match);
    } catch (error) {
      return handleControllerError(res, error, "Failed to update match.");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      await matchesService.delete(id);

      return res.json({ message: "Match deleted successfully" });
    } catch (error) {
      return handleControllerError(res, error, "Failed to delete match.");
    }
  },
};
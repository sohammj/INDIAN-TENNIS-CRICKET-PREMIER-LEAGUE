import { Request, Response } from "express";
import { tournamentsService } from "./tournaments.service";
import {
  createTournamentSchema,
  updateTournamentSchema,
} from "./tournaments.validators";
import { getParam, handleControllerError, validateBody } from "../../utils/http";

export const tournamentsController = {
  async create(req: Request, res: Response) {
    try {
      const body = validateBody(createTournamentSchema, req.body);
      const tournament = await tournamentsService.create(body);

      return res.status(201).json(tournament);
    } catch (error) {
      return handleControllerError(res, error, "Failed to create tournament.");
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const tournaments = await tournamentsService.findAll();
      return res.json(tournaments);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch tournaments.");
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const tournament = await tournamentsService.findById(id);

      if (!tournament) {
        return res.status(404).json({
          message: "Tournament not found",
        });
      }

      return res.json(tournament);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch tournament.");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const body = validateBody(updateTournamentSchema, req.body);

      const tournament = await tournamentsService.update(id, body);

      return res.json(tournament);
    } catch (error) {
      return handleControllerError(res, error, "Failed to update tournament.");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      await tournamentsService.delete(id);

      return res.json({
        message: "Tournament deleted successfully",
      });
    } catch (error) {
      return handleControllerError(res, error, "Failed to delete tournament.");
    }
  },
};
import { Request, Response } from "express";
import { tournamentsService } from "./tournaments.service";
import {
  createTournamentSchema,
  updateTournamentSchema,
} from "./tournaments.validators";
import { getParam } from "../../utils/http";

export const tournamentsController = {
  async create(req: Request, res: Response) {
    const parsed = createTournamentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid tournament data",
        errors: parsed.error.flatten(),
      });
    }

    const tournament = await tournamentsService.create(parsed.data);

    return res.status(201).json(tournament);
  },

  async findAll(_req: Request, res: Response) {
    const tournaments = await tournamentsService.findAll();

    return res.json(tournaments);
  },

  async findById(req: Request, res: Response) {
    const tournament = await tournamentsService.findById(getParam(req.params.id, "id"));

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    return res.json(tournament);
  },

  async update(req: Request, res: Response) {
    const parsed = updateTournamentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid tournament data",
        errors: parsed.error.flatten(),
      });
    }

    const tournament = await tournamentsService.update(
      getParam(req.params.id, "id"),
      parsed.data
    );

    return res.json(tournament);
  },

  async delete(req: Request, res: Response) {
    await tournamentsService.delete(getParam(req.params.id, "id"));

    return res.json({
      message: "Tournament deleted successfully",
    });
  },
};
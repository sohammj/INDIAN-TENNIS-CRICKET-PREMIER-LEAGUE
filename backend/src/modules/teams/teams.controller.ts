import { Request, Response } from "express";
import { teamsService } from "./teams.service";
import {
  assignPlayerSchema,
  createTeamSchema,
  updateTeamSchema,
} from "./teams.validators";
import { getParam, handleControllerError, validateBody } from "../../utils/http";

export const teamsController = {
  async assignPlayer(req: Request, res: Response) {
    try {
      const teamId = getParam(req.params.teamId, "teamId");
      const body = validateBody(assignPlayerSchema, req.body);

      const link = await teamsService.assignPlayer(teamId, body);

      return res.status(201).json(link);
    } catch (error) {
      return handleControllerError(res, error, "Failed to assign player.");
    }
  },

  async removePlayer(req: Request, res: Response) {
    try {
      const linkId = getParam(req.params.linkId, "linkId");
      await teamsService.removePlayer(linkId);

      return res.json({
        message: "Player removed from team successfully",
      });
    } catch (error) {
      return handleControllerError(res, error, "Failed to remove player.");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const body = validateBody(createTeamSchema, req.body);
      const team = await teamsService.create(body);

      return res.status(201).json(team);
    } catch (error) {
      return handleControllerError(res, error, "Failed to create team.");
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const teams = await teamsService.findAll();
      return res.json(teams);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch teams.");
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const team = await teamsService.findById(id);

      if (!team) {
        return res.status(404).json({
          message: "Team not found",
        });
      }

      return res.json(team);
    } catch (error) {
      return handleControllerError(res, error, "Failed to fetch team.");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      const body = validateBody(updateTeamSchema, req.body);

      const team = await teamsService.update(id, body);

      return res.json(team);
    } catch (error) {
      return handleControllerError(res, error, "Failed to update team.");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = getParam(req.params.id, "id");
      await teamsService.delete(id);

      return res.json({
        message: "Team deleted successfully",
      });
    } catch (error) {
      return handleControllerError(res, error, "Failed to delete team.");
    }
  },
};
import { Request, Response } from "express";
import { teamsService } from "./teams.service";
import { createTeamSchema, updateTeamSchema } from "./teams.validators";
import { getParam } from "../../utils/http";

export const teamsController = {
  async assignPlayer(req: Request, res: Response) {
    try {
      const { playerId, role } = req.body;

      if (!playerId) {
        return res.status(400).json({
          message: "playerId is required",
        });
      }

      const teamId = getParam(req.params.teamId, "teamId");
      const link = await teamsService.assignPlayer(teamId, {
        playerId,
        role,
      });

      return res.status(201).json(link);
    } catch (error: any) {
      return res.status(500).json({
        message:
          error.message ||
          "Failed to assign player. Player may already be assigned.",
      });
    }
  },

  async removePlayer(req: Request, res: Response) {
    try {
      const linkId = getParam(req.params.linkId, "linkId");
      await teamsService.removePlayer(linkId);

      return res.json({
        message: "Player removed from team successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to remove player",
      });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const parsed = createTeamSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid team data",
          errors: parsed.error.flatten(),
        });
      }

      const team = await teamsService.create(parsed.data);
      return res.status(201).json(team);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to create team",
      });
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const teams = await teamsService.findAll();
      return res.json(teams);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch teams",
      });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const team = await teamsService.findById(getParam(getParam(req.params.id, "id"), "id"));

      if (!team) {
        return res.status(404).json({
          message: "Team not found",
        });
      }

      return res.json(team);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to fetch team",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const parsed = updateTeamSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid team data",
          errors: parsed.error.flatten(),
        });
      }

      const team = await teamsService.update(getParam(req.params.id, "id"), parsed.data);
      return res.json(team);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Failed to update team",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await teamsService.delete(getParam(req.params.id, "id"));

      return res.json({
        message: "Team deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        message:
          error.message ||
          "Failed to delete team. This team may be linked to matches or players.",
      });
    }
  },
};
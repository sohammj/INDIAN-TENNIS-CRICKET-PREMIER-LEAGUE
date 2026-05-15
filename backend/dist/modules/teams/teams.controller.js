"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsController = void 0;
const teams_service_1 = require("./teams.service");
const teams_validators_1 = require("./teams.validators");
const http_1 = require("../../utils/http");
exports.teamsController = {
    async assignPlayer(req, res) {
        try {
            const teamId = (0, http_1.getParam)(req.params.teamId, "teamId");
            const body = (0, http_1.validateBody)(teams_validators_1.assignPlayerSchema, req.body);
            const link = await teams_service_1.teamsService.assignPlayer(teamId, body);
            return res.status(201).json(link);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to assign player.");
        }
    },
    async removePlayer(req, res) {
        try {
            const linkId = (0, http_1.getParam)(req.params.linkId, "linkId");
            await teams_service_1.teamsService.removePlayer(linkId);
            return res.json({
                message: "Player removed from team successfully",
            });
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to remove player.");
        }
    },
    async create(req, res) {
        try {
            const body = (0, http_1.validateBody)(teams_validators_1.createTeamSchema, req.body);
            const team = await teams_service_1.teamsService.create(body);
            return res.status(201).json(team);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to create team.");
        }
    },
    async findAll(_req, res) {
        try {
            const teams = await teams_service_1.teamsService.findAll();
            return res.json(teams);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch teams.");
        }
    },
    async findById(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const team = await teams_service_1.teamsService.findById(id);
            if (!team) {
                return res.status(404).json({
                    message: "Team not found",
                });
            }
            return res.json(team);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch team.");
        }
    },
    async update(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const body = (0, http_1.validateBody)(teams_validators_1.updateTeamSchema, req.body);
            const team = await teams_service_1.teamsService.update(id, body);
            return res.json(team);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to update team.");
        }
    },
    async delete(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            await teams_service_1.teamsService.delete(id);
            return res.json({
                message: "Team deleted successfully",
            });
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to delete team.");
        }
    },
};

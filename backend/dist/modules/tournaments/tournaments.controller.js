"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentsController = void 0;
const tournaments_service_1 = require("./tournaments.service");
const tournaments_validators_1 = require("./tournaments.validators");
const http_1 = require("../../utils/http");
exports.tournamentsController = {
    async create(req, res) {
        try {
            const body = (0, http_1.validateBody)(tournaments_validators_1.createTournamentSchema, req.body);
            const tournament = await tournaments_service_1.tournamentsService.create(body);
            return res.status(201).json(tournament);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to create tournament.");
        }
    },
    async findAll(_req, res) {
        try {
            const tournaments = await tournaments_service_1.tournamentsService.findAll();
            return res.json(tournaments);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch tournaments.");
        }
    },
    async findById(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const tournament = await tournaments_service_1.tournamentsService.findById(id);
            if (!tournament) {
                return res.status(404).json({
                    message: "Tournament not found",
                });
            }
            return res.json(tournament);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch tournament.");
        }
    },
    async update(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const body = (0, http_1.validateBody)(tournaments_validators_1.updateTournamentSchema, req.body);
            const tournament = await tournaments_service_1.tournamentsService.update(id, body);
            return res.json(tournament);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to update tournament.");
        }
    },
    async delete(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            await tournaments_service_1.tournamentsService.delete(id);
            return res.json({
                message: "Tournament deleted successfully",
            });
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to delete tournament.");
        }
    },
};

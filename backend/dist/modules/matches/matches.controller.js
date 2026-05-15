"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesController = void 0;
const matches_service_1 = require("./matches.service");
const matches_validators_1 = require("./matches.validators");
const http_1 = require("../../utils/http");
exports.matchesController = {
    async create(req, res) {
        try {
            const body = (0, http_1.validateBody)(matches_validators_1.createMatchSchema, req.body);
            const match = await matches_service_1.matchesService.create(body);
            return res.status(201).json(match);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to create match.");
        }
    },
    async findAll(_req, res) {
        try {
            const matches = await matches_service_1.matchesService.findAll();
            return res.json(matches);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch matches.");
        }
    },
    async findById(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const match = await matches_service_1.matchesService.findById(id);
            if (!match) {
                return res.status(404).json({ message: "Match not found" });
            }
            return res.json(match);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch match.");
        }
    },
    async update(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const body = (0, http_1.validateBody)(matches_validators_1.updateMatchSchema, req.body);
            const match = await matches_service_1.matchesService.update(id, body);
            return res.json(match);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to update match.");
        }
    },
    async delete(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            await matches_service_1.matchesService.delete(id);
            return res.json({ message: "Match deleted successfully" });
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to delete match.");
        }
    },
};

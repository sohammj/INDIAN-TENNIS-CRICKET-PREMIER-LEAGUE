"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playersController = void 0;
const players_service_1 = require("./players.service");
const players_validators_1 = require("./players.validators");
const http_1 = require("../../utils/http");
exports.playersController = {
    async create(req, res) {
        try {
            const body = (0, http_1.validateBody)(players_validators_1.createPlayerSchema, req.body);
            const player = await players_service_1.playersService.create(body);
            return res.status(201).json(player);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to create player.");
        }
    },
    async findAll(_req, res) {
        try {
            const players = await players_service_1.playersService.findAll();
            return res.json(players);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch players.");
        }
    },
    async findById(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const player = await players_service_1.playersService.findById(id);
            if (!player) {
                return res.status(404).json({ message: "Player not found" });
            }
            return res.json(player);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to fetch player.");
        }
    },
    async update(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            const body = (0, http_1.validateBody)(players_validators_1.updatePlayerSchema, req.body);
            const player = await players_service_1.playersService.update(id, body);
            return res.json(player);
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to update player.");
        }
    },
    async delete(req, res) {
        try {
            const id = (0, http_1.getParam)(req.params.id, "id");
            await players_service_1.playersService.delete(id);
            return res.json({ message: "Player deleted successfully" });
        }
        catch (error) {
            return (0, http_1.handleControllerError)(res, error, "Failed to delete player.");
        }
    },
};

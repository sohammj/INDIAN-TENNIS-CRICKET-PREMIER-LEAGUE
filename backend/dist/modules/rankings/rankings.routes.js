"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rankings_controller_1 = require("./rankings.controller");
const router = (0, express_1.Router)();
router.get("/", rankings_controller_1.rankingsController.findAll);
exports.default = router;

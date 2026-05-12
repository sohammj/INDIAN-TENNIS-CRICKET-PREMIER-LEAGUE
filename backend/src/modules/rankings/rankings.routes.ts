import { Router } from "express";
import { rankingsController } from "./rankings.controller";

const router = Router();

router.get("/", rankingsController.findAll);

export default router;
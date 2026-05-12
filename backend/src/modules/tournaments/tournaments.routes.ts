import { Router } from "express";
import { tournamentsController } from "./tournaments.controller";

const router = Router();

router.post("/", tournamentsController.create);
router.get("/", tournamentsController.findAll);
router.get("/:id", tournamentsController.findById);
router.patch("/:id", tournamentsController.update);
router.delete("/:id", tournamentsController.delete);

export default router;
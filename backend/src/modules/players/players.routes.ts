import { Router } from "express";
import { playersController } from "./players.controller";

const router = Router();

router.post("/", playersController.create);
router.get("/", playersController.findAll);
router.get("/:id", playersController.findById);
router.patch("/:id", playersController.update);
router.delete("/:id", playersController.delete);

export default router;
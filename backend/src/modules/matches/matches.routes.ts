import { Router } from "express";
import { matchesController } from "./matches.controller";

const router = Router();

router.post("/", matchesController.create);
router.get("/", matchesController.findAll);
router.get("/:id", matchesController.findById);
router.patch("/:id", matchesController.update);
router.delete("/:id", matchesController.delete);

export default router;
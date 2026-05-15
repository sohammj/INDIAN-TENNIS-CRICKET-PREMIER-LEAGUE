import { Router } from "express";
import { playersController } from "./players.controller";
import { protect } from "../../middleware/auth.middleware";
import { requireAdmin } from "../../middleware/admin.middleware";
import { writeRateLimit } from "../../middleware/rateLimit.middleware";

const router = Router();

router.get("/", playersController.findAll);
router.get("/:id", playersController.findById);

router.post("/", protect, requireAdmin, writeRateLimit, playersController.create);
router.patch("/:id", protect, requireAdmin, writeRateLimit, playersController.update);
router.delete("/:id", protect, requireAdmin, writeRateLimit, playersController.delete);

export default router;
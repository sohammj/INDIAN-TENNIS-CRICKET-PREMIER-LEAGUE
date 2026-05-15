import { Router } from "express";
import { tournamentsController } from "./tournaments.controller";
import { protect } from "../../middleware/auth.middleware";
import { requireAdmin } from "../../middleware/admin.middleware";
import { writeRateLimit } from "../../middleware/rateLimit.middleware";

const router = Router();

router.get("/", tournamentsController.findAll);
router.get("/:id", tournamentsController.findById);

router.post("/", protect, requireAdmin, writeRateLimit, tournamentsController.create);
router.patch("/:id", protect, requireAdmin, writeRateLimit, tournamentsController.update);
router.delete("/:id", protect, requireAdmin, writeRateLimit, tournamentsController.delete);

export default router;
import { Router } from "express";
import { matchesController } from "./matches.controller";
import { protect } from "../../middleware/auth.middleware";
import { requireAdminOrScorer } from "../../middleware/admin.middleware";
import { writeRateLimit } from "../../middleware/rateLimit.middleware";

const router = Router();

router.get("/", matchesController.findAll);
router.get("/:id", matchesController.findById);

router.post("/", protect, requireAdminOrScorer, writeRateLimit, matchesController.create);
router.patch("/:id", protect, requireAdminOrScorer, writeRateLimit, matchesController.update);
router.delete("/:id", protect, requireAdminOrScorer, writeRateLimit, matchesController.delete);

export default router;
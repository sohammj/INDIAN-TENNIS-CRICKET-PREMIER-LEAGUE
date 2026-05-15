import { Router } from "express";
import { teamsController } from "./teams.controller";
import { protect } from "../../middleware/auth.middleware";
import { requireAdmin } from "../../middleware/admin.middleware";
import { writeRateLimit } from "../../middleware/rateLimit.middleware";

const router = Router();

router.get("/", teamsController.findAll);
router.get("/:id", teamsController.findById);

router.post("/", protect, requireAdmin, writeRateLimit, teamsController.create);
router.patch("/:id", protect, requireAdmin, writeRateLimit, teamsController.update);
router.delete("/:id", protect, requireAdmin, writeRateLimit, teamsController.delete);

router.post(
  "/:teamId/players",
  protect,
  requireAdmin,
  writeRateLimit,
  teamsController.assignPlayer
);

router.delete(
  "/:teamId/players/:linkId",
  protect,
  requireAdmin,
  writeRateLimit,
  teamsController.removePlayer
);

export default router;
import { Router } from "express";
import { teamsController } from "./teams.controller";
import { protect } from "../../middleware/auth.middleware";
import { requireAdmin } from "../../middleware/admin.middleware";

const router = Router();

router.post("/", teamsController.create);
router.get("/", teamsController.findAll);
router.get("/:id", teamsController.findById);
router.patch("/:id", teamsController.update);
router.delete("/:id", teamsController.delete);

router.post(
  "/:teamId/players",
  protect,
  requireAdmin,
  teamsController.assignPlayer
);

router.delete(
  "/:teamId/players/:linkId",
  protect,
  requireAdmin,
  teamsController.removePlayer
);

export default router;
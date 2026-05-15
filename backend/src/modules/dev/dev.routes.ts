import { Router } from "express";
import { seed } from "./dev.controller";
import { protect } from "../../middleware/auth.middleware";
import { requireAdmin } from "../../middleware/admin.middleware";
import { writeRateLimit } from "../../middleware/rateLimit.middleware";

const router = Router();

router.post("/seed", protect, requireAdmin, writeRateLimit, seed);

export default router;
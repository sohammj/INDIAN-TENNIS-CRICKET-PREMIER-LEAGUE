import { Router } from "express";

import { protect } from "../../middleware/auth.middleware";
import { requireAdmin } from "../../middleware/admin.middleware";
import { getOverview, getPayments, getUsers } from "./admin.controller";

const router = Router();

router.get("/overview", protect, requireAdmin, getOverview);
router.get("/users", protect, requireAdmin, getUsers);
router.get("/payments", protect, requireAdmin, getPayments);

export default router;
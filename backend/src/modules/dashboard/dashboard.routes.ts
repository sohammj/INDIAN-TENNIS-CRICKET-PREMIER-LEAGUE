import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { getMeDashboard } from "./dashboard.controller";

const router = Router();

router.get("/me", protect, getMeDashboard);

export default router;
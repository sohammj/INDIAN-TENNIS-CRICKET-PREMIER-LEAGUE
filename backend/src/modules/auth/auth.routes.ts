import { Router } from "express";
import { csrf, login, logout, me, refresh, register } from "./auth.controller";
import { protect } from "../../middleware/auth.middleware";
import { authRateLimit } from "../../middleware/rateLimit.middleware";

const router = Router();

router.get("/csrf", csrf);
router.post("/register", authRateLimit, register);
router.post("/login", authRateLimit, login);
router.post("/refresh", authRateLimit, refresh);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router;
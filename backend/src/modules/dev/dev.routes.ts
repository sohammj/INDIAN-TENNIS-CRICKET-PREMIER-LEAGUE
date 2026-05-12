import { Router } from "express";
import { seed } from "./dev.controller";

const router = Router();

router.post("/seed", seed);

export default router;
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getMyDashboard } from "./dashboard.service";
import { handleControllerError } from "../../utils/http";

export async function getMeDashboard(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dashboard = await getMyDashboard(req.user.userId);

    return res.json(dashboard);
  } catch (error) {
    return handleControllerError(res, error, "Failed to fetch dashboard.");
  }
}
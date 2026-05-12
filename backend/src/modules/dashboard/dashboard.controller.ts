import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getMyDashboard } from "./dashboard.service";

export async function getMeDashboard(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dashboard = await getMyDashboard(req.user.userId);

    return res.json(dashboard);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to fetch dashboard",
    });
  }
}
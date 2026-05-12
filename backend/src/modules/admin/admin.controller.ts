import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getAdminOverview } from "./admin.service";

export async function getOverview(req: AuthRequest, res: Response) {
  try {
    const overview = await getAdminOverview();

    return res.json(overview);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to fetch admin overview",
    });
  }
}

import { getAdminPayments, getAdminUsers } from "./admin.service";

export async function getUsers(_req: AuthRequest, res: Response) {
  try {
    const users = await getAdminUsers();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to fetch users",
    });
  }
}

export async function getPayments(_req: AuthRequest, res: Response) {
  try {
    const payments = await getAdminPayments();
    return res.json(payments);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to fetch payments",
    });
  }
}
import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  getAdminOverview,
  getAdminPayments,
  getAdminUsers,
} from "./admin.service";
import { handleControllerError } from "../../utils/http";

export async function getOverview(_req: AuthRequest, res: Response) {
  try {
    const overview = await getAdminOverview();
    return res.json(overview);
  } catch (error) {
    return handleControllerError(
      res,
      error,
      "Failed to fetch admin overview."
    );
  }
}

export async function getUsers(_req: AuthRequest, res: Response) {
  try {
    const users = await getAdminUsers();
    return res.json(users);
  } catch (error) {
    return handleControllerError(res, error, "Failed to fetch users.");
  }
}

export async function getPayments(_req: AuthRequest, res: Response) {
  try {
    const payments = await getAdminPayments();
    return res.json(payments);
  } catch (error) {
    return handleControllerError(res, error, "Failed to fetch payments.");
  }
}
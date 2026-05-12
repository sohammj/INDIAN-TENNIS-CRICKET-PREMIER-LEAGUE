import { Request, Response } from "express";

import { loginUser, registerUser } from "./auth.service";

import { AuthRequest } from "../../middleware/auth.middleware";
import { prisma } from "../../config/prisma";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await loginUser(req.body);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}



export async function me(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(user);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch user",
    });
  }
}
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import { prisma } from "./config/prisma";
import teamsRoutes from "./modules/teams/teams.routes";
import playersRoutes from "./modules/players/players.routes";
import tournamentsRoutes from "./modules/tournaments/tournaments.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import matchesRoutes from "./modules/matches/matches.routes";
import rankingsRoutes from "./modules/rankings/rankings.routes";
import adminRoutes from "./modules/admin/admin.routes";
import authRoutes from "./modules/auth/auth.routes";
import devRoutes from "./modules/dev/dev.routes";
import { csrfProtection } from "./middleware/csrf.middleware";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://indian-tennis-cricket-premier-leagu.vercel.app",
].filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(csrfProtection);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "itcpl-backend" });
});

app.get("/db-test", async (_req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json({ connected: true, users });
  } catch {
    res.status(500).json({
      connected: false,
      error: "Database connection failed",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/rankings", rankingsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/api/dev", devRoutes);
}

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
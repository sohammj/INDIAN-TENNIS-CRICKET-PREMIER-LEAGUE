import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { prisma } from "./config/prisma";
import teamsRoutes from "./modules/teams/teams.routes";
import playersRoutes from "./modules/players/players.routes";
import tournamentsRoutes from "./modules/tournaments/tournaments.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
dotenv.config();
import matchesRoutes from "./modules/matches/matches.routes";
import rankingsRoutes from "./modules/rankings/rankings.routes";
import adminRoutes from "./modules/admin/admin.routes";
import authRoutes from "./modules/auth/auth.routes";
import devRoutes from "./modules/dev/dev.routes";



const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "itcpl-backend" });
});

app.get("/db-test", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      connected: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      connected: false,
      error: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 4000;

app.use("/api/teams", teamsRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/rankings", rankingsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dev", devRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
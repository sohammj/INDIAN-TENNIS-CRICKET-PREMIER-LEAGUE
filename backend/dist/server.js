"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const prisma_1 = require("./config/prisma");
const teams_routes_1 = __importDefault(require("./modules/teams/teams.routes"));
const players_routes_1 = __importDefault(require("./modules/players/players.routes"));
const tournaments_routes_1 = __importDefault(require("./modules/tournaments/tournaments.routes"));
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/dashboard.routes"));
const matches_routes_1 = __importDefault(require("./modules/matches/matches.routes"));
const rankings_routes_1 = __importDefault(require("./modules/rankings/rankings.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const dev_routes_1 = __importDefault(require("./modules/dev/dev.routes"));
const csrf_middleware_1 = require("./middleware/csrf.middleware");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "https://indian-tennis-cricket-premier-leagu.vercel.app",
].filter(Boolean);
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
}));
app.use((0, cors_1.default)({
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.use(csrf_middleware_1.csrfProtection);
app.use((0, morgan_1.default)(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "itcpl-backend" });
});
app.get("/db-test", async (_req, res) => {
    if (process.env.NODE_ENV === "production") {
        return res.status(404).json({ message: "Not found" });
    }
    try {
        const users = await prisma_1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        res.json({ connected: true, users });
    }
    catch {
        res.status(500).json({
            connected: false,
            error: "Database connection failed",
        });
    }
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/teams", teams_routes_1.default);
app.use("/api/players", players_routes_1.default);
app.use("/api/tournaments", tournaments_routes_1.default);
app.use("/api/matches", matches_routes_1.default);
app.use("/api/rankings", rankings_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
if (process.env.NODE_ENV !== "production") {
    app.use("/api/dev", dev_routes_1.default);
}
app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

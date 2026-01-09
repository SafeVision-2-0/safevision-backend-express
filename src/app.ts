import express from "express";
import morgan from "morgan"
import type {Application} from "express";
import cors from "cors";
import teamRoutes from "./routes/team.router";
import positionRoutes from "./routes/position.router";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import profileRoutes from "./routes/profile.router";
import profilePositionRoutes from "./routes/profile.position.router";
import profileTeamRoutes from "./routes/profile.team.router";
import historyRoutes from "./routes/history.router";


const app: Application = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Logging setiap request
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Server berjalan dengan baik 🚀",
        status: "success",
    });
});

app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/positions", positionRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/profile-position", profilePositionRoutes);
app.use("/api/v1/profile-team", profileTeamRoutes);
app.use("/api/v1/history", historyRoutes);

export default app;
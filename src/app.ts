import express from "express";
import morgan from "morgan"
import type {Application} from "express";
import cors from "cors";
import teamRoutes from "./routes/team.router";
import positionRoutes from "./routes/position.router";
import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";

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

export default app;
import {Router} from "express";
import {
    eraseTeam,
    getProfilesByTeamId,
    getTeams,
    getTeamsWithPagination,
    postTeam,
    putTeam
} from "../controllers/team.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router: Router = Router();

//router.get("/", getTeams);
router.get("/", getTeamsWithPagination);
router.get("/:teamId/profile",getProfilesByTeamId)
router.post("/", postTeam);
router.put("/:id", putTeam);
router.delete("/:id", eraseTeam);

export default router;
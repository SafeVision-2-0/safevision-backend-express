import {Router} from "express";
import {eraseTeam, getTeams, postTeam, putTeam} from "../controllers/team.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", getTeams);
router.post("/", postTeam);
router.put("/:id", putTeam);
router.delete("/:id", eraseTeam);

export default router;
import { Router } from "express";

import {postProfileTeam,eraseProfileTeam} from "../controllers/profile.team.controller";
const router: Router = Router();

router.post("/", postProfileTeam);
router.delete("/:profileId/:teamId", eraseProfileTeam);

export default router;
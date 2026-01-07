import { Router } from "express";

import {postProfilePosition,eraseProfilePosition} from "../controllers/profile.position.controller";
const router: Router = Router();

router.post("/", postProfilePosition);
router.delete("/:profileId/:positionId", eraseProfilePosition);

export default router;
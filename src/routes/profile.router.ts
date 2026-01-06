import { Router } from "express";
import {eraseProfile, postProfile, putProfile,getProfiles,getProfileById} from "../controllers/profile.controller";

const router: Router = Router();

router.post("/", postProfile);
router.put("/:id", putProfile);
router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.delete("/:id", eraseProfile);

export default router;
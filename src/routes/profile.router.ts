import {Router} from "express";
import {
    eraseProfile,
    postProfile,
    putProfile,
    getProfiles,
    getProfileById,
    getPositionsById,
    getTeamsByProfileId
} from "../controllers/profile.controller";

const router: Router = Router();

router.post("/", postProfile);
router.put("/:id", putProfile);
router.get("/:profileId/position", getPositionsById);
router.get("/:profileId/team", getTeamsByProfileId);
router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.delete("/:id", eraseProfile);

export default router;
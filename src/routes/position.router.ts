import {Router} from "express";
import {
    erasePosition,
    getPositions, getPositionsWithMembersPreview, getPositionsWithPagination,
    getProfilesByPositionId,
    postPosition,
    putPosition
} from "../controllers/position.controller";

const router: Router = Router();

//router.get("/", getPositions);
//router.get("/",getPositionsWithPagination)
router.get("/",getPositionsWithMembersPreview)
router.get("/:positionId/profile", getProfilesByPositionId);
router.post("/", postPosition);
router.put("/:id", putPosition);
router.delete("/:id", erasePosition);

export default router;
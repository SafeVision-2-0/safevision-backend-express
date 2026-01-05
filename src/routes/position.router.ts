import { Router } from "express";
import {erasePosition, getPositions, postPosition, putPosition} from "../controllers/position.controller";

const router: Router = Router();

router.get("/", getPositions);
router.post("/", postPosition);
router.put("/:id", putPosition);
router.delete("/:id", erasePosition);

export default router;
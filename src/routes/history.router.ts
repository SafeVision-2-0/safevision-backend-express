import {uploadHistory} from "../middlewares/upload.history.middleware";
import {
    postHistory,
    eraseHistory,
    getHistories,
    getHistoryById,
    getHistoriesWithPagination, getCountedHistory, getTodayHistoryStatsController
} from "../controllers/history.controller";
import {Router} from "express";

const router: Router = Router();

router.post("/", uploadHistory.single("file"), postHistory);
router.delete("/:id", eraseHistory);
// router.get("/", getHistories);
router.get("/", getHistoriesWithPagination);
router.get("/most-capture", getTodayHistoryStatsController)
router.get("/count", getCountedHistory);
router.get("/:id", getHistoryById);

export default router;
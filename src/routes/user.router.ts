import {Router} from "express";
import {getUsers, putUser} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", getUsers);
router.put("/", authMiddleware, putUser);

export default router;
import {uploadProfileImage} from "../middlewares/upload.profile.image.middleware";
import {postProfileImage, eraseProfileImage, getProfileImages, getProfileImageById} from "../controllers/profile.image.controller";

import {Router} from "express";

const router: Router = Router();

router.post("/", uploadProfileImage.single("file"), postProfileImage);
router.delete("/:id", eraseProfileImage);
router.get("/", getProfileImages);
router.get("/:id", getProfileImageById);

export default router;
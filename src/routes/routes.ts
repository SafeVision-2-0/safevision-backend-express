import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
    res.json({ message: "users route ok" });
});

export default router;
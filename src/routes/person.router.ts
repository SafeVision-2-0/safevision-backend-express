import {Router} from "express";
import {getPersons,getPersonById} from "../controllers/person.controller";
const router: Router = Router();

router.get("/", getPersons);
router.get("/:id", getPersonById);


export default router;
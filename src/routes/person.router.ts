import {Router} from "express";
import {getPersons, getPersonById, getPersonsWithPagination} from "../controllers/person.controller";
const router: Router = Router();

//router.get("/", getPersons);
router.get("/:id", getPersonById);
router.get("/",getPersonsWithPagination)

export default router;
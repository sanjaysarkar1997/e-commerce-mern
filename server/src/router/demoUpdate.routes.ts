import express from "express";
import {
  createPerson,
  deletePerson,
  getPersons,
  getPersonsWithPagination,
  updatePerson,
} from "../controller/demoUpdate.controller";

const router = express.Router();

router.get("/persons", getPersons);
router.get("/person/:id", getPersons);
router.get("/persons-paginated", getPersonsWithPagination);

router.post("/create-person", createPerson);
router.post("/update-person", updatePerson);
router.delete("/delete-person/:id", deletePerson);

export default router;

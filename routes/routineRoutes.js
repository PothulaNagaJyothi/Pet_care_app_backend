import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createRoutine,
  getRoutines,
  getRoutinesByPet,
  updateRoutine,
  deleteRoutine
} from "../controllers/routineController.js";

const router = express.Router();

router.get("/", authenticateUser, getRoutines);
router.get("/pet/:petId", authenticateUser, getRoutinesByPet);

router.post("/", authenticateUser, createRoutine);

router.put("/:id", authenticateUser, updateRoutine);
router.delete("/:id", authenticateUser, deleteRoutine);

export default router;
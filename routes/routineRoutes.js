import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
  deleteRoutine
} from "../controllers/routineController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createRoutine);
router.get("/:petId", authenticateUser, getRoutines);
router.put("/:id", authenticateUser, updateRoutine);
router.delete("/:id", authenticateUser, deleteRoutine);

export default router;
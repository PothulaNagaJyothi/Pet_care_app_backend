import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createWeightLog,
  getWeightLogs,
  updateWeightLog,
  deleteWeightLog
} from "../controllers/weightLogController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createWeightLog);
router.get("/:petId", authenticateUser, getWeightLogs);
router.put("/:id", authenticateUser, updateWeightLog);
router.delete("/:id", authenticateUser, deleteWeightLog);

export default router;
import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createEmergencyVet,
  getEmergencyVets,
  updateEmergencyVet,
  deleteEmergencyVet
} from "../controllers/emergencyVetController.js";

const router = express.Router();

router.get("/", authenticateUser, getEmergencyVets);
router.post("/", authenticateUser, createEmergencyVet);
router.put("/:id", authenticateUser, updateEmergencyVet);
router.delete("/:id", authenticateUser, deleteEmergencyVet);

export default router;
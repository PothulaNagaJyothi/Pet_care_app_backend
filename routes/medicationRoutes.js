import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createMedication,
  getMedications,
  getMedicationsByPet,
  updateMedication,
  deleteMedication
} from "../controllers/medicationController.js";

const router = express.Router();

// Get all medications for logged-in user
router.get("/", authenticateUser, getMedications);

// Get medications by specific pet
router.get("/pet/:petId", authenticateUser, getMedicationsByPet);

router.post("/", authenticateUser, createMedication);

router.put("/:id", authenticateUser, updateMedication);

router.delete("/:id", authenticateUser, deleteMedication);

export default router;
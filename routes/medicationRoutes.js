import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createMedication,
  getMedications,
  updateMedication,
  deleteMedication
} from "../controllers/medicationController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createMedication);
router.get("/:petId", authenticateUser, getMedications);
router.put("/:id", authenticateUser, updateMedication);
router.delete("/:id", authenticateUser, deleteMedication);

export default router;
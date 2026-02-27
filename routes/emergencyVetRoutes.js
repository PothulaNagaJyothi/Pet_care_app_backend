import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createVet,
  getVets,
  updateVet,
  deleteVet
} from "../controllers/emergencyVetController.js";

const router = express.Router();

// Public
router.get("/", getVets);

// Auth required
router.post("/", authenticateUser, createVet);
router.put("/:id", authenticateUser, updateVet);
router.delete("/:id", authenticateUser, deleteVet);

export default router;
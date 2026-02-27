import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createVaccination,
  getVaccinations,
  updateVaccination,
  deleteVaccination
} from "../controllers/vaccinationController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createVaccination);
router.get("/:petId", authenticateUser, getVaccinations);
router.put("/:id", authenticateUser, updateVaccination);
router.delete("/:id", authenticateUser, deleteVaccination);

export default router;
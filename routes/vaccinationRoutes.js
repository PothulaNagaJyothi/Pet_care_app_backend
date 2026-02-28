import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createVaccination,
  getVaccinations,
  getVaccinationsByPet,
  updateVaccination,
  deleteVaccination
} from "../controllers/vaccinationController.js";

const router = express.Router();

// Get all vaccinations for logged-in user
router.get("/", authenticateUser, getVaccinations);

// Get vaccinations for specific pet
router.get("/pet/:petId", authenticateUser, getVaccinationsByPet);

router.post("/", authenticateUser, createVaccination);
router.put("/:id", authenticateUser, updateVaccination);
router.delete("/:id", authenticateUser, deleteVaccination);

export default router;
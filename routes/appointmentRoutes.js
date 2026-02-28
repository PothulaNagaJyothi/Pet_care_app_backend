import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
  getAppointmentsByPet,
  updateAppointment,
  deleteAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

// Get all appointments for logged-in user
router.get("/", authenticateUser, getAppointments);

// Get appointments by specific pet
router.get("/pet/:petId", authenticateUser, getAppointmentsByPet);

router.post("/", authenticateUser, createAppointment);

router.put("/:id", authenticateUser, updateAppointment);

router.delete("/:id", authenticateUser, deleteAppointment);

export default router;
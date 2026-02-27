import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createAppointment);
router.get("/:petId", authenticateUser, getAppointments);
router.put("/:id", authenticateUser, updateAppointment);
router.delete("/:id", authenticateUser, deleteAppointment);

export default router;
import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createInsurance,
  getInsurance,
  getInsuranceByPet,
  updateInsurance,
  deleteInsurance
} from "../controllers/insuranceController.js";

const router = express.Router();

// Get all insurance policies for logged-in user
router.get("/", authenticateUser, getInsurance);

// Get insurance by specific pet
router.get("/pet/:petId", authenticateUser, getInsuranceByPet);

router.post("/", authenticateUser, createInsurance);

router.put("/:id", authenticateUser, updateInsurance);

router.delete("/:id", authenticateUser, deleteInsurance);

export default router;
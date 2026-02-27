import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createInsurance,
  getInsurance,
  updateInsurance,
  deleteInsurance
} from "../controllers/insuranceController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createInsurance);
router.get("/:petId", authenticateUser, getInsurance);
router.put("/:id", authenticateUser, updateInsurance);
router.delete("/:id", authenticateUser, deleteInsurance);

export default router;
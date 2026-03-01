import express from "express";
import { generatePetMedicalReport } from "../controllers/exportController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: GET /api/export/pdf/:petId
// Export a pet's medical data as a PDF document
router.get("/pdf/:petId", authenticateUser, generatePetMedicalReport);

export default router;

import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
    getNutritionLogsByPet,
    getNutritionLogById,
    createNutritionLog,
    updateNutritionLog,
    deleteNutritionLog
} from "../controllers/nutritionController.js";

const router = express.Router();

router.route("/")
    .post(authenticateUser, createNutritionLog);

router.route("/:id")
    .put(authenticateUser, updateNutritionLog)
    .delete(authenticateUser, deleteNutritionLog);

// Get all logs for a specific pet
router.get("/pet/:petId", authenticateUser, getNutritionLogsByPet);

// Get a single log by its ID
router.get("/log/:id", authenticateUser, getNutritionLogById);

export default router;

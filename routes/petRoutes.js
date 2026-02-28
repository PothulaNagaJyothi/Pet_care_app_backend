import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";   
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet
} from "../controllers/petController.js";

const router = express.Router();

// Create pet (with optional image)
router.post(
  "/",
  authenticateUser,
  upload.single("image"),   // 👈 very important
  createPet
);

// Get all pets
router.get("/", authenticateUser, getPets);

// Get pet by id
router.get("/:id", authenticateUser, getPetById);

// Update pet (with optional new image)
router.put(
  "/:id",
  authenticateUser,
  upload.single("image"),   
  updatePet
);

// Delete pet
router.delete("/:id", authenticateUser, deletePet);

export default router;
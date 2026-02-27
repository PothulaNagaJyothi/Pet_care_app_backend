import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet
} from "../controllers/petController.js";

const router = express.Router();

router.post("/", authenticateUser, createPet);
router.get("/", authenticateUser, getPets);
router.get("/:id", authenticateUser, getPetById);
router.put("/:id", authenticateUser, updatePet);
router.delete("/:id", authenticateUser, deletePet);

export default router;
import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntriesByPet,
  updateJournalEntry,
  deleteJournalEntry
} from "../controllers/journalController.js";

const router = express.Router();

// Get all journal entries for logged-in user
router.get("/", authenticateUser, getJournalEntries);

// Get entries by specific pet
router.get("/pet/:petId", authenticateUser, getJournalEntriesByPet);

router.post("/", authenticateUser, createJournalEntry);

router.put("/:id", authenticateUser, updateJournalEntry);

router.delete("/:id", authenticateUser, deleteJournalEntry);

export default router;
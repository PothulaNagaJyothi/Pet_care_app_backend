import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createJournalEntry,
  getJournalEntries,
  updateJournalEntry,
  deleteJournalEntry
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/:petId", authenticateUser, createJournalEntry);
router.get("/:petId", authenticateUser, getJournalEntries);
router.put("/:id", authenticateUser, updateJournalEntry);
router.delete("/:id", authenticateUser, deleteJournalEntry);

export default router;
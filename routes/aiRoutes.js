import express from "express";
import { handleAiChat } from "../controllers/aiController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: POST /api/ai/chat
// Process a user message and return the AI response
router.post("/chat", authenticateUser, handleAiChat);

export default router;

import express from "express";
import { handleAiChat } from "../controllers/aiController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Route: POST /api/ai/chat
// Process a user message and return the AI response
router.post("/chat", authenticateUser, aiRateLimiter, handleAiChat);

export default router;

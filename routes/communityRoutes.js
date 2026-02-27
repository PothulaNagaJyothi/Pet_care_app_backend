import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost
} from "../controllers/communityController.js";

const router = express.Router();

// Public
router.get("/", getAllPosts);

// Auth required
router.post("/", authenticateUser, createPost);
router.get("/me", authenticateUser, getMyPosts);
router.delete("/:id", authenticateUser, deletePost);

export default router;
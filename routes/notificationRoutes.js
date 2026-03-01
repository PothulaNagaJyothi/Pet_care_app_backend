import express from "express";
import { getUserNotifications, markAsRead, markAllAsRead } from "../controllers/notificationController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications for the user
router.get("/", authenticateUser, getUserNotifications);

// Mark a single notification as read
router.put("/:id/read", authenticateUser, markAsRead);

// Mark all notifications as read
router.put("/read-all", authenticateUser, markAllAsRead);

export default router;

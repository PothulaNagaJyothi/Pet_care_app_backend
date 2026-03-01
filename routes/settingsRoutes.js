import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
    getUserSettings,
    updateUserSettings
} from "../controllers/settingsController.js";

const router = express.Router();

router.route("/")
    .get(authenticateUser, getUserSettings)
    .put(authenticateUser, updateUserSettings);

export default router;

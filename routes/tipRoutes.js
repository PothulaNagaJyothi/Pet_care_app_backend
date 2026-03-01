import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
    getTips,
    getDailyTip
} from "../controllers/tipController.js";

const router = express.Router();

router.get("/", authenticateUser, getTips);
router.get("/daily", authenticateUser, getDailyTip);

export default router;

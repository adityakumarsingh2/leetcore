import { Router } from "express";
import {
    getConsistencyData,
    getDashboardStats,
    getStreakData,
    getUserActivity,
    markDailyActivity,
} from "../controllers/activity.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/mark", markDailyActivity);
router.get("/user/:userId", getUserActivity);
router.get("/streak/:userId", getStreakData);
router.get("/consistency/:userId", getConsistencyData);
router.get("/dashboard/:userId", getDashboardStats);

export default router;

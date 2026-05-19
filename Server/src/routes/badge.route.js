import { Router } from "express";
import {
    awardBadgeToUser,
    createBadge,
    getAllBadges,
    getSingleBadge,
    getUserBadges,
    removeBadgeFromUser,
} from "../controllers/badge.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.route("/")
    .get(getAllBadges)
    .post(authMiddleware, createBadge);

router.post("/award", authMiddleware, awardBadgeToUser);
router.get("/user/:userId", authMiddleware, getUserBadges);
router.delete("/user/:userId/:badgeId", authMiddleware, removeBadgeFromUser);
router.get("/:id", getSingleBadge);

export default router;

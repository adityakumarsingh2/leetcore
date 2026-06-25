import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitFeedback } from "../controllers/feedback.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

const feedbackRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 feedback submissions per window
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(authMiddleware);
router.use(feedbackRateLimiter);

router.post("/", submitFeedback);

export default router;

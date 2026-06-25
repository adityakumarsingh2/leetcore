import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitSponsorshipRequest } from "../controllers/sponsorship.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

const sponsorshipRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 sponsorship requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(authMiddleware);

router.post("/", sponsorshipRequestLimiter, submitSponsorshipRequest);

export default router;

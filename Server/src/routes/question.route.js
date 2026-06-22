import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";
import SolvedProblem from "../models/SolvedProblem.models.js";
import User from "../models/User.models.js";
import UserActivity from "../models/useractivity.models.js";
import { toDateKey, getRangeBounds } from "../utils/date.utils.js";
import { calculateDailyConsistencyScore, getNextStreak, calculateLevel } from "../utils/gamification.utils.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to normalize topic name to match files
function normalizeTopicName(topic) {
    if (!topic) return "";
    return topic.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Helper to normalize pattern slug
function normalizePatternSlug(pattern) {
    if (!pattern) return "";
    return pattern.toLowerCase()
        .replace(/’/g, "")
        .replace(/'/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Optional Auth Middleware to grab user ID if logged in
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || (req.get("authorization")?.startsWith("Bearer ") ? req.get("authorization").slice(7).trim() : "");
        if (token && process.env.JWT_SECRET) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
        }
    } catch (error) {
        // Silent catch for guest users
    }
    next();
};

const patternMetadata = {
    "two-pointers": {
        title: "Two Pointers",
        desc: "Use two indices moving toward each other or in the same direction."
    },
    "sliding-window": {
        title: "Sliding Window",
        desc: "Maintain a dynamic subarray."
    },
    "prefix-sum": {
        title: "Prefix Sum",
        desc: "Precompute cumulative sums."
    },
    "binary-search": {
        title: "Binary Search",
        desc: "Divide search space in half."
    },
    "matrix": {
        title: "Matrix",
        desc: "Navigate 2D arrays."
    },
    "sorting": {
        title: "Sorting",
        desc: "Sort first, then solve Problems."
    },
    "kadanes-algorithm": {
        title: "Kadane’s Algorithm",
        desc: "Maximum/minimum subarray optimization."
    },
    "hashing": {
        title: "Hashing",
        desc: "Use HashMap or HashSet."
    },
    "monotonic-stack": {
        title: "Monotonic Stack",
        desc: "Maintain increasing/decreasing order."
    }
};

// Route to get list of patterns and counts for a topic
router.get("/patterns", optionalAuth, async (req, res) => {
    try {
        const { topic } = req.query;
        if (!topic) {
            return res.status(400).json({ success: false, message: "topic is required" });
        }

        const normalizedTopic = normalizeTopicName(topic);
        const jsonPath = path.join(__dirname, "..", "data", "questions", `${normalizedTopic}question.json`);

        if (!fs.existsSync(jsonPath)) {
            return res.status(404).json({ success: false, message: `No questions found for topic ${topic}` });
        }

        const rawData = fs.readFileSync(jsonPath, "utf-8");
        const questions = JSON.parse(rawData);

        // Fetch user solved problems for this topic if logged in
        let solvedMap = new Set();
        if (req.user?.id) {
            const solvedList = await SolvedProblem.find({ userId: req.user.id, topic: normalizedTopic });
            solvedMap = new Set(solvedList.map(p => p.problemId));
        }

        // Count totals and solved by pattern
        const counts = {};
        questions.forEach(q => {
            const patSlug = normalizePatternSlug(q.pattern);
            if (!counts[patSlug]) {
                counts[patSlug] = { total: 0, solvedCount: 0 };
            }
            counts[patSlug].total += 1;
            if (solvedMap.has(q._id)) {
                counts[patSlug].solvedCount += 1;
            }
        });

        // Map counts to the metadata registry or construct dynamically
        const responseData = Object.keys(counts).map(slug => {
            const meta = patternMetadata[slug] || { title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), desc: `Problems related to ${slug}.` };
            return {
                title: meta.title,
                slug: slug,
                desc: meta.desc,
                total: counts[slug].total,
                solvedCount: counts[slug].solvedCount
            };
        });

        return res.status(200).json({
            success: true,
            patterns: responseData
        });

    } catch (error) {
        console.error("Error in get patterns:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Route to get questions for a topic and pattern
router.get("/", optionalAuth, async (req, res) => {
    try {
        const { topic, pattern } = req.query;
        if (!topic || !pattern) {
            return res.status(400).json({ success: false, message: "topic and pattern query parameters are required" });
        }

        const normalizedTopic = normalizeTopicName(topic);
        const normalizedPattern = normalizePatternSlug(pattern);
        const jsonPath = path.join(__dirname, "..", "data", "questions", `${normalizedTopic}question.json`);

        if (!fs.existsSync(jsonPath)) {
            return res.status(200).json({ success: true, questions: [] });
        }

        const rawData = fs.readFileSync(jsonPath, "utf-8");
        const questions = JSON.parse(rawData);

        // Filter questions by pattern
        const filteredQuestions = questions.filter(q => normalizePatternSlug(q.pattern) === normalizedPattern);

        // Annotate questions with solved status
        let solvedSet = new Set();
        if (req.user?.id) {
            const solvedList = await SolvedProblem.find({
                userId: req.user.id,
                topic: normalizedTopic,
                pattern: normalizedPattern
            });
            solvedSet = new Set(solvedList.map(p => p.problemId));
        }

        const annotatedQuestions = filteredQuestions.map(q => ({
            ...q,
            solved: solvedSet.has(q._id)
        }));

        return res.status(200).json({
            success: true,
            questions: annotatedQuestions
        });

    } catch (error) {
        console.error("Error in get questions:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Route to toggle solved status of a problem
router.post("/toggle-solve", authMiddleware, async (req, res) => {
    try {
        const { problemId, topic, pattern } = req.body;
        const userId = req.user.id;

        if (!problemId || !topic || !pattern) {
            return res.status(400).json({ success: false, message: "problemId, topic, and pattern are required" });
        }

        const normalizedTopic = normalizeTopicName(topic);
        const normalizedPattern = normalizePatternSlug(pattern);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const existingSolved = await SolvedProblem.findOne({ userId, problemId });
        const solved = !existingSolved; // toggle status

        if (existingSolved) {
            // Unsolve: remove solved problem document
            await SolvedProblem.deleteOne({ _id: existingSolved._id });
        } else {
            // Solve: create solved problem document
            await SolvedProblem.create({
                userId,
                problemId,
                topic: normalizedTopic,
                pattern: normalizedPattern
            });
        }

        // --- Gamification & Streak updates ---
        const date = toDateKey();
        const existingActivity = await UserActivity.findOne({ userId, date });
        const wasNewActiveDay = !existingActivity;

        const deltaSolved = solved ? 1 : -1;
        const nextProblemsSolved = Math.max((existingActivity?.problemsSolved || 0) + deltaSolved, 0);
        const nextStudyMinutes = existingActivity?.studyMinutes || 0;
        const nextSessionsCount = existingActivity?.sessionsCount || 0;

        const consistencyScore = calculateDailyConsistencyScore({
            studyMinutes: nextStudyMinutes,
            problemsSolved: nextProblemsSolved,
            sessionsCount: nextSessionsCount
        });

        const xpDelta = solved ? 15 : -15;

        const nextStreak = wasNewActiveDay
            ? getNextStreak(user.stats?.lastActiveDate, user.stats?.currentStreak, date)
            : user.stats?.currentStreak || existingActivity?.streakCount || 0;

        const activity = await UserActivity.findOneAndUpdate(
            { userId, date },
            {
                $set: {
                    active: true,
                    problemsSolved: nextProblemsSolved,
                    streakCount: nextStreak,
                    consistencyScore,
                    completionRate: consistencyScore
                },
                $inc: {
                    xpEarned: xpDelta
                }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );

        if (wasNewActiveDay) {
            user.stats.totalActiveDays += 1;
            user.stats.currentStreak = nextStreak;
            user.stats.maxStreak = Math.max(user.stats.maxStreak || 0, nextStreak);
            user.stats.lastActiveDate = date;
        }

        user.stats.totalProblemsSolved = Math.max((user.stats.totalProblemsSolved || 0) + deltaSolved, 0);
        user.xp = Math.max((user.xp || 0) + xpDelta, 0);
        user.level = calculateLevel(user.xp);

        // Recalculate 30-day consistency window
        const { startDate, endDate } = getRangeBounds(30, date);
        const activeDaysInWindow = await UserActivity.countDocuments({
            userId,
            active: true,
            date: { $gte: startDate, $lte: endDate }
        });
        user.stats.consistencyPercentage = Math.round((activeDaysInWindow / 30) * 100);

        await user.save();

        return res.status(200).json({
            success: true,
            solved,
            stats: user.stats,
            xp: user.xp,
            level: user.level
        });

    } catch (error) {
        console.error("Error in toggle solve:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;

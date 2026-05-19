import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        // Store normalized date -> "2026-05-19"
        date: {
            type: String,
            required: true,
        },

        // Marks whether user was active that day
        active: {
            type: Boolean,
            default: true,
        },

        // Study analytics
        studyMinutes: {
            type: Number,
            default: 0,
            min: 0,
        },

        // DSA / learning progress
        problemsSolved: {
            type: Number,
            default: 0,
            min: 0,
        },

        sessionsCount: {
            type: Number,
            default: 1,
            min: 0,
        },


        topicsLearned: [
            {
                type: String,
                trim: true,
            },
        ],

        // Daily streak snapshot (optional but useful)
        streakCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        consistencyScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        xpEarned: {
            type: Number,
            default: 0,
            min: 0,
        },
        completionRate: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        // Device info (optional)
        deviceType: {
            type: String,
            enum: ["mobile", "tablet", "desktop"],
        },
    },
    {
        timestamps: true,
    }
);

/*
  Prevent duplicate activity entries
  for same user on same day
*/
UserActivitySchema.index(
    { userId: 1, date: 1 },
    { unique: true }
);

export default mongoose.model("UserActivity", UserActivitySchema);

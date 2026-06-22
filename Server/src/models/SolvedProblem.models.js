import mongoose from "mongoose";

const SolvedProblemSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        problemId: {
            type: String,
            required: true,
            index: true,
        },
        topic: {
            type: String,
            required: true,
        },
        pattern: {
            type: String,
            required: true,
        },
        solvedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure uniqueness per user per problem
SolvedProblemSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.model("SolvedProblem", SolvedProblemSchema);

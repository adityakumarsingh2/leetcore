import mongoose from 'mongoose';
import User from '../src/models/User.models.js';
import SolvedProblem from '../src/models/SolvedProblem.models.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkSolvedDetails() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const user = await User.findOne({ username: "MOHITGODARA1" });
        if (!user) {
            console.log("User not found");
            return;
        }

        const solved = await SolvedProblem.find({ userId: user._id }).lean();
        console.log("Total solved problems for MOHITGODARA1:", solved.length);

        const sample = solved.slice(0, 10);
        console.log("Sample solved problems:");
        sample.forEach((s, idx) => {
            console.log(`${idx + 1}. problemId: ${s.problemId}, topic: ${s.topic}, pattern: ${s.pattern}`);
        });

        // Let's count by topic
        const topicCounts = {};
        solved.forEach(s => {
            topicCounts[s.topic] = (topicCounts[s.topic] || 0) + 1;
        });
        console.log("Solved count by topic in DB:", topicCounts);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkSolvedDetails();

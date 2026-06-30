import mongoose from 'mongoose';
import BugReport from '../src/models/BugReport.models.js';
import Feedback from '../src/models/Feedback.models.js';
import dotenv from 'dotenv';

dotenv.config();

async function viewReports() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const bugs = await BugReport.find({}).sort({ createdAt: -1 }).limit(10).lean();
        console.log("=== RECENT BUG REPORTS ===");
        bugs.forEach((b, idx) => {
            console.log(`${idx + 1}. User ID: ${b.userId}, Title: ${b.title}, Description: ${b.description}`);
        });

        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).limit(10).lean();
        console.log("\n=== RECENT FEEDBACK ===");
        feedbacks.forEach((f, idx) => {
            console.log(`${idx + 1}. User ID: ${f.userId}, Category: ${f.category}, Msg: ${f.message}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

viewReports();

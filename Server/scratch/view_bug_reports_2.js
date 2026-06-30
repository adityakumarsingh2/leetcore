import mongoose from 'mongoose';
import BugReport from '../src/models/BugReport.models.js';
import Feedback from '../src/models/Feedback.models.js';
import dotenv from 'dotenv';

dotenv.config();

async function viewReports() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const bugs = await BugReport.find({}).sort({ createdAt: -1 }).lean();
        console.log("=== ALL BUG REPORTS ===");
        bugs.forEach((b, idx) => {
            console.log(`${idx + 1}. User ID: ${b.userId}\n   Area: ${b.bugArea}\n   Title: ${b.bugTitle}\n   Desc: ${b.bugDescription}`);
        });

        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).lean();
        console.log("\n=== ALL FEEDBACK ===");
        feedbacks.forEach((f, idx) => {
            console.log(`${idx + 1}. User: ${f.name} (${f.email})\n   Feedback: ${f.feedbackText}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

viewReports();

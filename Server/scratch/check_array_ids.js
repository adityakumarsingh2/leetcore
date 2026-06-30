import mongoose from 'mongoose';
import User from '../src/models/User.models.js';
import SolvedProblem from '../src/models/SolvedProblem.models.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkIds() {
    try {
        await mongoose.connect(process.env.DB_URL);
        const user = await User.findOne({ username: "MOHITGODARA1" });
        const solved = await SolvedProblem.find({ userId: user._id, topic: "array" }).lean();
        console.log("Total solved array problems:", solved.length);
        const ids = solved.map(s => s.problemId);
        console.log("First 30 problemIds:", ids.slice(0, 30));
        console.log("Last 30 problemIds:", ids.slice(-30));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkIds();

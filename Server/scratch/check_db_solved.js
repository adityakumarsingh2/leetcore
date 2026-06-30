import mongoose from 'mongoose';
import SolvedProblem from '../src/models/SolvedProblem.models.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkSolved() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const allSolved = await SolvedProblem.find({}).lean();
        console.log("Total solved problems in DB:", allSolved.length);
        
        const topics = new Set();
        const patterns = new Set();
        
        allSolved.forEach(s => {
            topics.add(s.topic);
            patterns.add(s.pattern);
        });

        console.log("Unique topics in DB:", Array.from(topics));
        console.log("Unique patterns in DB:", Array.from(patterns));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkSolved();

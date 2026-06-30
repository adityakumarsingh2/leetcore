import mongoose from 'mongoose';
import User from '../src/models/User.models.js';
import SolvedProblem from '../src/models/SolvedProblem.models.js';
import { calculateLevel } from '../src/utils/gamification.utils.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalizeTopicName(topic) {
    if (!topic) return "";
    return topic.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getQuestionsFilePath(topic) {
    const normalizedTopic = normalizeTopicName(topic);
    const baseQuestionsDir = path.resolve(__dirname, "..", "src", "data", "questions");
    const jsonPath = path.resolve(baseQuestionsDir, `${normalizedTopic}question.json`);
    return jsonPath;
}

const loadedQuestionsCache = {};
function getQuestionDetails(topic, problemId) {
    const normTopic = normalizeTopicName(topic);
    if (!normTopic) return null;
    
    if (!loadedQuestionsCache[normTopic]) {
        const jsonPath = getQuestionsFilePath(normTopic);
        if (fs.existsSync(jsonPath)) {
            loadedQuestionsCache[normTopic] = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        } else {
            loadedQuestionsCache[normTopic] = [];
        }
    }
    return loadedQuestionsCache[normTopic].find(q => q._id === problemId);
}

async function cleanDangling() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const allSolved = await SolvedProblem.find({}).lean();
        console.log("Total solved problems in DB before:", allSolved.length);

        const danglingIds = [];

        for (const s of allSolved) {
            const qDetails = getQuestionDetails(s.topic, s.problemId);
            if (!qDetails) {
                danglingIds.push(s._id);
            }
        }

        console.log(`Found ${danglingIds.length} dangling solved problems.`);
        if (danglingIds.length > 0) {
            const deleteResult = await SolvedProblem.deleteMany({ _id: { $in: danglingIds } });
            console.log(`Deleted ${deleteResult.deletedCount} dangling solved problem documents.`);
        }

        // Now, update and sync user stats for all users
        const users = await User.find({});
        for (const user of users) {
            const actualSolvedCount = await SolvedProblem.countDocuments({ userId: user._id });
            const calculatedLevel = calculateLevel(user.xp || 0, actualSolvedCount);
            
            user.stats.totalProblemsSolved = actualSolvedCount;
            user.level = calculatedLevel;
            await user.save();
            console.log(`Synced user ${user.username}: totalProblemsSolved = ${actualSolvedCount}, level = ${calculatedLevel}`);
        }

        console.log("Cleanup and sync completed successfully!");
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

cleanDangling();

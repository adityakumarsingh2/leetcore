import mongoose from 'mongoose';
import User from '../src/models/User.models.js';
import SolvedProblem from '../src/models/SolvedProblem.models.js';
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

async function checkDangling() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const allSolved = await SolvedProblem.find({}).lean();
        console.log("Total solved problems in DB:", allSolved.length);

        let danglingCount = 0;
        const danglingDocs = [];

        for (const s of allSolved) {
            const qDetails = getQuestionDetails(s.topic, s.problemId);
            if (!qDetails) {
                danglingCount++;
                danglingDocs.push(s);
            }
        }

        console.log("Total dangling solved problems:", danglingCount);
        if (danglingDocs.length > 0) {
            console.log("Sample dangling solved problems:");
            danglingDocs.slice(0, 10).forEach((d, idx) => {
                console.log(`${idx + 1}. User ID: ${d.userId}, problemId: ${d.problemId}, topic: ${d.topic}`);
            });
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkDangling();

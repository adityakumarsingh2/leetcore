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

const PRACTICE_LIMIT = 25;

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

function readTopicQuestions(topic) {
    const jsonPath = getQuestionsFilePath(topic);
    if (!jsonPath || !fs.existsSync(jsonPath)) {
        return [];
    }
    try {
        const fileContent = fs.readFileSync(jsonPath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading questions for topic ${topic}:`, error);
        return [];
    }
}

async function testProgress() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");

        const user = await User.findOne({ username: "MOHITGODARA1" });
        if (!user) {
            console.log("User MOHITGODARA1 not found!");
            return;
        }

        const userId = user._id;
        console.log("User stats solved count:", user.stats?.totalProblemsSolved);

        const topics = [
            { name: "Arrays & Vectors", topic: "Array" },
            { name: "Strings", topic: "String" },
            { name: "Hashing", topic: "Hashing" },
            { name: "Binary Search", topic: "Binary Search" },
            { name: "Linked List", topic: "Linked List" },
            { name: "Stack", topic: "Stack" },
            { name: "Queue", topic: "Queue" },
            { name: "Recursion", topic: "Recursion" },
            { name: "Backtracking", topic: "Backtracking" },
            { name: "Trees", topic: "Trees" },
            { name: "Binary Search Tree", topic: "Binary Search Tree" },
            { name: "Heap / PQ", topic: "Heap / Priority Queue" },
            { name: "Graphs", topic: "Graphs" },
            { name: "Trie", topic: "Trie" },
            { name: "Greedy", topic: "Greedy" },
            { name: "Dynamic Programming", topic: "Dynamic Programming" },
            { name: "Bit Manipulation", topic: "Bit Manipulation" }
        ];

        let totalQuestionsAll = 0;
        let totalSolvedAll = 0;

        for (const t of topics) {
            const normTopic = normalizeTopicName(t.topic);
            const questions = readTopicQuestions(t.topic);
            const currentQuestionIds = questions.map((question) => question._id).filter(Boolean);
            const total = currentQuestionIds.length;
            totalQuestionsAll += total;

            let solved = 0;
            if (userId && currentQuestionIds.length > 0) {
                solved = await SolvedProblem.countDocuments({
                    userId,
                    topic: normTopic,
                    problemId: { $in: currentQuestionIds }
                });
            }
            totalSolvedAll += solved;
            console.log(`Topic: ${t.name}, Solved: ${solved} / ${total}`);
        }

        console.log("=== SUMMARY ===");
        console.log("Total questions across all topics:", totalQuestionsAll);
        console.log("Total solved questions across all topics:", totalSolvedAll);
        
        const overallSolvedInDB = await SolvedProblem.countDocuments({ userId });
        console.log("Overall Solved in DB for user:", overallSolvedInDB);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

testProgress();

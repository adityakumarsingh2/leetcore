import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.resolve(__dirname, '..', 'src', 'data', 'questions');
const files = fs.readdirSync(questionsDir);

files.forEach(file => {
    if (!file.endsWith('.json')) return;
    const filepath = path.join(questionsDir, file);
    try {
        const content = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        content.forEach((q, idx) => {
            if (!q._id || !q.topic || !q.pattern) {
                console.log(`File: ${file}, Index: ${idx}, ID: ${q._id}, Title: ${q.title}, Topic: ${q.topic}, Pattern: ${q.pattern}`);
            }
        });
    } catch (err) {
        console.error(`Error parsing ${file}:`, err);
    }
});
console.log("Check complete.");

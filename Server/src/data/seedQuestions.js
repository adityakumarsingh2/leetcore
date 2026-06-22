import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const topics = [
    { name: "Array", prefix: "arr" },
    { name: "String", prefix: "str" },
    { name: "Hashing", prefix: "hash" },
    { name: "Binary Search", prefix: "bs" },
    { name: "Linked List", prefix: "ll" },
    { name: "Stack", prefix: "stk" },
    { name: "Queue", prefix: "que" },
    { name: "Recursion", prefix: "rec" },
    { name: "Backtracking", prefix: "bt" },
    { name: "Trees", prefix: "tree" },
    { name: "Binary Search Tree", prefix: "bst" },
    { name: "Heap / Priority Queue", prefix: "heap" },
    { name: "Graphs", prefix: "graph" },
    { name: "Trie", prefix: "trie" },
    { name: "Greedy", prefix: "grdy" },
    { name: "Dynamic Programming", prefix: "dp" },
    { name: "Bit Manipulation", prefix: "bit" }
];

const patterns = [
    { title: "Two Pointers", slug: "two-pointers", prefix: "tp" },
    { title: "Sliding Window", slug: "sliding-window", prefix: "sw" },
    { title: "Prefix Sum", slug: "prefix-sum", prefix: "ps" },
    { title: "Binary Search", slug: "binary-search", prefix: "bs" },
    { title: "Matrix", slug: "matrix", prefix: "mt" },
    { title: "Sorting", slug: "sorting", prefix: "srt" },
    { title: "Kadane’s Algorithm", slug: "kadanes-algorithm", prefix: "kd" },
    { title: "Hashing", slug: "hashing", prefix: "hs" },
    { title: "Monotonic Stack", slug: "monotonic-stack", prefix: "ms" }
];

const companiesList = [
    "Google", "Amazon", "Meta", "Microsoft", "Netflix", "Apple", "Uber",
    "Airbnb", "ByteDance", "Tencent", "Bloomberg", "Salesforce", "Adobe",
    "Oracle", "Atlassian", "Twilio", "Stripes", "LinkedIn", "Twitter"
];

// Helper to normalize topic name to match files
function normalizeTopicName(topic) {
    if (!topic) return "";
    return topic.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Famous problem mappings to make the top questions of each category real
const famousProblems = {
    "array_two-pointers": [
        { title: "Container With Most Water", problemNumber: 11, difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/" },
        { title: "Two Sum II - Input Array Is Sorted", problemNumber: 167, difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { title: "3Sum", problemNumber: 15, difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
        { title: "Trapping Rain Water", problemNumber: 42, difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/" },
        { title: "Valid Palindrome", problemNumber: 125, difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/" },
        { title: "Remove Duplicates from Sorted Array", problemNumber: 26, difficulty: "Easy", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
        { title: "Move Zeroes", problemNumber: 283, difficulty: "Easy", url: "https://leetcode.com/problems/move-zeroes/" },
        { title: "Sort Colors", problemNumber: 75, difficulty: "Medium", url: "https://leetcode.com/problems/sort-colors/" },
        { title: "Squares of a Sorted Array", problemNumber: 977, difficulty: "Easy", url: "https://leetcode.com/problems/squares-of-a-sorted-array/" },
        { title: "3Sum Closest", problemNumber: 16, difficulty: "Medium", url: "https://leetcode.com/problems/3sum-closest/" }
    ],
    "array_sliding-window": [
        { title: "Longest Substring Without Repeating Characters", problemNumber: 3, difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { title: "Minimum Size Subarray Sum", problemNumber: 209, difficulty: "Medium", url: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
        { title: "Sliding Window Maximum", problemNumber: 239, difficulty: "Hard", url: "https://leetcode.com/problems/sliding-window-maximum/" },
        { title: "Longest Repeating Character Replacement", problemNumber: 424, difficulty: "Medium", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
        { title: "Permutation in String", problemNumber: 567, difficulty: "Medium", url: "https://leetcode.com/problems/permutation-in-string/" },
        { title: "Minimum Window Substring", problemNumber: 76, difficulty: "Hard", url: "https://leetcode.com/problems/minimum-window-substring/" },
        { title: "Find All Anagrams in a String", problemNumber: 438, difficulty: "Medium", url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" }
    ],
    "array_prefix-sum": [
        { title: "Subarray Sum Equals K", problemNumber: 560, difficulty: "Medium", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
        { title: "Range Sum Query - Immutable", problemNumber: 303, difficulty: "Easy", url: "https://leetcode.com/problems/range-sum-query-immutable/" },
        { title: "Product of Array Except Self", problemNumber: 238, difficulty: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/" },
        { title: "Find Pivot Index", problemNumber: 724, difficulty: "Easy", url: "https://leetcode.com/problems/find-pivot-index/" },
        { title: "Contiguous Array", problemNumber: 525, difficulty: "Medium", url: "https://leetcode.com/problems/contiguous-array/" }
    ],
    "array_kadanes-algorithm": [
        { title: "Maximum Subarray", problemNumber: 53, difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/" },
        { title: "Maximum Product Subarray", problemNumber: 152, difficulty: "Medium", url: "https://leetcode.com/problems/maximum-product-subarray/" },
        { title: "Maximum Sum Circular Subarray", problemNumber: 918, difficulty: "Medium", url: "https://leetcode.com/problems/maximum-sum-circular-subarray/" }
    ]
};

// Simple pseudo-random helper to ensure stable seeding
function createSeededRandom(seedStr) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    return function() {
        const x = Math.sin(hash++) * 10000;
        return x - Math.floor(x);
    };
}

const dirPath = path.join(__dirname, "questions");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

topics.forEach((topic) => {
    const topicNorm = normalizeTopicName(topic.name);
    const questions = [];

    patterns.forEach((pattern) => {
        const key = `${topicNorm}_${pattern.slug}`;
        const random = createSeededRandom(key);
        const famous = famousProblems[key] || [];

        for (let i = 0; i < 20; i++) {
            let title = "";
            let problemNumber = 0;
            let difficulty = "Medium";
            let url = "";

            if (i < famous.length) {
                title = famous[i].title;
                problemNumber = famous[i].problemNumber;
                difficulty = famous[i].difficulty;
                url = famous[i].url;
            } else {
                // Procedural generation of realistic sounding problems
                const ordinal = i + 1;
                problemNumber = 1000 + Math.floor(random() * 2000);
                const diffs = ["Easy", "Medium", "Hard"];
                difficulty = diffs[Math.floor(random() * 3)];
                if (random() > 0.7) difficulty = "Easy"; // skew towards Easy/Medium
                else if (random() > 0.8) difficulty = "Hard";

                const concepts = [
                    "Optimal", "Maximal", "Count of", "Validate", "Merge",
                    "Minimum Cost", "Continuous", "Cyclic", "Search", "Balanced",
                    "K-th Distance", "Longest", "Shortest", "Subarray", "Subsequence"
                ];
                const nouns = [
                    "Elements", "Sum Target", "Intervals", "Subsequences", "Paths",
                    "Permutations", "Substrings", "Product", "Frequencies", "Differences",
                    "Ranges", "Boundaries", "Duplicates", "Transitions", "Subarrays"
                ];

                const concept = concepts[Math.floor(random() * concepts.length)];
                const noun = nouns[Math.floor(random() * nouns.length)];

                title = `${concept} ${pattern.title} for ${topic.name} ${ordinal}`;
                const kebabTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                url = `https://leetcode.com/problems/${kebabTitle}/`;
            }

            // Generate companies
            const companies = [];
            const numCompanies = 1 + Math.floor(random() * 3);
            while (companies.length < numCompanies) {
                const comp = companiesList[Math.floor(random() * companiesList.length)];
                if (!companies.includes(comp)) {
                    companies.push(comp);
                }
            }

            // Estimate time
            const times = ["15 min", "20 min", "25 min", "30 min", "35 min", "40 min"];
            const estimatedTime = difficulty === "Easy" ? times[Math.floor(random() * 2)]
                                 : difficulty === "Medium" ? times[2 + Math.floor(random() * 2)]
                                 : times[4 + Math.floor(random() * 2)];

            const padIndex = String(i + 1).padStart(3, "0");
            const _id = `${topic.prefix}_${pattern.prefix}_${padIndex}`;

            questions.push({
                _id,
                title,
                topic: topicNorm,
                pattern: pattern.slug,
                difficulty,
                platform: "LeetCode",
                problemNumber,
                leetcodeUrl: url,
                companies,
                tags: [topic.name, pattern.title],
                estimatedTime
            });
        }
    });

    const filePath = path.join(dirPath, `${topicNorm}question.json`);
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf-8");
    console.log(`Generated ${questions.length} questions for ${topic.name} in ${filePath}`);
});

console.log("Seeding completed successfully!");

export const arrayDocs = {
  topic: "Arrays",

  introduction: {
    definition:
      `Array ek linear data structure hai jo multiple elements ko ek sequence me store karta hai.
        Ye memory me ek ke baad ek (contiguous) boxes me data rakhta hai, jisse data ko fast access kar sakte hain.`,

    whyImportant: [
      "Fast index access",
      "Foundation of DSA",
      "Used in almost every algorithm",
    ],

    features: [
      "Index based",
      "Ordered",
      "Duplicates allowed",
      " Store in a Contiguous memory",
    ],

    example: `const arr = [1, 2, 3, 4, 5]`,
  },

  timeComplexity: {
    access: "O(1)",
    search: "O(n)",
    insert: "O(n)",
    delete: "O(n)",
  },

  implementation: {
    javascript: `
        const arr = [1, 2, 3]

        arr.push(4) // [1, 2, 3, 4]
        arr.pop() // [1, 2, 3]

        console.log(arr);
    `,

    cpp: `
        #include<iostream>
        using namespace std;

        int main() {
            int arr[5] = {1,2,3,4,5};

            for(int i = 0; i < 5; i++) {
                cout << arr[i] << " ";
            }
        }
    `,
  },

  patterns: [
    {
      name: "Two Pointer",

      introduction:
        `Two Pointer ek technique hai jisme hum 2 pointers ka use karke 2 elements ko ek sath check karte hain.
        Jab bhi lage ki 2 loops lag rahe hain aur 2 elements compare/check karne hain, tab nested loops ki jagah Two Pointer approach sochna.`,

      recognition: [
        "Sorted array",
        "Pair problems",
        "Reverse traversal",
      ],

      whenToUse: [
        "Searching pairs",
        "Removing duplicates",
        "Reversing arrays",
      ],

      interviewQuestions: [
        {
          title: "Two Sum II",
          difficulty: "Easy",
          leetcode:
            "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        },

        {
          title: "3Sum",
          difficulty: "Medium",
          leetcode: "https://leetcode.com/problems/3sum/",
        },
      ],
    },

    {
      name: "Sliding Window",

      introduction:
        "Sliding window helps optimize contiguous subarray problems.",

      recognition: [
        "Contiguous subarray",
        "Longest substring",
        "Fixed size window",
      ],

      whenToUse: [
        "Subarray problems",
        "Longest/shortest range",
        "Window optimization",
      ],

      interviewQuestions: [
        {
          title: "Maximum Average Subarray",
          difficulty: "Easy",
          leetcode:
            "https://leetcode.com/problems/maximum-average-subarray-i/",
        },

        {
          title: "Sliding Window Maximum",
          difficulty: "Hard",
          leetcode:
            "https://leetcode.com/problems/sliding-window-maximum/",
        },
      ],
    },

    {
      name: "Prefix Sum",

      introduction:
        "Prefix sum is used for fast range sum calculations.",

      recognition: [
        "Range sum",
        "Continuous sum",
        "Subarray queries",
      ],

      whenToUse: [
        "Range queries",
        "Subarray sums",
        "Repeated sum calculations",
      ],

      formula: `
prefix[i] = prefix[i - 1] + arr[i]
      `,

      interviewQuestions: [
        {
          title: "Range Sum Query",
          difficulty: "Easy",
          leetcode:
            "https://leetcode.com/problems/range-sum-query-immutable/",
        },

        {
          title: "Subarray Sum Equals K",
          difficulty: "Medium",
          leetcode:
            "https://leetcode.com/problems/subarray-sum-equals-k/",
        },
      ],
    },
  ],

  interviewQuestions: {
    easy: [
      {
        title: "Two Sum",
        leetcode: "https://leetcode.com/problems/two-sum/",
      },

      {
        title: "Move Zeroes",
        leetcode: "https://leetcode.com/problems/move-zeroes/",
      },
    ],

    medium: [
      {
        title: "Container With Most Water",
        leetcode:
          "https://leetcode.com/problems/container-with-most-water/",
      },

      {
        title: "3Sum",
        leetcode: "https://leetcode.com/problems/3sum/",
      },
    ],

    hard: [
      {
        title: "Trapping Rain Water",
        leetcode:
          "https://leetcode.com/problems/trapping-rain-water/",
      },
    ],
  },

  commonMistakes: [
    {
      mistake: "Out of bounds access",

      wrong: `
arr[arr.length]
      `,

      correct: `
arr[arr.length - 1]
      `,
    },

    {
      mistake: "Using nested loops unnecessarily",

      solution:
        "Try using hashmap, sliding window, or two pointer.",
    },
  ],

  learningFlow: [
    "Array Basics",
    "Prefix Sum",
    "Two Pointer",
    "Sliding Window",
    "Binary Search",
    "Matrix Problems",
  ],

  revisionNotes: [
    "Learn pattern recognition",
    "Focus on optimization",
    "Practice medium questions regularly",
    "Understand brute force before optimization",
  ],
}
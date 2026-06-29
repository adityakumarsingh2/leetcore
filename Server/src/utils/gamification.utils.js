import { getDateRangeKeys, getYesterdayKey, toDateKey } from "./date.utils.js";

export const calculateLevel = (xp = 0, problemsSolved = 0) => {
    let level = 1;
    while (5 * level * (level + 1) <= problemsSolved) {
        level++;
    }
    return level;
};

export const calculateActivityXp = ({ studyMinutes = 0, problemsSolved = 0, topicsLearned = [] }) => {
    return Math.round((studyMinutes * 2) + (problemsSolved * 25) + (topicsLearned.length * 10));
};

export const calculateDailyConsistencyScore = ({ studyMinutes = 0, problemsSolved = 0, sessionsCount = 0 }) => {
    const studyScore = Math.min(studyMinutes / 60, 1) * 50;
    const solvedScore = Math.min(problemsSolved / 3, 1) * 35;
    const sessionScore = Math.min(sessionsCount / 2, 1) * 15;

    return Math.round(studyScore + solvedScore + sessionScore);
};

export const getNextStreak = (lastActiveDate, currentStreak, todayKey = toDateKey()) => {
    if (!lastActiveDate) {
        return 1;
    }

    if (lastActiveDate === todayKey) {
        return currentStreak || 1;
    }

    return lastActiveDate === getYesterdayKey(todayKey) ? (currentStreak || 0) + 1 : 1;
};

export const formatConsistencyWindow = ({ activities = [], days = 30, endDateKey = toDateKey() }) => {
    const keys = getDateRangeKeys(days, endDateKey);
    const activityMap = new Map(
        activities
            .filter((activity) => activity && activity.date)
            .map((activity) => [toDateKey(activity.date), activity])
    );
    const daysData = keys.map((date) => {
        const activity = activityMap.get(date);
        const consistencyScore = activity?.consistencyScore || 0;

        return {
            date,
            active: Boolean(activity?.active),
            studyMinutes: activity?.studyMinutes || 0,
            problemsSolved: activity?.problemsSolved || 0,
            sessionsCount: activity?.sessionsCount || 0,
            consistencyScore,
            intensity: consistencyScore >= 80 ? 4 : consistencyScore >= 55 ? 3 : consistencyScore >= 30 ? 2 : activity?.active ? 1 : 0,
        };
    });

    const activeDays = daysData.filter((day) => day.active).length;

    return {
        consistencyPercentage: Math.round((activeDays / keys.length) * 100),
        activeDays,
        totalDays: keys.length,
        days: daysData,
    };
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

export const toDateKey = (value = new Date()) => {
    return DATE_FORMATTER.format(new Date(value));
};

export const addDays = (dateKey, days) => {
    const date = new Date(`${dateKey}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
};

export const getYesterdayKey = (dateKey = toDateKey()) => addDays(dateKey, -1);

export const getDateRangeKeys = (days, endDateKey = toDateKey()) => {
    const safeDays = Math.max(Number(days) || 1, 1);
    const keys = [];
    const startKey = addDays(endDateKey, -(safeDays - 1));

    for (let index = 0; index < safeDays; index += 1) {
        keys.push(addDays(startKey, index));
    }

    return keys;
};

export const getRangeBounds = (days, endDateKey = toDateKey()) => {
    const keys = getDateRangeKeys(days, endDateKey);

    return {
        startDate: keys[0],
        endDate: keys[keys.length - 1],
        keys,
    };
};

export const getDayLabel = (dateKey) => {
    return new Date(`${dateKey}T00:00:00.000Z`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
};

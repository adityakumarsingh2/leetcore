import apiClient from "./apiClient";

export const activityService = {
    markDailyActivity: (payload = {}) => apiClient.post("/activity/mark", payload),
    getUserActivity: (userId, params = {}) => apiClient.get(`/activity/user/${userId}`, { params }),
    getStreakData: (userId) => apiClient.get(`/activity/streak/${userId}`),
    getDashboardStats: (userId) => apiClient.get(`/activity/dashboard/${userId}`),
};

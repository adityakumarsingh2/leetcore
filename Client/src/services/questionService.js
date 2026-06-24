import apiClient from "./apiClient";

export const questionService = {
    getRecentSolved: (params) => apiClient.get("/questions/recent-solved", { params }),
    getRecommendation: () => apiClient.get("/questions/recommendation"),
};

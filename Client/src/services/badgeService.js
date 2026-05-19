import apiClient from "./apiClient";

export const badgeService = {
    getAllBadges: (params = {}) => apiClient.get("/badges", { params }),
    getSingleBadge: (badgeId) => apiClient.get(`/badges/${badgeId}`),
    createBadge: (payload) => apiClient.post("/badges", payload),
    awardBadgeToUser: ({ userId, badgeId }) => apiClient.post("/badges/award", { userId, badgeId }),
    getUserBadges: (userId) => apiClient.get(`/badges/user/${userId}`),
    removeBadgeFromUser: ({ userId, badgeId }) => apiClient.delete(`/badges/user/${userId}/${badgeId}`),
};

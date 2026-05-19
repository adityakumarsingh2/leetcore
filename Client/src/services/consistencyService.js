import apiClient from "./apiClient";

export const consistencyService = {
    getConsistencyData: (userId, params = {}) => apiClient.get(`/activity/consistency/${userId}`, { params }),
};

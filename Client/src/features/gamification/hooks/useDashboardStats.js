import { useEffect, useState } from "react";
import { activityService } from "../../../services/activityService";

export const useDashboardStats = (userId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(userId));
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        let mounted = true;

        const fetchStats = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await activityService.getDashboardStats(userId);

                if (mounted) {
                    setData(response.data);
                }
            } catch (err) {
                if (mounted) {
                    setError(err);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchStats();

        return () => {
            mounted = false;
        };
    }, [userId]);

    return { data, loading, error };
};

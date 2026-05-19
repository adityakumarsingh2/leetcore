import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { consistencyService } from "../../../services/consistencyService";

function ConsistencyBar({ userId: userIdProp }) {
    const { user } = useAuth();
    const userId = userIdProp || user?._id;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(userId));

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        let mounted = true;

        const fetchConsistency = async () => {
            setLoading(true);

            try {
                const response = await consistencyService.getConsistencyData(userId, { days: 365 });

                if (mounted) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Failed to load consistency:", error);

                if (mounted) {
                    setData(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchConsistency();

        return () => {
            mounted = false;
        };
    }, [userId]);

    const months = [
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec",
        "Jan", "Feb", "Mar", "Apr", "May",
    ];

    const activityDays = useMemo(() => {
        const heatmap = data?.heatmap || [];
        const totalCells = months.length * 28;

        return Array.from({ length: totalCells }, (_, index) => {
            const day = heatmap[index];

            return {
                key: day?.date || `empty-${index}`,
                solved: (day?.problemsSolved || 0) > 0,
            };
        });
    }, [data?.heatmap, months.length]);

    const getActivity = (monthIndex, dayIndex) => {
        const day = activityDays[(monthIndex * 28) + dayIndex];

        if (loading) {
            return "bg-white/10 animate-pulse";
        }

        return day?.solved ? "bg-green-500" : "bg-white/10";
    };

    const totalSolved = data?.heatmap?.reduce((total, day) => total + (day.problemsSolved || 0), 0) || 0;
    const totalActiveDays = user?.stats?.totalActiveDays || data?.activeDays || 0;
    const maxStreak = user?.stats?.maxStreak || 0;

    return (

        <div
            className="
                w-full
                rounded-xl
                bg-[#1F1F22]
                border
                border-white/5
                p-6
                overflow-hidden
                relative
                min-h-[220px]
            "
        >

            {/* Header */}
            <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    gap-4
                    items-center
                    justify-between
                    mb-5
                    relative
                    z-10
                "
            >

                {/* Left */}
                <div>

                    <h1
                        className="
                            text-md
                            font-semibold
                            text-white
                        "
                    >
                        {loading ? "--" : totalSolved}
                        <span
                            className="
                                text-gray-400
                                font-light
                                text-sm
                                ml-2
                            "
                        >
                            problems solved in the past one year
                        </span>
                    </h1>

                </div>

                {/* Right Stats */}
                <div
                    className="
                        flex
                        items-center
                        gap-10
                        flex-wrap
                        text-gray-400
                        text-sm
                        font-light
                    "
                >

                    <p>
                        Total active days:
                        <span className="text-white font-semibold ml-2">
                            {loading ? "--" : totalActiveDays}
                        </span>
                    </p>

                    <p>
                        Max streak:
                        <span className="text-white font-semibold ml-2">
                            {loading ? "--" : maxStreak}
                        </span>
                    </p>

                </div>

            </div>

            {/* Heatmap */}
            <div
                className="
                    flex
                    gap-6
                    overflow-x-auto
                    relative
                    z-10
                "
            >

                {months.map((month, monthIndex) => (

                    <div
                        key={month}
                        className="
                            flex
                            flex-col
                            items-center
                            gap-3
                            flex-shrink-0
                        "
                    >

                        {/* Grid */}
                        <div
                            className="
                                grid
                                grid-cols-4
                                gap-[5px]
                            "
                        >

                            {[...Array(28)].map((_, index) => (

                                <div
                                    key={activityDays[(monthIndex * 28) + index]?.key || `${month}-${index}`}
                                    className={`
                                        w-3
                                        h-3
                                        rounded-[2px]
                                        ${getActivity(monthIndex, index)}
                                    `}
                                />

                            ))}

                        </div>

                        {/* Month */}
                        <p
                            className="
                                text-gray-400
                                text-sm
                                font-medium
                            "
                        >
                            {month}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ConsistencyBar;

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { consistencyService } from "../../../services/consistencyService";

function ConsistencyBar({ userId: userIdProp }) {
    const { user } = useAuth();
    const userId = userIdProp || user?._id;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(userId));
    const [selectedYear, setSelectedYear] = useState("current"); // "current" or "previous"

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        let mounted = true;

        const fetchConsistency = async () => {
            setLoading(true);

            try {
                const params = { days: 365 };
                if (selectedYear === "previous") {
                    const prevYear = new Date().getFullYear() - 1;
                    params.year = prevYear;
                }
                const response = await consistencyService.getConsistencyData(userId, params);

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
    }, [userId, selectedYear]);

    const months = useMemo(() => {
        const result = [];
        const date = new Date();
        if (selectedYear === "previous") {
            date.setFullYear(new Date().getFullYear() - 1);
            date.setMonth(11); // December of previous year
        }
        for (let i = 12; i >= 0; i--) {
            const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
            const label = d.toLocaleDateString("en-US", { month: "short" });
            result.push(label);
        }
        return result;
    }, [selectedYear]);

    const activityDays = useMemo(() => {
        const heatmap = data?.heatmap || [];
        const totalCells = months.length * 28;

        return Array.from({ length: totalCells }, (_, index) => {
            const heatmapIndex = heatmap.length - totalCells + index;
            const day = heatmapIndex >= 0 ? heatmap[heatmapIndex] : null;

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
                            problems solved in the selected period
                        </span>
                    </h1>
                </div>

                {/* Right Year Toggle & Stats */}
                <div
                    className="
                        flex
                        items-center
                        gap-6
                        flex-wrap
                        text-gray-400
                        text-sm
                        font-light
                    "
                >
                    {/* Year selection toggle tabs */}
                    <div className="flex gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
                        <button
                            onClick={() => setSelectedYear("current")}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                selectedYear === "current" ? "bg-orange-500 text-white" : "text-white/60 hover:text-white"
                            }`}
                        >
                            Current Year
                        </button>
                        <button
                            onClick={() => setSelectedYear("previous")}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                selectedYear === "previous" ? "bg-orange-500 text-white" : "text-white/60 hover:text-white"
                            }`}
                        >
                            Previous Year ({new Date().getFullYear() - 1})
                        </button>
                    </div>

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

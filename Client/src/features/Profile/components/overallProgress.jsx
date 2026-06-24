import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import apiClient from "../../../services/apiClient";
import { useAuth } from "../../../context/AuthContext";

function OverallProgress() {
    const { user } = useAuth();
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchProgress = async () => {
            try {
                const response = await apiClient.get("/questions/progress");
                if (isMounted && response.data?.success) {
                    setProgressData(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch overall progress:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProgress();
        return () => {
            isMounted = false;
        };
    }, [user]);

    const totalSolved = progressData?.totalSolved || 0;
    const totalQuestions = progressData?.totalQuestions || 3060;
    const percentage = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

    // SVG circle math
    // Radius = 95, Circumference = 2 * PI * r = 2 * 3.14159 * 95 = 596.9 (approx 597)
    const strokeDasharray = 597;
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

    if (loading) {
        return (
            <div className="w-full min-h-[320px] flex items-center justify-center text-white">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    const topics = progressData?.topics || [];

    return (
        <div
            className="
                w-full
                min-h-[320px]
                flex
                flex-col
                lg:flex-row
                items-center
                justify-between
                gap-8
                px-5
                sm:px-8
                py-6
                relative
                overflow-hidden
                text-white
            "
        >
            {/* Left Side Progress Ring */}
            <div
                className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                "
            >
                <div className="relative h-[160px] w-[160px] sm:h-[180px] sm:w-[180px] 2xl:h-[200px] 2xl:w-[200px]">
                    <svg viewBox="0 0 300 300" className="transform -rotate-90">
                        {/* Background Ring */}
                        <circle
                            cx="150"
                            cy="150"
                            r="95"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="14"
                        />
                        {/* Gradient Progress */}
                        <circle
                            cx="150"
                            cy="150"
                            r="95"
                            fill="none"
                            stroke="#F46717"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-700 ease-out"
                        />
                    </svg>

                    {/* Center Content */}
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >
                        <h1
                            className="
                                text-2xl
                                font-black
                                text-white
                                tracking-tight
                            "
                        >
                            {totalSolved}
                            <span
                                className="
                                    text-sm
                                    text-gray-400
                                    font-medium
                                    ml-0.5
                                "
                            >
                                /{totalQuestions}
                            </span>
                        </h1>
                        <p
                            className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-widest
                                text-orange-400
                                mt-1
                            "
                        >
                            Solved ({percentage}%)
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side Topic List Grid */}
            <div
                className="
                    relative
                    z-10
                    grid
                    grid-cols-2
                    2xl:grid-cols-3
                    gap-2
                    w-full
                    min-w-0
                    lg:max-w-[420px]
                    2xl:max-w-[480px]
                    max-h-[280px]
                    overflow-y-auto
                    pr-2
                "
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255,255,255,0.1) transparent"
                }}
            >
                {topics.map((topic, index) => {
                    const solvedPct = topic.total > 0 ? Math.round((topic.solved / topic.total) * 100) : 0;
                    return (
                        <div
                            key={index}
                            className="
                                rounded-xl
                                bg-white/5
                                border border-white/5
                                px-3
                                py-2.5
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                                h-[65px]
                                hover:bg-white/10
                                hover:border-orange-500/20
                                transition-all
                                duration-200
                            "
                        >
                            <h2
                                className="
                                    text-[10px]
                                    font-bold
                                    text-orange-400
                                    mb-0.5
                                    truncate
                                    w-full
                                "
                            >
                                {topic.name}
                            </h2>
                            <p
                                className="
                                    text-xs
                                    font-extrabold
                                    text-white
                                "
                            >
                                {topic.solved}
                                <span className="text-white/40 font-normal text-[10px]">
                                    /{topic.total}
                                </span>
                            </p>
                            <div className="w-full bg-white/10 h-[2px] rounded-full mt-1 overflow-hidden">
                                <div
                                    className="bg-orange-500 h-full transition-all duration-300"
                                    style={{ width: `${solvedPct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OverallProgress;

import { useParams } from "react-router-dom";
import DashLeftNavBar from "../dashboard/components/dashleftnavbar";

function PatternQuestions() {
    const { topic, pattern } = useParams();
    const topicName = decodeURIComponent(topic || "");
    const patternName = decodeURIComponent(pattern || "");

    return (
        <div
            className="
                w-full
                min-h-screen
                bg-[#070709]
                flex
                flex-col
                md:flex-row
                gap-3
                p-3
                overflow-x-hidden
            "
        >
            <div
                className="
                    w-full
                    md:w-[85px]
                    lg:w-[90px]
                    md:h-[calc(100vh-24px)]
                    flex-shrink-0
                "
            >
                <DashLeftNavBar />
            </div>

            <main
                className="
                    flex-1
                    min-h-[calc(100vh-112px)]
                    md:h-[calc(100vh-24px)]
                    overflow-y-auto
                    rounded-2xl
                    md:rounded-3xl
                    border
                    border-white/5
                    bg-white/8
                    backdrop-blur-xl
                    p-6
                "
            >
                <p className="text-sm font-medium text-orange-300">
                    DSA / Practice / {topicName} / {patternName}
                </p>
                <h1 className="mt-3 text-3xl font-bold text-white">
                    {patternName} Questions
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
                    Fetch questions for this user using topicName and patternName from the route.
                </p>
            </main>
        </div>
    );
}

export default PatternQuestions;

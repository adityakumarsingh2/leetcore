import { useParams } from "react-router-dom";
import DashboardPageShell from "../dashboard/components/DashboardPageShell";
import PatternQuestions from "./PatternQuestions";

function Practice() {
    const { topic } = useParams();
    const topicName = decodeURIComponent(topic || "");

    return (
        <DashboardPageShell className="p-6 flex flex-col gap-6" contentClass="border-white/5 bg-white/8 backdrop-blur-xl">
            <PatternQuestions embedded topicNameOverride={topicName} />
        </DashboardPageShell>
    );
}

export default Practice;

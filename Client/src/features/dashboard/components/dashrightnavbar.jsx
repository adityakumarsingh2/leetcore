import Calendar from "../../../components/layout/calender"
import Motivation from "../../../components/layout/motivation"
import DsaProgressTracker from "./DsaProgressTracker";
import RightAds from "./righttips";
import TomorrowTodo from "./TomorrowTodo";

function Dashrightnavbar() {
    return (
        <aside className="sticky top-0 space-y-4 pb-4">
            <div className="flex justify-center items-center">
                <Calendar />
            </div>
            <div className="flex justify-center items-center">
                <DsaProgressTracker />
            </div>
            <div className="flex justify-center items-center">
                <Motivation />
            </div>
            <div className="flex justify-center items-center">
                <TomorrowTodo />
            </div>
            <div className="flex justify-center items-center">
                <RightAds />
            </div>
        </aside>
    );
}

export default Dashrightnavbar;

import Calendar from "../../../components/layout/calender"
import Motivation from "../../../components/layout/motivation"
import DsaProgressTracker from "./DsaProgressTracker";
import RightAds from "./righttips";
import TomorrowTodo from "./TomorrowTodo";

function Dashrightnavbar() {
    return (
        <div >
            <div className="flex justify-center item-center mb-2">
                <Calendar />
            </div>
            <div className="flex justify-center item-center mb-3">
                <DsaProgressTracker />
            </div>
            <div className="flex justify-center item-center mb-4">
                <Motivation />
            </div>
            <div className="flex justify-center item-center">
                <TomorrowTodo />
            </div>
            <div className="flex justify-center item-center mb-4">
                <RightAds />
            </div>
        </div>
    );
}

export default Dashrightnavbar;

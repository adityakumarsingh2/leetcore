import Calendar from "../../../components/layout/calender"
import Motivation from "../../../components/layout/motivation"
import RightAds from "./righttips";
function Dashrightnavbar() {
    return (
        <div >
            <div className="flex justify-center item-center mb-2">
                <Calendar />
            </div>
            <div className="flex justify-center item-center mb-4">
                <Motivation />
            </div>
            <div className="flex justify-center item-center">
                <RightAds />
            </div>
        </div>
    );
}

export default Dashrightnavbar;
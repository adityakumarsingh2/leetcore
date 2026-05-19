import Dashmainnavbar from "../../../components/layout/dashnavbar";
import DashboardGamification from "../../gamification/components/DashboardGamification";
import Topics from "./topics";
function Dashmain() {
    return (
        <div>
            <Dashmainnavbar />
            <DashboardGamification />
            <Topics />
        </div>
    );
}

export default Dashmain;

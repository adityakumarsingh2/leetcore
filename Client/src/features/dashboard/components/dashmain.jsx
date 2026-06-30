import Dashmainnavbar from "../../../components/layout/dashnavbar";

import Topics from "./topics";
function Dashmain() {
    return (
        <div className="min-w-0">
            <Dashmainnavbar />
            
            <Topics />
        </div>
    );
}

export default Dashmain;

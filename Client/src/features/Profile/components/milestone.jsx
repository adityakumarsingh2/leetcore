import { useAuth } from "../../../context/AuthContext";
import UserBadges from "../../gamification/components/UserBadges";

function Milestone() {
    const { user } = useAuth();

    return (
        <div className="w-full p-5">
            <UserBadges userId={user?._id} compact />
        </div>
    );
}

export default Milestone;

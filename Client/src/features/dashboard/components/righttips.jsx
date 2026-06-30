import { useNavigate } from "react-router-dom";

function RightAds() {
    const navigate = useNavigate();

    return (
        <div
            className="
                w-[94%]
                mx-auto
                rounded-3xl
                border
                border-white/10
                bg-[#111113]
                p-6
                shadow-[0_16px_45px_rgba(0,0,0,0.18)]
            "
        >
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">
                    Advertise on LeetCore
                </h2>

                <p className="text-sm leading-relaxed text-neutral-400">
                    Reach students preparing for placements,
                    interviews, and technical careers.
                </p>
            </div>

            <button
                onClick={() => navigate("/dashboard/become-sponsor")}
                className="
                    mt-6
                    w-full
                    rounded-2xl
                    bg-orange-400
                    text-black
                    font-semibold
                    py-3
                    text-sm
                    transition-all
                    duration-300
                    active:scale-[0.98]
                    cursor-pointer
                "
            >
                Run Your Advertisement
            </button>
        </div>
    );
}

export default RightAds;
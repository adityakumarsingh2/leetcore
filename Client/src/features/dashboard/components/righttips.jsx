import { Megaphone } from "lucide-react";

function RightAds() {
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
            {/* Icon */}
            {/* <div className="w-12 h-12 rounded-2xl bg-[#F46717]/10 flex items-center justify-center mb-5">
                <Megaphone
                    size={22}
                    className="text-[#F46717]"
                />
            </div> */}

            {/* Content */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">
                    Advertise on LeetCore
                </h2>

                <p className="text-sm leading-relaxed text-neutral-400">
                    Reach students preparing for placements,
                    interviews, and technical careers.
                </p>
            </div>

            {/* CTA */}
            <button
                className="
                    mt-6
                    w-full
                    rounded-2xl
                    bg-orange-400
                    text-black
                    font-semibold
                    py-3
                    text-sm
                    font-medium
                    
                    transition-all
                    duration-300
                    
                    active:scale-[0.98]
                    cursor-pointer
                "
            >
                Run Your Advertise
            </button>
        </div>
    );
}

export default RightAds;
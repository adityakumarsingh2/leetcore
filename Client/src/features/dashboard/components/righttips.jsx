import {
    Play,
    Flame,
    Trophy,
} from "lucide-react";

function RightTips() {

    const runs = [
        {
            icon: Play,
            text: "Start solving your first DSA question today.",
        },
        {
            icon: Flame,
            text: "Maintain your daily coding streak consistently.",
        },
        {
            icon: Trophy,
            text: "Complete challenges and unlock achievements.",
        }
    ];

    return (

        <div
            className="
                relative
                w-[94%]
                mx-auto
                rounded-3xl
                border
                border-white/10
                bg-[#111113]
                p-5
                sm:p-6
                overflow-hidden
                shadow-[0_16px_45px_rgba(0,0,0,0.18)]
            "
        >



            {/* Heading */}
            <div className="relative z-10 mb-6">

                <h2
                    className="
                        text-xl
                        font-semibold
                        text-white
                    "
                >
                    Run Your Ads
                </h2>



            </div>

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-3
                "
            >


                {/* CTA Button */}
                <button
                    className="
                        mt-2
                        w-full
                        rounded-2xl
                        bg-[#F46717]
                        py-3
                        text-md
                        font-medium
                        text-white
                        transition-all
                        duration-300
                        hover:bg-[#ff7d34]
                        active:scale-[0.98]
                        cursor-pointer
                    "
                >
                    Run Your Ad
                </button>

            </div>
        </div>

    );

}

export default RightTips;

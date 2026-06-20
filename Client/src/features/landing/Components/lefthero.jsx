// LeftSection.jsx
import { FiMap, FiEdit3, FiTrendingUp, FiBookOpen } from "react-icons/fi";

function LeftSection({ onLoginClick }) {
    return (
        <div className="flex-1 text-white w-full max-w-2xl lg:max-w-none">

            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white text-sm font-semibold mb-6 sm:mb-7">
                1,000+ Learners
            </div>

            {/* Heading */}
            <h1 className="text-[clamp(2.45rem,12vw,4.5rem)] sm:text-5xl lg:text-6xl leading-[1.06] tracking-normal text-white max-w-2xl lc-safe-text">
                Core CS <br />
                <span className="text-[#F46717]">Is Baar Actually</span> <br />
                Samajh Aayega.
            </h1>

            {/* Description */}
            <p className="text-[#b7b7c2] text-base mt-5 leading-relaxed max-w-xl">
                Learn Operating Systems, DBMS, Computer Networks, and OOPS
                through structured roadmaps, practice questions, and
                interactive learning designed for placements.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-9">

                <button onClick={onLoginClick} className="min-h-12 bg-white text-black px-8 py-4 rounded-2xl font-semibold cursor-pointer lc-interactive hover:bg-orange-50 active:scale-[0.98]">
                    Start Learning
                </button>

                <button onClick={onLoginClick} className="min-h-12 bg-[#F46717] text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer lc-orange-glow lc-interactive hover:bg-[#ff7d34] active:scale-[0.98]">
                    Explore Roadmaps →
                </button>
            </div>

            {/* Features */}

            <div className="mt-9 sm:mt-10 flex flex-col gap-3.5 sm:gap-4 text-[#b7b7c2]">

                <div className="flex items-start gap-3 text-sm leading-6">
                    <FiMap className="text-[#F46717] text-lg mt-0.5 shrink-0" />
                    <span>Follow structured roadmaps designed for real placement preparation</span>
                </div>

                <div className="flex items-start gap-3 text-sm leading-6">
                    <FiEdit3 className="text-[#F46717] text-lg mt-0.5 shrink-0" />
                    <span>Practice interactive questions with instant feedback and explanations</span>
                </div>

                <div className="flex items-start gap-3 text-sm leading-6">
                    <FiTrendingUp className="text-[#F46717] text-lg mt-0.5 shrink-0" />
                    <span>Track weak topics, monitor progress, and improve consistently</span>
                </div>

                <div className="flex items-start gap-3 text-sm leading-6">
                    <FiBookOpen className="text-[#F46717] text-lg mt-0.5 shrink-0" />
                    <span>Learn difficult CS concepts through simple Hinglish explanations</span>
                </div>

            </div>
        </div>
    );
}

export default LeftSection;

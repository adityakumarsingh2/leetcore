// HeroSection.jsx
import LeftSection from "./Components/lefthero";
import RightSection from "./Components/righthero";


function HeroSection({ onLoginClick }) {
    return (
        <section className="w-full min-h-[calc(100svh-64px)] bg-transparent overflow-hidden relative">


            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-16 lg:pt-12 lg:pb-24 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-10 relative z-10">

                {/* Left */}
                <LeftSection onLoginClick={onLoginClick} />

                {/* Right */}
                <RightSection />
            </div>
        </section>
    );
}

export default HeroSection;

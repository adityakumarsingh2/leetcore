// RightSection.jsx

function RightSection() {
    return (
        <div className="flex-1 relative min-h-[300px] sm:min-h-[460px] lg:h-[680px] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-8 rounded-full bg-[#F46717]/10 blur-[90px] animate-gentle-pulse" />
            <img
                src="/heroimage.png"
                alt="LeetCore learning dashboard preview"
                className="relative z-10 w-full max-w-[560px] lg:max-w-[620px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(244,103,23,0.12)] animate-soft-float"
            />
        </div>
    );
}

export default RightSection;

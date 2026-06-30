import DashLeftNavBar from "./dashleftnavbar";

function DashboardPageShell({ 
    children, 
    className = "", 
    style = {}, 
    plain = false,
    bgClass = "bg-[#070709]",
    contentClass = "border-white/8 bg-[#111113]/78 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
}) {
    return (
        <div className={`w-full min-h-screen ${bgClass} flex flex-col md:flex-row gap-3 lg:gap-4 p-2.5 sm:p-3 overflow-x-hidden`}>
            <div className="w-full md:w-[85px] lg:w-[90px] md:h-[calc(100vh-24px)] flex-shrink-0 relative z-40">
                <DashLeftNavBar />
            </div>

            {plain ? (
                <div className={`flex-1 min-h-[calc(100vh-112px)] md:h-[calc(100vh-24px)] overflow-y-auto scroll-smooth ${className}`} style={style}>
                    {children}
                </div>
            ) : (
                <main 
                    className={`flex-1 min-h-[calc(100vh-112px)] md:h-[calc(100vh-24px)] overflow-y-auto scroll-smooth rounded-2xl md:rounded-3xl border ${contentClass} ${className}`}
                    style={style}
                >
                    {children}
                </main>
            )}
        </div>
    );
}

export default DashboardPageShell;

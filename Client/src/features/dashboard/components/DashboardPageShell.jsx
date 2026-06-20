import DashLeftNavBar from "./dashleftnavbar";

function DashboardPageShell({ children }) {
    return (
        <div className="w-full min-h-screen bg-[#070709] flex flex-col md:flex-row gap-2 sm:gap-3 p-2 sm:p-3 overflow-x-hidden">
            <div className="w-full md:w-[85px] lg:w-[90px] md:h-[calc(100svh-24px)] flex-shrink-0">
                <DashLeftNavBar />
            </div>

            <main className="flex-1 min-h-[calc(100svh-96px)] md:h-[calc(100svh-24px)] overflow-y-auto rounded-2xl md:rounded-3xl border border-white/8 bg-[#111113]/78 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
                {children}
            </main>
        </div>
    );
}

export default DashboardPageShell;

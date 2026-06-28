import DashboardPageShell from "./components/DashboardPageShell";
import Dashmain from "./components/dashmain";
import DashRightNavBar from "./components/dashrightnavbar";

function Dashboard() {
    return (
        <DashboardPageShell className="p-6 flex flex-col lg:flex-row gap-6 lg:gap-8" plain={true}>
            {/* Main Section */}
            <div className="flex-1 min-w-0">
                <Dashmain />
            </div>
            {/* Right Sidebar */}
            <div className="hidden xl:block w-[320px] 2xl:w-[360px] flex-shrink-0">
                <DashRightNavBar />
            </div>
        </DashboardPageShell>
    );
}

export default Dashboard;
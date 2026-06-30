import DashboardPageShell from "./components/DashboardPageShell";
import Dashmain from "./components/dashmain";
import DashRightNavBar from "./components/dashrightnavbar";

function Dashboard() {
    return (
        <DashboardPageShell className="p-2 flex flex-col lg:flex-row gap-5 lg:gap-0" plain={true}>
            {/* Main Section */}
            <div className="flex-1 min-w-0">
                <Dashmain />
            </div>
            {/* Right Sidebar */}
            <div className="hidden xl:block w-[310px] 2xl:w-[350px] flex-shrink-0">
                <DashRightNavBar />
            </div>
        </DashboardPageShell>
    );
}

export default Dashboard;
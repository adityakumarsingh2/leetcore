import DashLeftNavBar from "./components/dashleftnavbar";
import Dashmain from "./components/dashmain";
import DashRightNavBar from "./components/dashrightnavbar";

function Dashboard() {
    return (
        <div className="w-full min-h-screen bg-[#070709] overflow-hidden">

            {/* Fixed Left Navbar */}
            <div
                className="
                    fixed
                    left-2
                    top-2
                    w-[90px]
                    h-[calc(100svh-16px)]
                    z-50
                "
            >
                <DashLeftNavBar />
            </div>

            {/* Content Area */}
            <div
                className="
                    ml-[90px]
                    flex
                    
                    p-2
                    min-h-screen
                "
            >
                {/* Main Section */}
                <div className="flex-1 overflow-y-auto">
                    <Dashmain />
                </div>
                {/* Right Sidebar */}
                <div
                    className="
                        hidden
                        xl:block
                        w-[320px]
                        2xl:w-[360px]
                        flex-shrink-0
                        -ml-4
                    "
                >
                    <DashRightNavBar />
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
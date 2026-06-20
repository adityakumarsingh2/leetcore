import DashLeftNavBar from "./components/dashleftnavbar";
import Dashmain from "./components/dashmain";
import DashRightNavBar from "./components/dashrightnavbar";

function Dashboard() {

    return (

        <div
            className="
                w-full
                min-h-screen
                bg-[#070709]
                flex
                flex-col
                md:flex-row
                gap-2
                sm:gap-3
                p-2
                sm:p-3
                overflow-x-hidden
            "
        >

            {/* Left Navbar */}
            <div
                className="
                    w-full
                    md:w-[85px]
                    lg:w-[90px]
                    md:h-[calc(100svh-24px)]
                    flex-shrink-0
                "
            >
                <DashLeftNavBar />
            </div>

            {/* Main Section */}
            <div
                className="
                    flex-1
                    min-h-[calc(100svh-96px)]
                    md:h-[calc(100svh-24px)]
                    overflow-y-auto
                    rounded-2xl
                    md:rounded-3xl
                    border
                    border-white/8
                    bg-[#111113]/78
                    backdrop-blur-xl
                    shadow-[0_20px_70px_rgba(0,0,0,0.22)]
                "
            >
                <Dashmain />
            </div>

            {/* Right Sidebar */}
            <div
                className="
                    hidden
                    xl:block
                    w-[320px]
                    2xl:w-[360px]
                    h-[calc(100svh-24px)]
                    overflow-y-auto
                    rounded-3xl
                    border
                    border-white/8
                    bg-[#111113]/78
                    backdrop-blur-xl
                    shadow-[0_20px_70px_rgba(0,0,0,0.22)]
                    flex-shrink-0
                "
            >
                <DashRightNavBar />
            </div>

        </div>

    );

}

export default Dashboard;

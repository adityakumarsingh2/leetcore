import { Construction } from "lucide-react";
import DashboardPageShell from "./components/DashboardPageShell";

function ContestPage() {
    return (
        <DashboardPageShell>
            <div className="flex min-h-[80vh] items-center justify-center px-6">
                <div className="max-w-2xl text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F46717]/15">
                        <Construction className="text-[#F46717]" size={42} />
                    </div>

                    <h1 className="mt-8 text-4xl font-bold text-white">
                        Contests Coming Soon 
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-white/60">
                        Sorry for the inconvenience. We are currently working on
                        this feature to bring you the best contest experience.
                    </p>

                    <p className="mt-3 text-lg leading-8 text-white/60">
                        It will be available very soon. Thank you for your
                        patience and continued support. ❤️
                    </p>

                    <div className="mt-8 inline-flex rounded-2xl border border-[#F46717]/30 bg-[#F46717]/10 px-6 py-3 text-[#F46717] font-medium">
                        Stay tuned for exciting updates!
                    </div>
                </div>
            </div>
        </DashboardPageShell>
    );
}

export default ContestPage;
import { useEffect, useState } from "react";
import { ArrowRight, Award } from "lucide-react";
import { badgeService } from "../../../services/badgeService";
import BadgeGrid from "./BadgeGrid";
import BadgeModal from "./BadgeModal";

function UserBadges({ userId, compact = false }) {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(Boolean(userId));
    const [selectedBadge, setSelectedBadge] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        let mounted = true;

        const fetchBadges = async () => {
            setLoading(true);

            try {
                const response = await badgeService.getUserBadges(userId);

                if (mounted) {
                    setBadges(response.data.badges || []);
                }
            } catch (error) {
                console.error("Failed to load badges:", error);

                if (mounted) {
                    setBadges([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchBadges();

        return () => {
            mounted = false;
        };
    }, [userId]);

    const visibleBadges = compact ? badges.slice(0, 3) : badges;

    return (
        <section className="w-full rounded-lg border border-white/8 bg-[#1F1F22] p-5 text-white">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-white/55">
                        <Award size={17} className="text-[#F46717]" />
                        <p className="text-sm font-medium">Badges</p>
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold">{badges.length}</h2>
                </div>
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/8 text-white/70 transition hover:bg-white/15 hover:text-white"
                    aria-label="View badges"
                >
                    <ArrowRight size={20} />
                </button>
            </div>

            <BadgeGrid
                badges={visibleBadges}
                loading={loading}
                emptyLabel="Complete daily activity, solve problems, and build streaks to earn badges."
                onBadgeClick={setSelectedBadge}
            />

            <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
        </section>
    );
}

export default UserBadges;

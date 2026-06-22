import { useEffect, useState } from "react";
import { Award, ArrowRight } from "lucide-react";
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

    const visibleBadges = compact ? badges.slice(0, 10) : badges;

    return (
        <section className="w-full text-white bg-transparent">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-white/50">
                        <Award size={16} className="text-orange-500" />
                        <p className="text-xs font-bold uppercase tracking-wider">Badges Earned</p>
                    </div>
                    <h2 className="mt-1 text-2xl font-black">{badges.length}</h2>
                </div>
                {badges.length > 10 && compact && (
                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                        aria-label="View badges"
                    >
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>

            <BadgeGrid
                badges={visibleBadges}
                loading={loading}
                emptyLabel="Solve all problems in a topic or build streaks to earn master badges!"
                onBadgeClick={setSelectedBadge}
            />

            <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
        </section>
    );
}

export default UserBadges;

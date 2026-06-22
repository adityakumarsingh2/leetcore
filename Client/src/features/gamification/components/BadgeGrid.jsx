import BadgeCard from "./BadgeCard";

function BadgeGrid({ badges = [], loading = false, emptyLabel = "No badges earned yet.", onBadgeClick }) {
    if (loading) {
        return (
            <div className="flex flex-wrap gap-3 items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-12 h-12 rounded-full border border-white/5 bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (!badges.length) {
        return (
            <div className="w-full rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center">
                <p className="text-xs font-semibold text-white/70">Badges are waiting</p>
                <p className="mt-1 text-[11px] text-white/40">{emptyLabel}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-3 items-center justify-start">
            {badges.map((item) => {
                const badge = item.badgeId || item;
                const key = badge?._id || badge?.slug;

                return (
                    <BadgeCard
                        key={key}
                        badge={badge}
                        earnedAt={item.earnedAt}
                        onClick={onBadgeClick}
                    />
                );
            })}
        </div>
    );
}

export default BadgeGrid;

import BadgeCard from "./BadgeCard";

function BadgeGrid({ badges = [], loading = false, emptyLabel = "No badges earned yet.", onBadgeClick }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-32 animate-pulse rounded-lg border border-white/10 bg-white/8" />
                ))}
            </div>
        );
    }

    if (!badges.length) {
        return (
            <div className="rounded-lg border border-dashed border-white/15 bg-white/5 px-4 py-8 text-center">
                <p className="text-sm font-medium text-white">Badges are waiting</p>
                <p className="mt-2 text-xs text-white/50">{emptyLabel}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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

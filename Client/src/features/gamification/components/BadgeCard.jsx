import { Award, CalendarDays, Sparkles } from "lucide-react";

const rarityStyles = {
    common: "border-zinc-500/30 bg-zinc-500/10 text-zinc-200",
    rare: "border-cyan-400/35 bg-cyan-400/10 text-cyan-200",
    epic: "border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-200",
    legendary: "border-amber-300/40 bg-amber-300/10 text-amber-100",
};

const iconStyles = {
    common: "bg-zinc-200 text-zinc-950",
    rare: "bg-cyan-300 text-cyan-950",
    epic: "bg-fuchsia-300 text-fuchsia-950",
    legendary: "bg-amber-300 text-amber-950",
};

function BadgeCard({ badge, earnedAt, onClick }) {
    const rarity = badge?.rarity || "common";

    return (
        <button
            type="button"
            onClick={() => onClick?.(badge)}
            className="group h-full rounded-lg border border-white/10 bg-[#151516] p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
        >
            <div className="flex items-start gap-3">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${iconStyles[rarity]}`}>
                    {badge?.image ? (
                        <img src={badge.image} alt="" className="h-8 w-8 object-contain" />
                    ) : (
                        <Award size={24} />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-white">{badge?.name || "Locked Badge"}</h3>
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-normal ${rarityStyles[rarity]}`}>
                            {rarity}
                        </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/55">
                        {badge?.description || "Keep learning to unlock this badge."}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-xs text-white/50">
                <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#F46717]" />
                    {badge?.xpReward || 0} XP
                </span>
                {earnedAt && (
                    <span className="inline-flex min-w-0 items-center gap-1.5">
                        <CalendarDays size={14} className="text-[#F46717]" />
                        <span className="truncate">
                            {new Date(earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                    </span>
                )}
            </div>
        </button>
    );
}

export default BadgeCard;

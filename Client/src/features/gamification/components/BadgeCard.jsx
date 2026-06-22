import { Award } from "lucide-react";

const rarityStyles = {
    common: "border-zinc-500/35 bg-zinc-500/10 text-zinc-300 hover:border-zinc-400 hover:shadow-[0_0_8px_rgba(113,113,122,0.25)]",
    rare: "border-cyan-500/35 bg-cyan-500/10 text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]",
    epic: "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300 hover:border-fuchsia-400 hover:shadow-[0_0_8px_rgba(217,70,239,0.3)]",
    legendary: "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_8px_rgba(245,158,11,0.35)]",
};

function BadgeCard({ badge, earnedAt, onClick }) {
    const rarity = badge?.rarity || "common";
    const name = badge?.name || "Locked Badge";
    const earnedDateStr = earnedAt
        ? ` (Earned ${new Date(earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })})`
        : "";

    return (
        <button
            type="button"
            onClick={() => onClick?.(badge)}
            title={`${name} [${rarity.toUpperCase()}]${earnedDateStr}\n${badge?.description || ""}`}
            className={`
                group relative flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 hover:scale-110 cursor-pointer
                ${rarityStyles[rarity]}
            `}
        >
            <div className="flex items-center justify-center z-10">
                {badge?.image ? (
                    <img src={badge.image} alt={name} className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-105" />
                ) : (
                    <Award size={20} className="transition-transform duration-300 group-hover:scale-105" />
                )}
            </div>
            {/* Subtle overlay hover effect */}
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors" />
        </button>
    );
}

export default BadgeCard;

import { X } from "lucide-react";
import { useEffect } from "react";
import { BadgeIcon } from "../../Profile/components/BadgeIcon";

function BadgeModal({ badge, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!badge) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-md rounded-2xl border border-white/[0.05] bg-[#121215] p-6 text-white shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-normal text-[#F46717]">{badge.category}</p>
                        <h2 className="mt-2 text-xl font-semibold">{badge.name}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 text-white/70 transition hover:bg-white/15 hover:text-white"
                        aria-label="Close badge details"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Badge Visual Representation */}
                <div className="flex flex-col items-center justify-center my-6 py-2 bg-black/20 rounded-xl border border-white/[0.03]">
                    <BadgeIcon slug={badge.slug} size={130} unlocked={badge.unlocked} />
                </div>

                <p className="mt-4 text-sm leading-6 text-white/65">{badge.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-white/6 p-3">
                        <p className="text-xs text-white/45">Rarity</p>
                        <p className="mt-1 font-semibold capitalize">{badge.rarity}</p>
                    </div>
                    <div className="rounded-lg bg-white/6 p-3">
                        <p className="text-xs text-white/45">Reward</p>
                        <p className="mt-1 font-semibold">{badge.xpReward || 0} XP</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BadgeModal;


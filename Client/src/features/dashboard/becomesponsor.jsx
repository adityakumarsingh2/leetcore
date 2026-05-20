import { useState } from "react";
import {
    BadgeCheck,
    HeartHandshake,
    Megaphone,
    Send,
    Sparkles,
    Users,
    TrendingUp,
    Globe,
    ChevronRight,
    CheckCircle2,
    BarChart3,
    Zap,
    Star,
    ArrowRight,
    Mail,
    Building2,
    Target,
    MessageSquare,
} from "lucide-react";

/* ─── Inline mock shell ────────────────────────────────────────────── */
function DashboardPageShell({ children }) {
    return (
        <div style={{ minHeight: "100vh", background: "#0b0b0d", fontFamily: "'Sora', sans-serif" }}>
            <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
            {children}
        </div>
    );
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const BENEFITS = [
    {
        icon: Users,
        title: "Focused Audience",
        text: "Reach students actively preparing for DSA, system design, and placement interviews — already in a learning mindset.",
        stat: "50k+",
        statLabel: "monthly learners",
    },
    {
        icon: BarChart3,
        title: "High-Intent Traffic",
        text: "Sponsor placements live in calm dashboard surfaces where users look for guidance — not in noisy ad slots.",
        stat: "4.2×",
        statLabel: "avg. engagement rate",
    },
    {
        icon: Zap,
        title: "Fast to Launch",
        text: "Start with a single compact placement and scale once the audience fit is confirmed. Zero long-term lock-in.",
        stat: "48h",
        statLabel: "onboarding time",
    },
];

const TIERS = [
    {
        name: "Starter",
        price: "$299",
        period: "/mo",
        color: "#6b7280",
        perks: ["1 dashboard placement", "Logo + link", "Basic analytics", "Monthly report"],
    },
    {
        name: "Growth",
        price: "$799",
        period: "/mo",
        color: "#F46717",
        highlight: true,
        perks: ["3 dashboard placements", "Logo + custom CTA", "Real-time analytics", "Weekly report", "Dedicated Slack channel"],
    },
    {
        name: "Partner",
        price: "Custom",
        period: "",
        color: "#a78bfa",
        perks: ["Unlimited placements", "Full co-branding", "Priority analytics", "Custom integrations", "Quarterly strategy call"],
    },
];

const LOGOS = ["Google", "Microsoft", "Stripe", "Notion", "Vercel", "Linear"];

/* ─── Sub-components ────────────────────────────────────────────────── */
function StatPill({ value, label }) {
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "16px 24px", background: "rgba(244,103,23,0.08)",
            border: "1px solid rgba(244,103,23,0.2)", borderRadius: "16px",
        }}>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#F46717", fontFamily: "'Space Mono', monospace" }}>{value}</span>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, text, stat, statLabel }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderRadius: "20px",
                border: `1px solid ${hovered ? "rgba(244,103,23,0.35)" : "rgba(255,255,255,0.07)"}`,
                background: hovered ? "rgba(244,103,23,0.06)" : "rgba(255,255,255,0.03)",
                padding: "24px",
                transition: "all 0.25s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {hovered && (
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: "120px", height: "120px",
                    background: "radial-gradient(circle, rgba(244,103,23,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />
            )}
            <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "rgba(244,103,23,0.12)", color: "#F46717",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <Icon size={20} />
            </div>
            <h3 style={{ marginTop: "16px", fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{title}</h3>
            <p style={{ marginTop: "8px", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>{text}</p>
            <div style={{ marginTop: "20px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F46717", fontFamily: "'Space Mono', monospace" }}>{stat}</span>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{statLabel}</span>
            </div>
        </div>
    );
}

function TierCard({ name, price, period, color, perks, highlight }) {
    return (
        <div style={{
            borderRadius: "20px",
            border: `1px solid ${highlight ? color : "rgba(255,255,255,0.08)"}`,
            background: highlight ? `linear-gradient(135deg, rgba(244,103,23,0.12), rgba(244,103,23,0.04))` : "rgba(255,255,255,0.03)",
            padding: "28px 24px",
            position: "relative",
            flex: "1 1 0",
            minWidth: "200px",
        }}>
            {highlight && (
                <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "#F46717", color: "#fff", fontSize: "0.7rem", fontWeight: 700,
                    padding: "4px 14px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                }}>Most Popular</div>
            )}
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{name}</p>
            <div style={{ marginTop: "12px", display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", fontFamily: "'Space Mono', monospace" }}>{price}</span>
                {period && <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{period}</span>}
            </div>
            <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
                {perks.map(p => (
                    <li key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                        <CheckCircle2 size={15} style={{ color, flexShrink: 0 }} />
                        {p}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ─── Main component ────────────────────────────────────────────────── */
function BecomeSponsorPage() {
    const [step, setStep] = useState(1); // 1 = form, 2 = success
    const [form, setForm] = useState({ company: "", email: "", goal: "", tier: "Growth" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function validate() {
        const e = {};
        if (!form.company.trim()) e.company = "Required";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
        if (!form.goal.trim()) e.goal = "Required";
        return e;
    }

    async function handleSubmit() {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1400));
        setLoading(false);
        setStep(2);
    }

    const inputStyle = (err) => ({
        marginTop: "8px",
        width: "100%",
        borderRadius: "14px",
        border: `1px solid ${err ? "#f87171" : "rgba(255,255,255,0.1)"}`,
        background: "rgba(255,255,255,0.04)",
        padding: "12px 16px",
        color: "#fff",
        fontSize: "0.9rem",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "'Sora', sans-serif",
        transition: "border-color 0.2s",
    });

    return (
        <DashboardPageShell>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 20px 80px" }}>

                {/* ── Hero header ── */}
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: "rgba(244,103,23,0.1)", border: "1px solid rgba(244,103,23,0.25)",
                        borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
                    }}>
                        <HeartHandshake size={14} style={{ color: "#F46717" }} />
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#F46717", textTransform: "uppercase", letterSpacing: "0.1em" }}>Become a Sponsor</span>
                    </div>
                    <h1 style={{
                        fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 800,
                        color: "#fff", lineHeight: 1.1, margin: "0 auto", maxWidth: "720px",
                        letterSpacing: "-0.02em",
                    }}>
                        Reach developers <span style={{
                            background: "linear-gradient(90deg, #F46717, #ff9a5c)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>right when it matters</span>
                    </h1>
                    <p style={{
                        marginTop: "20px", fontSize: "1.05rem", color: "rgba(255,255,255,0.45)",
                        maxWidth: "540px", margin: "20px auto 0", lineHeight: 1.75,
                    }}>
                        Partner with LeetCore to reach focused, high-intent learners who are building real technical skills every day.
                    </p>

                    {/* Quick stats */}
                    <div style={{
                        marginTop: "40px", display: "flex", justifyContent: "center",
                        flexWrap: "wrap", gap: "12px",
                    }}>
                        {[["50k+", "Monthly users"], ["92%", "Placement rate"], ["4.2×", "Engagement"], ["48h", "Go live"]].map(([v, l]) => (
                            <StatPill key={l} value={v} label={l} />
                        ))}
                    </div>
                </div>

                {/* ── Social proof strip ── */}
                <div style={{
                    marginBottom: "60px", padding: "18px 28px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px", background: "rgba(255,255,255,0.02)",
                    display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center",
                }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>Trusted by teams at</span>
                    {LOGOS.map(l => (
                        <span key={l} style={{
                            fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.25)",
                            letterSpacing: "0.04em", textTransform: "uppercase",
                        }}>{l}</span>
                    ))}
                </div>

                {/* ── Main grid: benefits + form ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr min(420px, 100%)", gap: "24px", alignItems: "start" }}>

                    {/* Left column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                        {/* Benefits */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                            {BENEFITS.map(b => <BenefitCard key={b.title} {...b} />)}
                        </div>

                        {/* Pricing tiers */}
                        <div style={{
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                            padding: "28px",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                                <Star size={18} style={{ color: "#F46717" }} />
                                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: 0 }}>Sponsorship tiers</h2>
                            </div>
                            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                {TIERS.map(t => <TierCard key={t.name} {...t} />)}
                            </div>
                        </div>

                        {/* How it works */}
                        <div style={{
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                            padding: "28px",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                                <Target size={18} style={{ color: "#F46717" }} />
                                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: 0 }}>How it works</h2>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                                {[
                                    { n: "01", title: "Submit your interest", desc: "Fill out the form with your brand details and campaign goal." },
                                    { n: "02", title: "We review & match", desc: "Our team reviews your request and suggests the best placement within 48h." },
                                    { n: "03", title: "Go live", desc: "Your sponsor card goes live and you start receiving analytics immediately." },
                                ].map((s, i, arr) => (
                                    <div key={s.n} style={{ display: "flex", gap: "16px", position: "relative" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div style={{
                                                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                                                background: "rgba(244,103,23,0.12)", border: "1px solid rgba(244,103,23,0.3)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#F46717", fontSize: "0.7rem", fontWeight: 800, fontFamily: "'Space Mono', monospace",
                                            }}>{s.n}</div>
                                            {i < arr.length - 1 && (
                                                <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.08)", margin: "8px 0" }} />
                                            )}
                                        </div>
                                        <div style={{ paddingBottom: i < arr.length - 1 ? "24px" : 0 }}>
                                            <p style={{ margin: 0, fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>{s.title}</p>
                                            <p style={{ margin: "6px 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column — form or success */}
                    <div style={{
                        borderRadius: "24px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                        padding: "28px",
                        position: "sticky",
                        top: "24px",
                    }}>
                        {step === 1 ? (
                            <>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "10px",
                                        background: "rgba(250,204,21,0.12)", color: "#fbbf24",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Sponsor request</h2>
                                        <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>We respond within 48 hours</p>
                                    </div>
                                </div>

                                {/* Tier selector */}
                                <div style={{ marginBottom: "20px" }}>
                                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "10px", fontWeight: 500 }}>Interested tier</p>
                                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                        {["Starter", "Growth", "Partner"].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setForm(f => ({ ...f, tier: t }))}
                                                style={{
                                                    padding: "7px 16px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600,
                                                    cursor: "pointer", transition: "all 0.2s", fontFamily: "'Sora', sans-serif",
                                                    border: form.tier === t ? "1px solid #F46717" : "1px solid rgba(255,255,255,0.1)",
                                                    background: form.tier === t ? "rgba(244,103,23,0.15)" : "transparent",
                                                    color: form.tier === t ? "#F46717" : "rgba(255,255,255,0.45)",
                                                }}
                                            >{t}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Fields */}
                                {[
                                    { key: "company", label: "Company or creator name", placeholder: "Acme Inc.", icon: Building2 },
                                    { key: "email", label: "Work email", placeholder: "you@company.com", icon: Mail },
                                ].map(({ key, label, placeholder, icon: Icon }) => (
                                    <label key={key} style={{ display: "block", marginBottom: "16px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <Icon size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                                            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{label}</span>
                                        </div>
                                        <input
                                            value={form[key]}
                                            onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: undefined })); }}
                                            style={inputStyle(errors[key])}
                                            placeholder={placeholder}
                                        />
                                        {errors[key] && <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "#f87171" }}>{errors[key]}</p>}
                                    </label>
                                ))}

                                <label style={{ display: "block", marginBottom: "20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        <MessageSquare size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                                        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Campaign goal</span>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={form.goal}
                                        onChange={e => { setForm(f => ({ ...f, goal: e.target.value })); setErrors(er => ({ ...er, goal: undefined })); }}
                                        style={{ ...inputStyle(errors.goal), resize: "none" }}
                                        placeholder="Tell us what you're promoting and your target audience…"
                                    />
                                    {errors.goal && <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "#f87171" }}>{errors.goal}</p>}
                                </label>

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    style={{
                                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                        borderRadius: "14px", background: loading ? "rgba(244,103,23,0.5)" : "#F46717",
                                        padding: "14px", border: "none", cursor: loading ? "default" : "pointer",
                                        color: "#fff", fontWeight: 700, fontSize: "0.95rem", fontFamily: "'Sora', sans-serif",
                                        transition: "background 0.2s",
                                        boxShadow: loading ? "none" : "0 8px 24px rgba(244,103,23,0.3)",
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <div style={{
                                                width: "16px", height: "16px", borderRadius: "50%",
                                                border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                                                animation: "spin 0.7s linear infinite",
                                            }} />
                                            Sending…
                                            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                                        </>
                                    ) : (
                                        <><Send size={16} /> Submit interest</>
                                    )}
                                </button>

                                <p style={{ marginTop: "14px", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", textAlign: "center", lineHeight: 1.6 }}>
                                    No commitment required. We'll follow up within 48h with placement options.
                                </p>
                            </>
                        ) : (
                            /* Success state */
                            <div style={{ textAlign: "center", padding: "24px 0" }}>
                                <div style={{
                                    width: "64px", height: "64px", borderRadius: "50%",
                                    background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    margin: "0 auto 20px",
                                }}>
                                    <CheckCircle2 size={30} style={{ color: "#22c55e" }} />
                                </div>
                                <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>Request received!</h2>
                                <p style={{ marginTop: "12px", fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                                    Thanks, <strong style={{ color: "#fff" }}>{form.company}</strong>! We'll review your <strong style={{ color: "#F46717" }}>{form.tier}</strong> tier interest and get back to <strong style={{ color: "#fff" }}>{form.email}</strong> within 48 hours.
                                </p>
                                <button
                                    onClick={() => { setStep(1); setForm({ company: "", email: "", goal: "", tier: "Growth" }); }}
                                    style={{
                                        marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "6px",
                                        borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)",
                                        background: "transparent", padding: "10px 20px", cursor: "pointer",
                                        color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "'Sora', sans-serif",
                                    }}
                                >
                                    <ArrowRight size={14} /> Submit another request
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── FAQ strip ── */}
                <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                    {[
                        { q: "Can I cancel anytime?", a: "Yes — monthly plans can be cancelled before the next billing cycle with no penalty." },
                        { q: "Do I get performance data?", a: "All tiers include analytics. Growth and Partner get real-time dashboards." },
                        { q: "What formats are supported?", a: "We support logo + link cards, rich text banners, and custom HTML for Partner tier." },
                    ].map(({ q, a }) => (
                        <div key={q} style={{
                            borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)",
                            background: "rgba(255,255,255,0.02)", padding: "20px 22px",
                        }}>
                            <p style={{ margin: 0, fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>{q}</p>
                            <p style={{ margin: "8px 0 0", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{a}</p>
                        </div>
                    ))}
                </div>

            </div>
        </DashboardPageShell>
    );
}

export default BecomeSponsorPage;
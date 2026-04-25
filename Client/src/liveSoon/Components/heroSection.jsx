import { useState, useEffect, useRef } from "react";

const TARGET = new Date(Date.now() + 57 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000 + 52 * 60 * 1000);

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, TARGET - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function FlipCard({ value, isMobile }) {
  const [current, setCurrent] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setFlipping(true);
      const t = setTimeout(() => {
        setCurrent(value);
        setFlipping(false);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [value]);

  const fmt = (n) => String(n).padStart(2, "0");
  const cardW = isMobile ? 52 : 72;
  const cardH = isMobile ? 68 : 96;
  const fontSize = isMobile ? "2.4rem" : "3.8rem";

  return (
    <div style={{ display: "flex", gap: isMobile ? 4 : 6 }}>
      {fmt(current).split("").map((digit, i) => (
        <div key={i} style={{
          width: cardW,
          height: cardH,
          background: "#111318",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize,
          fontWeight: 700,
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          color: "#e8e0c8",
          boxShadow: "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          animation: flipping ? "flipIn 0.32s ease" : "none",
        }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.6)", zIndex: 2 }} />
          {digit}
        </div>
      ))}
    </div>
  );
}

function StatUnit({ value, label, isMobile }) {
  return (
    <div style={{ textAlign: "center", minWidth: isMobile ? 44 : 60 }}>
      <div style={{
        fontSize: isMobile ? "1.8rem" : "2.6rem",
        fontWeight: 800,
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        color: "#e8e0c8",
        lineHeight: 1,
        letterSpacing: "0.02em",
      }}>{String(value).padStart(2, "0")}</div>
      <div style={{
        fontSize: "0.5rem",
        letterSpacing: "0.2em",
        color: "rgba(200,185,130,0.5)",
        fontFamily: "'DM Mono', monospace",
        marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

function CodeParticles() {
  const snippets = ["for()", "O(n)", "=>", "{}", "[]", "//", "&&", "++", "<=", "fn()", "git", "npm", "cd ~", "ls -a", "!=", "==="];
  const items = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      text: snippets[i % snippets.length],
      x: Math.random() * 95,
      y: Math.random() * 95,
      dur: 12 + Math.random() * 16,
      delay: Math.random() * 10,
      size: 0.55 + Math.random() * 0.3,
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {items.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          fontSize: `${p.size}rem`,
          fontFamily: "'DM Mono', monospace",
          color: "rgba(200,175,90,0.07)",
          animation: `floatCode ${p.dur}s ${p.delay}s ease-in-out infinite`,
          letterSpacing: "0.05em",
        }}>{p.text}</div>
      ))}
    </div>
  );
}

function GridBg() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(rgba(200,175,90,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,175,90,0.03) 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
      zIndex: 0,
    }} />
  );
}

const FEATURES = [
  { icon: "⚡", text: "DSA Challenges" },
  { icon: "🧠", text: "AI Code Review" },
  { icon: "📊", text: "Progress Tracker" },
  { icon: "🏆", text: "Leaderboards" },
  { icon: "🎯", text: "Mock Interviews" },
  { icon: "🔥", text: "Daily Streaks" },
];

export default function LeetCore() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();

  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 900;

  const handleNotify = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0c0f",
      color: "#e8e0c8",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background-color: #0b0c0f; }

        @keyframes floatCode {
          0%,100% { transform: translateY(0) rotate(-2deg); opacity:0.6; }
          50% { transform: translateY(-22px) rotate(2deg); opacity:1; }
        }
        @keyframes flipIn {
          0% { transform: rotateX(-90deg); }
          100% { transform: rotateX(0deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to { opacity:1; }
        }
        @keyframes scanline {
          0% { transform:translateY(-100%); }
          100% { transform:translateY(100vh); }
        }
        @keyframes btnPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(200,175,90,0.3); }
          50% { box-shadow:0 0 0 8px rgba(200,175,90,0); }
        }
        @keyframes shimmer {
          0% { background-position:-200% center; }
          100% { background-position:200% center; }
        }
        @keyframes colonBlink {
          0%,100% { opacity:1; }
          50% { opacity:0.3; }
        }

        .nav-link {
          font-size:0.65rem; letter-spacing:0.15em;
          color:rgba(232,224,200,0.4); text-decoration:none;
          font-family:'DM Mono',monospace; transition:color 0.2s; cursor:pointer;
        }
        .nav-link:hover { color:rgba(200,175,90,0.9); }

        .notify-btn {
          background:linear-gradient(135deg,#b8952a,#d4ac38);
          border:none; cursor:pointer; transition:all 0.25s;
          position:relative; overflow:hidden; color:#0a0900;
          font-family:'DM Mono',monospace; font-weight:600;
          letter-spacing:0.15em; border-radius:4px;
          white-space:nowrap; animation:btnPulse 2.5s ease infinite;
        }
        .notify-btn:hover {
          background:linear-gradient(135deg,#d4ac38,#e8c84a);
          transform:translateY(-1px);
          box-shadow:0 6px 24px rgba(200,175,60,0.35);
        }
        .notify-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          background-size:200% 100%; opacity:0; transition:opacity 0.3s;
        }
        .notify-btn:hover::after { opacity:1; animation:shimmer 1s ease infinite; }

        .feature-chip {
          display:flex; align-items:center; gap:6px;
          padding:0.4rem 0.85rem;
          border:1px solid rgba(200,175,90,0.15); border-radius:20px;
          background:rgba(200,175,90,0.04);
          font-size:0.62rem; letter-spacing:0.07em;
          color:rgba(232,224,200,0.55); font-family:'DM Mono',monospace;
          transition:all 0.25s; cursor:default;
        }
        .feature-chip:hover {
          border-color:rgba(200,175,90,0.4); background:rgba(200,175,90,0.08);
          color:rgba(232,224,200,0.9); transform:translateY(-2px);
        }

        .colon {
          font-size:2rem; font-weight:800; color:rgba(200,175,90,0.7);
          font-family:'Bebas Neue',sans-serif;
          animation:colonBlink 1s step-end infinite;
          align-self:flex-start; margin-top:4px; padding:0 2px;
        }
        .colon-sm {
          font-size:1.4rem; font-weight:800; color:rgba(200,175,90,0.7);
          font-family:'Bebas Neue',sans-serif;
          animation:colonBlink 1s step-end infinite;
          align-self:flex-start; margin-top:3px; padding:0 1px;
        }

        .big-text {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          font-family:'Bebas Neue',Impact,sans-serif;
          font-size:clamp(3.5rem,14vw,12rem);
          letter-spacing:0.04em; color:rgba(255,255,255,0.025);
          white-space:nowrap; pointer-events:none; user-select:none; z-index:0;
        }

        .dot-accent {
          display:inline-block; width:7px; height:7px;
          border-radius:50%; background:#c8af5a;
          margin:0 1px; vertical-align:middle;
        }

        /* Mobile nav menu */
        .mobile-menu {
          position:absolute; top:100%; left:0; right:0;
          background:#0e0f13;
          border-bottom:1px solid rgba(200,175,90,0.1);
          padding:1rem 1.5rem;
          display:flex; flex-direction:column; gap:0.75rem;
          z-index:20;
          animation:fadeUp 0.2s ease;
        }

        /* Responsive email row */
        .email-row {
          display:flex; align-items:center;
          border-radius:6px; overflow:hidden;
          background:rgba(255,255,255,0.02);
          backdropFilter:blur(8px);
          transition:border-color 0.3s, box-shadow 0.3s;
        }

        @media (max-width:599px) {
          .email-row { flex-direction:column; border-radius:8px; overflow:visible; gap:8px; background:transparent; border:none !important; box-shadow:none !important; }
          .email-input-wrap { width:100% !important; border-radius:6px !important; border:1px solid rgba(200,175,90,0.18) !important; background:rgba(255,255,255,0.03) !important; }
          .notify-btn { width:100%; justify-content:center; border-radius:6px !important; padding:0.85rem 1rem !important; font-size:0.65rem !important; }
        }
      `}</style>

      <GridBg />
      <CodeParticles />

      {/* Scanline */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to bottom,transparent,rgba(200,175,90,0.012),transparent)",
        animation: "scanline 8s linear infinite", pointerEvents: "none", zIndex: 1,
      }} />

      <div className="big-text">LEETCORE</div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "relative", zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "1rem 1.2rem" : "1.2rem 2.5rem",
        borderBottom: "1px solid rgba(200,175,90,0.08)",
        animation: "fadeIn 0.8s 0.1s both", opacity: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: isMobile ? "1.2rem" : "1.5rem", letterSpacing: "0.12em", color: "#e8e0c8" }}>LEET</span>
          <span className="dot-accent" />
          <span className="dot-accent" style={{ background: "rgba(200,175,90,0.4)", width: 5, height: 5 }} />
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: isMobile ? "1.2rem" : "1.5rem", letterSpacing: "0.12em", color: "#c8af5a" }}>CORE</span>
        </div>

        {/* Desktop nav info */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(200,175,90,0.65)" }}>
              +91 9057164791
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>/</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(200,175,90,0.65)" }}>
              mohitgodara816@gmail.com
            </span>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: "none", border: "1px solid rgba(200,175,90,0.2)", borderRadius: 4,
              padding: "6px 10px", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 16, height: 1.5, background: "rgba(200,175,90,0.6)", borderRadius: 2 }} />)}
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "1px solid rgba(200,175,90,0.2)", borderRadius: 4,
            padding: "5px 8px", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 3,
          }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 14, height: 1.5, background: "rgba(200,175,90,0.6)", borderRadius: 2 }} />)}
          </button>
        )}

        {/* Mobile dropdown */}
        {menuOpen && isMobile && (
          <div className="mobile-menu">
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(200,175,90,0.65)", letterSpacing: "0.08em" }}>+91 9057164791</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(200,175,90,0.65)", letterSpacing: "0.08em" }}>mohitgodara816@gmail.com</span>
            <div style={{ display: "flex", gap: "1.2rem", marginTop: "0.3rem" }}>
              {["PRIVACY", "TERMS", "CONTACT"].map(l => <span key={l} className="nav-link">{l}</span>)}
            </div>
          </div>
        )}
      </nav>

      {/* ── MAIN ── */}
      <main style={{
        position: "relative", zIndex: 5,
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: isMobile ? "2.5rem 1.2rem 4rem" : isTablet ? "3rem 2rem 5rem" : "4rem 2rem 5rem",
        minHeight: "calc(100vh - 70px)",
        justifyContent: "center",
        gap: 0,
      }}>

        {/* Days : Hours : Minutes */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          gap: isMobile ? "0.25rem" : "0.5rem",
          marginBottom: "0.3rem",
          animation: "fadeUp 0.7s 0.3s both", opacity: 0,
        }}>
          <StatUnit value={days} label="DAYS" isMobile={isMobile} />
          <span className={isMobile ? "colon-sm" : "colon"}>:</span>
          <StatUnit value={hours} label="HOUR" isMobile={isMobile} />
          <span className={isMobile ? "colon-sm" : "colon"}>:</span>
          <StatUnit value={minutes} label="MIN" isMobile={isMobile} />
        </div>

        {/* Flip seconds */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          margin: isMobile ? "1rem 0" : "1.5rem 0",
          animation: "fadeUp 0.7s 0.5s both", opacity: 0,
        }}>
          <FlipCard value={seconds} isMobile={isMobile} />
          <div style={{
            fontSize: "0.5rem", letterSpacing: "0.3em",
            color: "rgba(200,175,90,0.4)", fontFamily: "'DM Mono',monospace", marginTop: 8,
          }}>S E C O N D S</div>
        </div>

        {/* Tagline */}
        <div style={{
          animation: "fadeUp 0.7s 0.7s both", opacity: 0,
          textAlign: "center", maxWidth: isMobile ? "100%" : 520,
          padding: "0 0.5rem",
        }}>
          <h2 style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            color: "#e8e0c8", marginBottom: "0.5rem", letterSpacing: "0.01em",
          }}>
            We're launching something <span style={{ color: "#c8af5a" }}>epic</span>...
          </h2>
          <p style={{
            fontSize: isMobile ? "0.72rem" : "0.8rem", lineHeight: 1.75,
            color: "rgba(232,224,200,0.38)", fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
          }}>
            LeetCore is a next-gen student learning platform built for developers who want to master DSA, crack coding interviews, and level up through AI-powered challenges.
          </p>
        </div>

        {/* Feature chips */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0.5rem",
          justifyContent: "center",
          margin: isMobile ? "1.4rem 0" : "2rem 0",
          maxWidth: isMobile ? "100%" : 560,
          animation: "fadeUp 0.7s 0.9s both", opacity: 0,
          padding: "0 0.5rem",
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-chip">
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Email section */}
        <div style={{
          animation: "fadeUp 0.7s 1.1s both", opacity: 0,
          width: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.7rem",
          padding: "0 1rem",
        }}>
          <p style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.55rem",
            letterSpacing: "0.22em", color: "rgba(200,175,90,0.6)",
            textTransform: "uppercase", textAlign: "center",
          }}>
            Get early access — be the first to know
          </p>

          {!submitted ? (
            <div
              className="email-row"
              style={{
                border: `1px solid ${focused ? "rgba(200,175,90,0.4)" : "rgba(200,175,90,0.12)"}`,
                boxShadow: focused ? "0 0 20px rgba(200,175,60,0.12)" : "none",
                width: isMobile ? "100%" : "clamp(300px,42vw,440px)",
                maxWidth: "100%",
              }}
            >
              <div className="email-input-wrap" style={{ flex: 1, display: "flex" }}>
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    flex: 1, background: "transparent", border: "none",
                    color: "rgba(232,224,200,0.8)",
                    fontSize: isMobile ? "0.65rem" : "0.6rem",
                    letterSpacing: "0.15em",
                    fontFamily: "'DM Mono',monospace",
                    padding: isMobile ? "0.85rem 1rem" : "0.9rem 1.2rem",
                    width: "100%",
                  }}
                />
              </div>
              <button
                onClick={handleNotify}
                className="notify-btn"
                style={{
                  margin: isMobile ? 0 : 4,
                  fontSize: isMobile ? "0.65rem" : "0.62rem",
                  padding: isMobile ? "0.85rem 1.2rem" : "0.7rem 1.4rem",
                }}
              >
                NOTIFY ME
              </button>
            </div>
          ) : (
            <div style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
              letterSpacing: "0.18em", color: "#c8af5a",
              padding: "0.9rem 1.5rem",
              border: "1px solid rgba(200,175,90,0.3)", borderRadius: 6,
              background: "rgba(200,175,60,0.06)",
              animation: "fadeUp 0.4s ease", textAlign: "center",
            }}>
              ✓ &nbsp; YOU'RE ON THE WAITLIST
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex",
          flexWrap: isMobile ? "wrap" : "nowrap",
          gap: isMobile ? "1.2rem 2rem" : "3rem",
          justifyContent: "center",
          marginTop: isMobile ? "2rem" : "3.5rem",
          animation: "fadeUp 0.7s 1.3s both", opacity: 0,
        }}>
          {[["10K+", "Students Waiting"], ["500+", "Problems Ready"], ["50+", "Mock Tests"]].map(([num, label], i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: isMobile ? "1.5rem" : "1.8rem",
                color: "#c8af5a", letterSpacing: "0.06em", lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontSize: "0.5rem", letterSpacing: "0.15em",
                color: "rgba(232,224,200,0.28)", fontFamily: "'DM Mono',monospace", marginTop: 3,
              }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 5,
        borderTop: "1px solid rgba(200,175,90,0.07)",
        padding: isMobile ? "1rem 1.2rem" : "1rem 2.5rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "0.6rem" : 0,
        animation: "fadeIn 1s 1.5s both", opacity: 0,
      }}>
        <span style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.48rem",
          letterSpacing: "0.2em", color: "rgba(200,175,90,0.2)",
        }}>© 2026 LEETCORE — ALL RIGHTS RESERVED</span>
        <div style={{ display: "flex", gap: "1.2rem" }}>
          {["PRIVACY", "TERMS", "CONTACT"].map(l => (
            <span key={l} className="nav-link" style={{ fontSize: "0.48rem" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
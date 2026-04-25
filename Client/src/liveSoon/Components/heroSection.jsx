import { useState, useEffect, useRef } from "react";

function useTypewriterCycle(words, delay = 80) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");
  const [wordIdx, setWordIdx] = useState(0);
  const idx = useRef(0);

  useEffect(() => {
    const word = words[wordIdx];
    if (phase === "typing") {
      if (idx.current < word.length) {
        const t = setTimeout(() => {
          setDisplay(word.slice(0, idx.current + 1));
          idx.current++;
        }, delay);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 1800);
        return () => clearTimeout(t);
      }
    } else if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), 400);
      return () => clearTimeout(t);
    } else if (phase === "erasing") {
      if (idx.current > 0) {
        const t = setTimeout(() => {
          idx.current--;
          setDisplay(word.slice(0, idx.current));
        }, delay / 2);
        return () => clearTimeout(t);
      } else {
        setWordIdx((w) => (w + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [display, phase, wordIdx, words, delay]);

  return display;
}

function FloatingParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            background: "#f5e6a0",
            animation: `floatUp ${p.dur}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

function EclipseOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>
      <div
        className="absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(ellipse at 50% 30%, rgba(220,190,80,0.2) 0%, transparent 70%)",
          animation: "pulseRing 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(ellipse at 50% 25%, rgba(220,190,80,0.1) 0%, transparent 65%)",
          animation: "pulseRing 4s 1s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(ellipse at 50% 18%, rgba(240,210,90,0.65) 0%, rgba(200,160,50,0.35) 28%, transparent 62%)",
          filter: "blur(3px)",
          animation: "coronaBreath 5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: "radial-gradient(ellipse at 50% 22%, rgba(255,230,120,0.3) 0%, transparent 50%)",
          filter: "blur(6px)",
          animation: "coronaBreath 5s 0.8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          background: "radial-gradient(circle at 48% 52%, #06060a 60%, #100e04 100%)",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.95), 0 0 80px rgba(210,175,60,0.2)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 160,
          height: 2,
          top: "18%",
          left: "20%",
          background: "linear-gradient(90deg, transparent, rgba(255,240,160,0.35), transparent)",
          filter: "blur(1px)",
          animation: "flareMove 7s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function SpacedLetters() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ letterSpacing: "0.4em", fontFamily: "'Cormorant Garamond', 'Didot', Georgia, serif" }}
    >
      {"COMING SOON".split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} style={{ width: "2.5em", display: "inline-block" }} />
        ) : (
          <span
            key={i}
            className="inline-block"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 2rem)",
              fontWeight: 300,
              color: "#f5f0d8",
              animation: `letterReveal 0.6s ${0.05 * i + 0.3}s both ease-out`,
              opacity: 0,
            }}
          >
            {ch}
          </span>
        )
      )}
    </div>
  );
}

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const tagline = useTypewriterCycle(["SOMETHING EXTRAORDINARY", "A NEW EXPERIENCE", "WORTH THE WAIT"]);

  const handleNotify = () => {
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col overflow-hidden"
      style={{ background: "#07070b", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@200;300;400&display=swap');

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-30px) translateX(8px); opacity: 0.45; }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.7; }
        }
        @keyframes coronaBreath {
          0%, 100% { opacity: 0.85; transform: scale(1) translateY(0); }
          50% { opacity: 1; transform: scale(1.05) translateY(-5px); }
        }
        @keyframes flareMove {
          0%, 100% { opacity: 0.15; transform: scaleX(1); }
          50% { opacity: 0.6; transform: scaleX(1.5); }
        }
        @keyframes letterReveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes orbEntry {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes notifyPop {
          0% { transform: scale(0.96); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .notify-btn {
          background: linear-gradient(135deg, #b89a20, #d4b830);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          color: #0a0900 !important;
        }
        .notify-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .notify-btn:hover::after {
          opacity: 1;
          animation: shimmer 1.2s ease infinite;
        }
        .notify-btn:hover {
          background: linear-gradient(135deg, #cca820, #e8cc38);
          box-shadow: 0 0 28px rgba(210,185,50,0.45);
          transform: translateY(-1px);
        }

        input::placeholder { color: rgba(245,235,160,0.25); }
        input:focus { outline: none; }

        .success-msg {
          animation: notifyPop 0.5s ease forwards;
        }
      `}</style>

      <FloatingParticles />

      {/* Logo */}
      <div
        className="absolute top-7 left-8 tracking-[0.35em] text-xs"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 200,
          color: "rgba(245,230,150,0.7)",
          animation: "fadeIn 1.2s 0.2s both",
          opacity: 0,
        }}
      >
        LeetCore
      </div>

      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(210,185,60,0.35), transparent)",
          animation: "fadeIn 2s 1s both",
          opacity: 0,
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10" style={{ paddingBottom: "6rem" }}>
        <div style={{ animation: "orbEntry 1.2s 0.1s both ease-out", opacity: 0 }}>
          <EclipseOrb />
        </div>

        <div className="mt-[-2rem]">
          <SpacedLetters />
        </div>

        <div
          className="mt-6 h-5 flex items-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 200,
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "rgba(245,230,150,0.3)",
            animation: "fadeSlideUp 0.8s 1.4s both",
            opacity: 0,
          }}
        >
          {tagline}
          <span
            style={{
              display: "inline-block",
              width: 1,
              height: "0.75em",
              background: "rgba(220,195,70,0.75)",
              marginLeft: 2,
              animation: "cursorBlink 1s step-end infinite",
            }}
          />
        </div>

        <div
          className="my-10 w-px"
          style={{
            height: 40,
            background: "linear-gradient(to bottom, transparent, rgba(210,185,60,0.45), transparent)",
            animation: "fadeIn 0.8s 1.6s both",
            opacity: 0,
          }}
        />

        <div style={{ animation: "fadeSlideUp 0.8s 1.8s both", opacity: 0 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              color: "rgba(220,190,70,0.9)",
              textAlign: "center",
              marginBottom: "1.2rem",
            }}
          >
            GET NOTIFIED WHEN IT'S READY
          </p>

          {!submitted ? (
            <div
              className="flex items-center"
              style={{
                border: `1px solid ${focused ? "rgba(210,185,60,0.55)" : "rgba(245,230,150,0.12)"}`,
                borderRadius: 50,
                overflow: "hidden",
                background: "rgba(245,230,100,0.04)",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                boxShadow: focused ? "0 0 22px rgba(210,185,50,0.18)" : "none",
                width: "clamp(280px, 40vw, 360px)",
              }}
            >
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "rgba(245,235,170,0.75)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  padding: "0.9rem 1.4rem",
                }}
              />
              <button
                onClick={handleNotify}
                className="notify-btn"
                style={{
                  margin: 4,
                  borderRadius: 50,
                  padding: "0.65rem 1.4rem",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                NOTIFY ME
              </button>
            </div>
          ) : (
            <div
              className="success-msg text-center"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "rgba(230,210,120,0.9)",
                padding: "1rem 2rem",
                border: "1px solid rgba(210,185,60,0.3)",
                borderRadius: 50,
                background: "rgba(210,185,50,0.07)",
              }}
            >
              ✦ &nbsp; YOU'RE ON THE LIST &nbsp; ✦
            </div>
          )}
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(210,185,60,0.2), transparent)",
          animation: "fadeIn 2s 2s both",
          opacity: 0,
        }}
      />
      <div
        className="absolute bottom-6 left-0 right-0 flex justify-center"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 200,
          fontSize: "0.5rem",
          letterSpacing: "0.4em",
          color: "rgba(245,230,150,0.12)",
          animation: "fadeIn 1s 2.2s both",
          opacity: 0,
        }}
      >
        © 2026 SIGNATURE
      </div>
    </div>
  );
}
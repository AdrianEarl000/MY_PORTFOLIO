"use client";

import { useEffect, useState, useRef } from "react";

interface PageLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

export default function PageLoader({
  duration = 1800,
  onComplete,
}: PageLoaderProps) {
  const [phase, setPhase] = useState<"enter" | "idle" | "exit">("enter");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Phase 1: enter → idle after 500ms
    const enterTimer = setTimeout(() => setPhase("idle"), 500);

    // Smooth progress animation using rAF
    const animateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const raw = Math.min(elapsed / (duration * 0.85), 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - raw, 3);
      const next = Math.round(eased * 95);
      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(animateProgress);
      }
    };
    rafRef.current = requestAnimationFrame(animateProgress);

    // Phase 3: exit → unmount
    const exitTimer = setTimeout(() => {
      setProgress(100);
      setPhase("exit");
    }, duration - 300);

    const doneTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  return (
    <>
      <style>{`
        @keyframes ae-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.85; }
          94% { opacity: 1; }
          97% { opacity: 0.9; }
          98% { opacity: 1; }
        }

        @keyframes ae-glow-pulse {
          0%, 100% {
            text-shadow:
              0 0 20px var(--accent-primary-glow),
              0 0 40px var(--accent-primary-glow),
              0 0 80px var(--accent-primary-glow);
          }
          50% {
            text-shadow:
              0 0 10px var(--accent-primary-glow),
              0 0 20px var(--accent-primary-glow),
              0 0 50px var(--accent-primary-glow);
          }
        }

        @keyframes ae-ring-pulse {
          0%, 100% {
            box-shadow:
              0 0 0 0px color-mix(in srgb, var(--accent-primary) 60%, transparent),
              0 0 30px 4px color-mix(in srgb, var(--accent-primary) 20%, transparent);
          }
          50% {
            box-shadow:
              0 0 0 8px color-mix(in srgb, var(--accent-primary) 0%, transparent),
              0 0 50px 8px color-mix(in srgb, var(--accent-primary) 10%, transparent);
          }
        }

        @keyframes ae-bar-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes ae-enter {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ae-exit-up {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
            text-shadow:
              0 0 20px var(--accent-primary-glow),
              0 0 40px var(--accent-primary-glow),
              0 0 80px var(--accent-primary-glow);
          }
          30% {
            opacity: 1;
            transform: scale(1.04) translateY(-4px);
            text-shadow:
              0 0 30px var(--accent-primary-glow),
              0 0 70px var(--accent-primary-glow),
              0 0 120px var(--accent-primary-glow);
          }
          100% {
            opacity: 0;
            transform: scale(0.98) translateY(-20px);
            text-shadow:
              0 0 0px var(--accent-primary-glow);
          }
        }

        @keyframes ae-overlay-exit {
          0% { opacity: 1; }
          60% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes ae-underline-expand {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }

        .ae-overlay {
          animation: ae-overlay-exit 300ms ease-in forwards;
        }

        .ae-logo-enter {
          animation: ae-enter 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ae-logo-idle {
          animation:
            ae-flicker 8s ease-in-out infinite,
            ae-glow-pulse 2.5s ease-in-out infinite;
        }

        .ae-logo-exit {
          animation: ae-exit-up 350ms cubic-bezier(0.4, 0, 0.8, 0.2) forwards;
        }

        .ae-ring {
          animation: ae-ring-pulse 2.5s ease-in-out infinite;
        }
      `}</style>

      <div
        className={phase === "exit" ? "ae-overlay" : ""}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-base)",
          pointerEvents: phase === "exit" ? "none" : "all",
        }}
      >
        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Pulse ring container */}
          <div
            className={phase === "idle" ? "ae-ring" : ""}
            style={{
              borderRadius: "50%",
              padding: "2px",
            }}
          >
            {/* AE Logo */}
            <div
              className={
                phase === "enter"
                  ? "ae-logo-enter"
                  : phase === "idle"
                  ? "ae-logo-idle"
                  : "ae-logo-exit"
              }
              style={{
                fontFamily: "var(--font-display, 'Georgia', serif)",
                fontSize: "clamp(5rem, 14vw, 9rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                lineHeight: 1,
                userSelect: "none",
                textShadow:
                  phase === "enter"
                    ? "none"
                    : `0 0 20px var(--accent-primary-glow), 0 0 40px var(--accent-primary-glow), 0 0 80px var(--accent-primary-glow)`,
                transition: "text-shadow 400ms ease",
              }}
            >
              AE
            </div>
          </div>

          {/* Underline accent */}
          <div
            style={{
              width: "clamp(3rem, 8vw, 5.5rem)",
              height: "2px",
              backgroundColor: "var(--accent-primary)",
              transformOrigin: "center",
              animation:
                phase !== "enter"
                  ? "ae-underline-expand 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards"
                  : "none",
              transform: "scaleX(0)",
              opacity: 0,
              boxShadow:
                "0 0 8px var(--accent-primary-glow), 0 0 16px var(--accent-primary-glow)",
            }}
          />

          {/* Progress bar */}
          <div
            style={{
              width: "clamp(7rem, 18vw, 12rem)",
              height: "2px",
              backgroundColor: `color-mix(in srgb, var(--accent-secondary) 20%, transparent)`,
              borderRadius: "999px",
              overflow: "hidden",
              opacity: phase === "enter" ? 0 : 1,
              transition: "opacity 400ms ease 200ms",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: `linear-gradient(
                  90deg,
                  var(--accent-secondary),
                  color-mix(in srgb, var(--accent-secondary) 70%, var(--accent-primary)),
                  var(--accent-secondary)
                )`,
                backgroundSize: "200% 100%",
                animation: "ae-bar-shimmer 1.5s linear infinite",
                borderRadius: "999px",
                transition: "width 80ms linear",
                boxShadow: "0 0 6px var(--accent-primary-glow)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
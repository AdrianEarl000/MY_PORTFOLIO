"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";

// ─── Theme definitions ────────────────────────────────────────────────────────
export type ThemeMode = "neon" | "retro";

export interface ThemeTokens {
  // Backgrounds
  bgBase: string;
  bgSurface: string;
  bgElevated: string;
  bgOverlay: string;

  // Accents
  accentPrimary: string;
  accentSecondary: string;
  accentPrimaryGlow: string;
  accentSecondaryGlow: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;

  // Borders
  borderSubtle: string;
  borderAccent: string;

  // Effects
  glowPrimary: string;
  glowSecondary: string;
  scanlines: string;
  noise: string;

  // Typography
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
}

const THEMES: Record<ThemeMode, ThemeTokens> = {
  neon: {
    bgBase: "#0D0D12",
    bgSurface: "#1A1A24",
    bgElevated: "#22223A",
    bgOverlay: "rgba(13,13,18,0.85)",

    accentPrimary: "#7C6AF7",
    accentSecondary: "#2DD4BF",
    accentPrimaryGlow: "rgba(124,106,247,0.35)",
    accentSecondaryGlow: "rgba(45,212,191,0.35)",

    textPrimary: "#F0F0FF",
    textSecondary: "#A0A0C0",
    textMuted: "#505070",
    textAccent: "#7C6AF7",

    borderSubtle: "rgba(255,255,255,0.07)",
    borderAccent: "rgba(124,106,247,0.4)",

    glowPrimary: "0 0 40px rgba(124,106,247,0.3), 0 0 80px rgba(124,106,247,0.1)",
    glowSecondary: "0 0 40px rgba(45,212,191,0.3), 0 0 80px rgba(45,212,191,0.1)",
    scanlines: "none",
    noise: "none",

    fontDisplay: "'Syne', sans-serif",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },

  retro: {
    bgBase: "#080C0C",
    bgSurface: "#0D1512",
    bgElevated: "#121E1A",
    bgOverlay: "rgba(8,12,12,0.9)",

    accentPrimary: "#00FF9C",
    accentSecondary: "#00C8B8",
    accentPrimaryGlow: "rgba(0,255,156,0.2)",
    accentSecondaryGlow: "rgba(0,200,184,0.2)",

    textPrimary: "#D4FFE8",
    textSecondary: "#70AA88",
    textMuted: "#2A4A38",
    textAccent: "#00FF9C",

    borderSubtle: "rgba(0,255,156,0.1)",
    borderAccent: "rgba(0,255,156,0.3)",

    glowPrimary: "0 0 20px rgba(0,255,156,0.15), 0 0 60px rgba(0,255,156,0.05)",
    glowSecondary: "0 0 20px rgba(0,200,184,0.15)",
    scanlines: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
    noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",

    fontDisplay: "'Share Tech Mono', monospace",
    fontBody: "'DM Sans', sans-serif",
    fontMono: "'Share Tech Mono', monospace",
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeCtx {
  mode: ThemeMode;
  tokens: ThemeTokens;
  toggle: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  mode: "neon",
  tokens: THEMES.neon,
  toggle: () => {},
  isTransitioning: false,
});

export const useTheme = () => useContext(ThemeContext);

// ─── CSS variable injection ───────────────────────────────────────────────────
function injectVars(tokens: ThemeTokens) {
  const root = document.documentElement;
  const map: Record<string, string> = {
    "--bg-base": tokens.bgBase,
    "--bg-surface": tokens.bgSurface,
    "--bg-elevated": tokens.bgElevated,
    "--bg-overlay": tokens.bgOverlay,
    "--accent-primary": tokens.accentPrimary,
    "--accent-secondary": tokens.accentSecondary,
    "--accent-primary-glow": tokens.accentPrimaryGlow,
    "--accent-secondary-glow": tokens.accentSecondaryGlow,
    "--text-primary": tokens.textPrimary,
    "--text-secondary": tokens.textSecondary,
    "--text-muted": tokens.textMuted,
    "--text-accent": tokens.textAccent,
    "--border-subtle": tokens.borderSubtle,
    "--border-accent": tokens.borderAccent,
    "--glow-primary": tokens.glowPrimary,
    "--glow-secondary": tokens.glowSecondary,
    "--font-display": tokens.fontDisplay,
    "--font-body": tokens.fontBody,
    "--font-mono": tokens.fontMono,
  };
  Object.entries(map).forEach(([k, v]) => root.style.setProperty(k, v));
}

// ─── Glitch overlay ───────────────────────────────────────────────────────────
function GlitchOverlay({ active, nextMode }: { active: boolean; nextMode: ThemeMode }) {
  if (!active) return null;
  const isRetro = nextMode === "retro";
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          pointerEvents: "none",
          animation: "glitchFade 0.75s ease forwards",
        }}
      />
      {/* RGB split layers */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99998,
          pointerEvents: "none",
          background: isRetro ? "rgba(0,255,156,0.08)" : "rgba(124,106,247,0.08)",
          animation: "glitchShiftR 0.75s ease forwards",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99997,
          pointerEvents: "none",
          background: isRetro ? "rgba(0,200,184,0.06)" : "rgba(45,212,191,0.06)",
          animation: "glitchShiftB 0.75s ease forwards",
          mixBlendMode: "screen",
        }}
      />
      <style>{`
        @keyframes glitchFade {
          0%   { background: transparent; }
          12%  { background: rgba(255,255,255,0.04); }
          18%  { background: rgba(255,255,255,0.0); clip-path: inset(30% 0 40% 0); }
          24%  { background: rgba(255,255,255,0.06); clip-path: inset(60% 0 10% 0); }
          32%  { background: rgba(255,255,255,0.02); clip-path: inset(0); }
          50%  { background: rgba(0,0,0,0.6); }
          100% { background: transparent; }
        }
        @keyframes glitchShiftR {
          0%   { transform: translate(0,0); opacity: 0; }
          20%  { transform: translate(-4px, 2px); opacity: 1; }
          40%  { transform: translate(3px, -1px); opacity: 0.7; }
          60%  { transform: translate(-2px, 0); opacity: 0.4; }
          100% { transform: translate(0,0); opacity: 0; }
        }
        @keyframes glitchShiftB {
          0%   { transform: translate(0,0); opacity: 0; }
          20%  { transform: translate(4px, -2px); opacity: 0.8; }
          40%  { transform: translate(-3px, 1px); opacity: 0.5; }
          60%  { transform: translate(1px, 0); opacity: 0.3; }
          100% { transform: translate(0,0); opacity: 0; }
        }
      `}</style>
    </>
  );
}

// ─── Scanlines / noise layer (retro only) ─────────────────────────────────────
function RetroEffectLayer({ active }: { active: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: THEMES.retro.scanlines,
          opacity: 0.5,
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Subtle flicker */}
      {active && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "crtFlicker 8s infinite",
            background: "transparent",
          }}
        />
      )}
      <style>{`
        @keyframes crtFlicker {
          0%,96%,100% { opacity: 1; }
          97% { opacity: 0.93; }
          98% { opacity: 1; }
          99% { opacity: 0.96; }
        }
      `}</style>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("neon");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextMode, setNextMode] = useState<ThemeMode>("retro");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inject initial vars
  useEffect(() => {
    injectVars(THEMES.neon);
    // Preload retro fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  const toggle = useCallback(() => {
    if (isTransitioning) return;
    const target: ThemeMode = mode === "neon" ? "retro" : "neon";
    setNextMode(target);
    setIsTransitioning(true);

    // After glitch peaks (350ms), swap vars
    timerRef.current = setTimeout(() => {
      setMode(target);
      injectVars(THEMES[target]);
      document.documentElement.setAttribute("data-theme", target);
    }, 350);

    // Clear transition flag
    timerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [mode, isTransitioning]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, tokens: THEMES[mode], toggle, isTransitioning }}
    >
      {/* Global transition style */}
      <style>{`
        *, *::before, *::after {
          transition-property: background-color, border-color, color, box-shadow, opacity;
          transition-duration: 0.55s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* Exclude transforms and layout from the blanket transition */
        [data-no-theme-transition], canvas, svg {
          transition: none !important;
        }
      `}</style>

      {children}

      {/* Global effects */}
      <RetroEffectLayer active={mode === "retro"} />
      <GlitchOverlay active={isTransitioning} nextMode={nextMode} />
    </ThemeContext.Provider>
  );
}
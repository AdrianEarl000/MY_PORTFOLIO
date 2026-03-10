import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#070708",
          2: "#0d0d0f",
          3: "#111113",
        },
        accent: {
          DEFAULT: "#7c6af7",
          2: "#a78bfa",
        },
        teal: "#2dd4bf",
        amber: "#f59e0b",
        surface: "rgba(255,255,255,0.04)",
        "surface-2": "rgba(255,255,255,0.07)",
        border: "rgba(255,255,255,0.08)",
        "border-2": "rgba(255,255,255,0.12)",
        txt: {
          DEFAULT: "#f0f0f2",
          2: "#8a8a96",
          3: "#555560",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "float-1": "float1 8s ease-in-out infinite",
        "float-2": "float2 10s ease-in-out infinite",
        "float-3": "float3 12s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        "scroll-line": "scrollLine 2s ease-in-out infinite",
      },
      keyframes: {
        float1: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-30px, 40px) scale(1.05)" },
        },
        float2: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px, -30px) scale(1.08)" },
        },
        float3: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-20px, 20px)" },
        },
        pulse2: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.85)" },
        },
        scrollLine: {
          "0%,100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

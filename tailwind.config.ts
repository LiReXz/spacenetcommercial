import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030509",
        abyss: "#060a14",
        night: "#0a1020",
        graphite: "#111827",
        steel: "#1e293b",
        mist: "#94a3b8",
        frost: "#e2e8f0",
        pulse: "#22d3ee",
        ion: "#38bdf8",
        deep: "#0e7490",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "orbit-slow": "orbitSlow 60s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        "drift": "drift 20s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        orbitSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(2%, -3%, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

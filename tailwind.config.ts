import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bento: {
          canvas: "#09090b",
          canvas2: "#0c0c0e",
          void: "#0a0a0a",
          surface: "#141416",
          tile: "#18181b",
          ink: "#f4f4f5",
          muted: "#a1a1aa",
          line: "#3f3f46",
          accent: "#c45c3e",
          accentSoft: "#2a1814",
          sage: "#94a3b8",
          sageSoft: "#1e293b",
        },
        w95: {
          desktop: "#008080",
          desktop2: "#069a9a",
          face: "#c0c0c0",
          white: "#ffffff",
          shadow: "#404040",
          highlight: "#dfdfdf",
          black: "#0a0a0a",
          title: "#000080",
          titleHi: "#1084d0",
          navy: "#000080",
          ink: "#000000",
          muted: "#404040",
          link: "#0000ee",
          tray: "#c0c0c0",
        },
      },
      fontFamily: {
        sans: ["Tahoma", "Segoe UI", "MS Sans Serif", "sans-serif"],
        win: ["Tahoma", "Segoe UI", "MS Sans Serif", "sans-serif"],
        bento: ["var(--font-bento)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        bento: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.45)",
        "bento-lg": "0 1px 0 rgba(255,255,255,0.06) inset, 0 16px 48px rgba(0,0,0,0.55)",
        bentoTile: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        bentoGlass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        w95out:
          "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #404040, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #0a0a0a",
        w95in:
          "inset 1px 1px 0 #404040, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #0a0a0a, inset -2px -2px 0 #dfdfdf",
        w95btn:
          "inset -1px -1px 0 #404040, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #0a0a0a, inset 2px 2px 0 #dfdfdf",
        w95btnPress:
          "inset 1px 1px 0 #404040, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #0a0a0a, inset -2px -2px 0 #dfdfdf",
        w95drop: "2px 2px 0 rgba(0,0,0,0.35)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "win-pop": "winPop 0.28s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        winPop: {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(6px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

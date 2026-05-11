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
          canvas: "#f3f0ea",
          canvas2: "#ebe6dd",
          tile: "#fffcf7",
          ink: "#14120f",
          muted: "#5c5852",
          line: "#d4cec3",
          accent: "#c45c3e",
          accentSoft: "#f0d4cc",
          sage: "#5a6f56",
          sageSoft: "#dce5da",
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
        bento: "0 1px 2px rgba(20, 18, 15, 0.04), 0 8px 24px rgba(20, 18, 15, 0.06)",
        "bento-lg": "0 2px 4px rgba(20, 18, 15, 0.04), 0 16px 40px rgba(20, 18, 15, 0.08)",
        bentoTile: "inset 0 1px 0 rgba(255, 255, 255, 0.65)",
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

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fintech-utility palette. Ink = near-black navy, brand = signal blue,
        // accents map to decision states.
        ink: {
          DEFAULT: "#0b1220",
          soft: "#1a2333",
          muted: "#5b6472",
        },
        brand: {
          DEFAULT: "#1657ff",
          dark: "#0f3fce",
          soft: "#eaf0ff",
        },
        go: { DEFAULT: "#0f9d58", soft: "#e7f6ee" },
        warn: { DEFAULT: "#c77700", soft: "#fbf1de" },
        stop: { DEFAULT: "#d1343b", soft: "#fbe9ea" },
        surface: {
          DEFAULT: "#ffffff",
          sunken: "#f5f7fb",
          line: "#e4e8f0",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,0.04), 0 8px 24px rgba(11,18,32,0.06)",
        pop: "0 12px 40px rgba(11,18,32,0.14)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;

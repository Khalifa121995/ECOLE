import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1116",
        surface: "#161B22",
        surface2: "#1E2530",
        line: "#2A3140",
        text: "#E6EDF3",
        muted: "#8B97A8",
        signal: "#4FD1C5",
        alert: "#F2B705",
        danger: "#E5533D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
export default config;

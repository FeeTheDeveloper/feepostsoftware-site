import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        cyan: "var(--color-cyan)",
        magenta: "var(--color-magenta)",
        violet: "var(--color-violet)",
        copy: "var(--color-copy)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        cyan: "0 0 30px rgba(0, 229, 255, 0.3)",
        magenta: "0 0 30px rgba(255, 0, 170, 0.22)"
      },
      backgroundImage: {
        "hero-aurora":
          "radial-gradient(circle at 20% 20%, rgba(0, 229, 255, 0.18), transparent 32%), radial-gradient(circle at 80% 18%, rgba(255, 0, 170, 0.14), transparent 28%), radial-gradient(circle at 50% 70%, rgba(109, 44, 255, 0.16), transparent 38%)"
      }
    }
  },
  plugins: []
};

export default config;

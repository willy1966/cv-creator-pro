import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        navy: "#0F172A",
        accent: "#10B981",
        surface: "#F8FAFC",
        ink: "#1E293B",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(15,23,42,.05)",
        lift: "0 8px 30px rgba(15,23,42,.12)",
      },
    },
  },
  plugins: [],
};
export default config;

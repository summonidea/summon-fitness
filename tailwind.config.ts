import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f6f7f3",
        ink: "#132a2a",
        accent: "#0f766e",
        power: "#d9480f",
        agility: "#2563eb",
        speed: "#0d9488",
        technique: "#0f766e",
        mobility: "#7c3aed",
        conditioning: "#b45309"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(19, 42, 42, 0.08)"
      },
      fontFamily: {
        sans: ["\"Avenir Next Condensed\"", "\"Franklin Gothic Medium\"", "\"Trebuchet MS\"", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

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
        faham: {
          warm: "#FAFAF7",
          charcoal: "#242424",
          green: "#285943",
          line: "#E5E1D8",
          muted: "#6E6A61"
        }
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        paper: "0 18px 45px rgba(36, 36, 36, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

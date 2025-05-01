/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      colors: {
        // Main dark background of the dashboard
        background: "#0D0D0D",

        // Card containers and panels
        card: "#1C1C1C",

        // Neon green used in logo and highlight text
        primary: "#A7FF41",

        // Soft purple used in bar charts and tab buttons
        secondary: "#D1A5FF",

        // Light blue accent (e.g., border lines, chart edges)
        accent: "#82D9FF",

        // Yellow from pie chart (e.g., revenue section)
        yellow: "#FFD66B",

        // Pink from pie chart (e.g., orders or views)
        pink: "#FF70A6",

        // Primary text color
        text: "#FFFFFF",

        // Subdued gray text (e.g., subtitles, labels)
        muted: "#AFAFAF",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

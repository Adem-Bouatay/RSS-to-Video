import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./remotion/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#003049",
        secondary: "#EDEDED",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        spinner: "spinner 1.2s linear infinite",
      },
      keyframes: {
        spinner: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.15",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".custom-scrollbar-primary": {
          "&::-webkit-scrollbar": {
            background: "transparent",
            width: "7px",
            height: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(0, 48, 73,0.9)",
            borderRadius: "7px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgb(0, 48, 73,0.8)",
            borderRadius: "7px",
          },
          "&::-webkit-scrollbar-thumb:active": {
            background: "rgb(0, 48, 73,0.8)",
            borderRadius: "7px",
          },
          "&::-webkit-scrollbar-button": {
            background: "transparent",
            height: "6px",
          },
        },
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            background: "transparent",
            width: "7px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(237, 237, 237, 0.7)",
            borderRadius: "7px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgb(237, 237, 237, 0.5)",
            borderRadius: "7px",
          },
          "&::-webkit-scrollbar-thumb:active": {
            background: "rgb(237, 237, 237, 0.5)",
            borderRadius: "7px",
          },
          "&::-webkit-scrollbar-button": {
            background: "transparent",
            height: "6px",
          },
        },
      });
    }),
  ],
} satisfies Config;

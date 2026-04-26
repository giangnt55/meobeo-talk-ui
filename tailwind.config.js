/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ee7c2b",
        "deep-espresso": "#2D241E",
        "warm-taupe": "#897261",
        "background-light": "#fcfaf8",
        "background-dark": "#1a140f",
        "text-main": "#2D241E",
        "text-muted": "#897261",
        "divider": "#f1edea",
        "sage": "#9CA998",
      },
      fontFamily: {
        "display": ["Epilogue", "sans-serif"],
        "sans": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

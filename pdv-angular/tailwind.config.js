/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-blue": "#005286",
        "brand-yellow": "#feca0a",
        "brand-orange": "#fab400",
        "brand-selection": "#fab400",
        "background-light": "#f3f4f6",
        "background-dark": "#003d63",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

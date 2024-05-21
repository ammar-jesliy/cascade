/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amaranth: ['Amaranth', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        primary: "#0E0835",
        secondary: "#554B4B",
        accent2: "#D0CAF7",
        accent1: "#5E4AE3",
        bg: "#EFEDFC"
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "2rem",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#f0f7f2",
          100: "#e3efe6",
          200: "#c7dfcd",
          300: "#a9cfb4",
          400: "#8eb69b", // #8EB69B
          500: "#6ea887",
          600: "#4f8c72",
          700: "#3a6c59",
          800: "#2a5043",
          900: "#1b372e",
        },
        base: {
          900: "#051F20",
          800: "#0B2B26",
          700: "#163832",
          100: "#DAF1DE",
        },
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

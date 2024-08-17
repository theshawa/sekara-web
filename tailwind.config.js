import * as Colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        slate: Colors.slate,
        brand: { dark: Colors.cyan[500], DEFAULT: Colors.cyan[400] },
        transparent: Colors.transparent,
      },
    },
  },
  plugins: [],
};

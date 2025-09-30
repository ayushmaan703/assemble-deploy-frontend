/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ASSgreen: "#0CFFA7",
        ASSblue: "#79A9F8",
        ASSred: "#E24040",
        ASSyellow: "#EDFC27",
      },
      fontFamily: {
        arial: ['Arial', 'Source Sans Pro'],
        arialrounded: ['ArialRoundedMTBold', 'sans-serif'],
        bebas: ['BebasNeue', 'sans-serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
        agency: ['AgencyFB', 'sans-serif'],
      },
      keyframes: {
        trumble: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-1px)' },
        },
      },
      animation: {
        trumble: 'trumble 0.6s ease-in-out',

      },
    },
  },
  plugins: [],
};

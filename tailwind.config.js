/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      customNunito:["Nunito", "sans-serif"],
      
      popping:["Poppins", "sans-serif"],
    },  
    extend: {
      colors: {
        "Auth_maun_color" : "#11175D"
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
  
}
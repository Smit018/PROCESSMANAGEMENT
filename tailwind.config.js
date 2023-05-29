/** @type {import('tailwindcss').Config} */
module.exports = {

  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#F4F4F4'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')

  ],
}

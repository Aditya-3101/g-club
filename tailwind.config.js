/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        'roboto':["Roboto Condensed", "sans-serif"],
        'prism':["Tilt Prism", "sans-serif"],
        'poppins':["Poppins","sans-serif"],
        'poppins':["Poppins","sans-serif"],
        'Chakra':["Chakra Petch", "sans-serif"]
      }
    },
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar":{
          display:"none"
        },
        ".no-scrollbar":{
          "-ms-overflow-style":"none",
          "scrollbar-width":"none"
        }
      }

      addUtilities(newUtilities)
    }
  ],
}


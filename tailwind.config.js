/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
      },

      keyframes: {
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        "slide-up": "slide-up 0.8s ease-out forwards",
      },
    },
  },
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: '#556B2F',
        limeGreen: '#32CD32',
        Charcoal: '#333333', 
        lime: '#32CD32', 
        oliveGreen: '#6B8E23',
        warm: '#FFF8E1'
      },
      fontFamily: {
        'merriweather': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [require('daisyui'),],
}
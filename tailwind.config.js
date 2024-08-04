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
      fontSize: {18:'18px',
        20:'20px',
        22:'22px',
        24:'24px',
        26:'26px',
        28:'28px',
        30:'30px',
        32:'32px',
        34:'34px',
        36:'36px',
      }
    },
  },
  plugins: [require('daisyui'),],
}
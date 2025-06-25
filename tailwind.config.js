/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1536px',
      // => @media (min-width: 1650px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'register-bg': "url('/assets/images/registerBg.svg')"
      },
      colors: {
        purple: '#b677f1',
        primary: '#b677f1',
        secondary: '#0E1B56',
        orangeMain: '#FF876C',
        blueMain: '#01062B',
        gray: '#777777',
        lightGray: "#C4C4C4",
        glassGray: '#F1F4F5',
        glassDark: '#F9F9FF',
        bordered: '#D5D5D5',
        darkBlue: '#020941',
        lightBg:'#FCFCFC',
        dark:'#202020',
        darkPurple:'#813EC5'
      },
      fontFamily: {
        hind_madurai: ['var(--font-hind_madurai)'],
        poppins: ['var(--font-poppins)'],
      }
    },
  },
  plugins: [],
};

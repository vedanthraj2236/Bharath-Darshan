/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#E8830F',
          50: '#FEF3E4',
          100: '#FCE3C2',
          400: '#F0972B',
          500: '#E8830F',
          600: '#C66C0A',
        },
        maroon: {
          DEFAULT: '#7A1620',
          50: '#FBEAEC',
          100: '#F0C7CC',
          600: '#651019',
          700: '#560D15',
          900: '#3A080E',
        },
        gold: {
          DEFAULT: '#B8860B',
          100: '#F3E3B8',
          300: '#D9B24C',
          500: '#B8860B',
        },
        ivory: {
          DEFAULT: '#FBF3E7',
          50: '#FFFCF7',
          100: '#FBF3E7',
        },
        ink: {
          DEFAULT: '#2B1810',
          700: '#3D251A',
          500: '#5A3B2C',
        },
      },
      fontFamily: {
        heading: ['Rajdhani', 'sans-serif'],
        body: ['Mukta', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


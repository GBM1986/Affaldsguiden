/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        depone: '#2B2C2E',
        smatBraendbart: '#6666CC',
        textil: '#951C3F',
        tra: '#7F652B',
        elektronik: '#F18700',
        pap: '#C4A167',
        glas: '#28A745',
        natur: '#06682D',
        papir: '#017EC0',
        plastGummi: '#660099',
        deepGreen: '#1A3636',
        forrestGreen: '#119B1E',
        mossGreen: '#677D6A',
        lightGreen: '#D8EADB',
        kaki: '#D6BD98',
        darkGrey: '#707070',
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'heading-1': '36px',
        'heading-2': '28px',
        'heading-3': '24px',
        'heading-4': '20px',
        'body': '16px',
      },
    },
  },
  plugins: [],
}

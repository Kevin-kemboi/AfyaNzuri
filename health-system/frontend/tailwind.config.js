module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          600: '#1aa7ec',
          700: '#0e7490',
        },
        'mint-green': {
          300: '#a3e4d7',
          200: '#e6fffa',
        },
        coral: {
          500: '#ff6f61',
          600: '#e65b50',
        },
        navy: {
          700: '#2d3748',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
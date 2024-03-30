module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['Noto Sans', 'sans-serif'],
      },
      colors:{
        'dark-green': 'rgb(18, 55, 42)',
        'lighter-green': 'rgb(67, 104, 80)',
        'sage': 'rgb(173, 188, 159)',
        'cream': 'rgb(251, 250, 218)'
      }
    },
  },
  plugins: [],
}
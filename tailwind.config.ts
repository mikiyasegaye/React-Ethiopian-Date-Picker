import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ethiopian-green': '#009639',
        'ethiopian-yellow': '#FEDD00',
        'ethiopian-red': '#DA121A',
        'ethiopian-blue': '#006C93',
      },
      fontFamily: {
        'amharic': ['Noto Sans Ethiopic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

export default config 
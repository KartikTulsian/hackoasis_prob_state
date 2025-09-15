/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPurple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          300: '#d6bbff',
          500: '#7c3aed',
          700: '#6d28d9'
        }
      }
    },
  },
  plugins: [],
}

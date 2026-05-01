/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22C55E',
        secondary: '#0EA5E9',
        accent: '#F97316',
        background: '#0F172A',
        surface: '#1E293B',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
      }
    },
  },
  plugins: [],
}
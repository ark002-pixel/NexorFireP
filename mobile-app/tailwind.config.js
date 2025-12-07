/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626", // Primary Action
          dark: "#0F172A", // Sidebar/Header
          light: "#F1F5F9", // Background
          surface: "#FFFFFF",
          text: "#1E293B",
          muted: "#64748B"
        }
      }
    },
  },
  plugins: [],
}

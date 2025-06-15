/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',       // Main background
        secondary: '#2E2E2E',     // Card background or surfaces
        light: {
          100: '#F5F5F5',         // Lightest — for page background, inputs
          200: '#D4D4D4',         // Lighter text, borders
          300: '#A3A3A3',         // Body text or icon placeholders
        },
        dark: {
          100: '#737373',         // Darker text or secondary buttons
          200: '#404040',         // Headers, nav bar, modals
        },
        accent: '#BEBEBE'         // Use very sparingly (icons, CTA borders)
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agriculture: {
          green: {
            50: '#f0fdf4',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
          },
          amber: {
            50: '#fffbeb',
            500: '#f59e0b',
            600: '#d97706',
          },
          brown: {
            800: '#92400e',
            900: '#78350f',
          }
        }
      },
    },
  },
  plugins: [],
}

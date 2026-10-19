/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3a7b8f",
          secondary: "#5bc0de",
          accent1: "#ed6c4f",
          accent2: "#ffbd4f",
          dark: "#1e293b",
          light: "#f8fafc"
        }
      },
      fontFamily: {
        sans: ["'Clarity City'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        stylistic: ["'Playwrite AR'", "cursive", "sans-serif"]
      },
      backgroundImage: {
        'brand-gradient-1': "linear-gradient(135deg, #3a7b8f 0%, #5bc0de 100%)",
        'brand-gradient-2': "linear-gradient(135deg, #ed6c4f 0%, #ffbd4f 100%)",
        'brand-hero': "radial-gradient(ellipse at top, rgba(91, 192, 222, 0.15) 0%, rgba(58, 123, 143, 0.05) 50%, rgba(15, 23, 42, 0) 100%)"
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.35s ease-out forwards'
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

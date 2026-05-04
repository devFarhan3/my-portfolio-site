/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#1D1D1F',
        primary: {
          DEFAULT: '#D4A853',
          foreground: '#FFFFFF',
        },
        'text-1': '#1D1D1F',
        'text-2': '#6E6E73',
        'surface': '#F5F5F7',
        'accent': '#D4A853',
        'border-custom': 'rgba(0,0,0,0.07)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'btn': '980px',
        'img': '14px',
        'spline': '24px',
      },
      spacing: {
        'section-v': '140px',
        'section-v-mobile': '80px',
        'nav-h': '48px',
      },
      maxWidth: {
        'content': '980px',
      },
    },
  },
  plugins: [],
}

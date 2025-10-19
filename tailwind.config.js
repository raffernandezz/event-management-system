/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema preto e dourado personalizado
        primary: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFF0C2',
          300: '#FFE49E',
          400: '#FFD266',
          500: '#D4AF37', // Dourado principal
          600: '#B8860B', // Dourado escuro
          700: '#9A7209',
          800: '#7C5E07',
          900: '#5E4A05',
          950: '#3F3303',
        },
        dark: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717', // Preto quase puro
          950: '#0A0A0A', // Preto principal
        },
        gold: {
          50: '#FFFEF7',
          100: '#FFFCE6',
          200: '#FFF9C2',
          300: '#FFF49E',
          400: '#FFED66',
          500: '#FFD700', // Dourado brilhante
          600: '#E6C200',
          700: '#CC9900',
          800: '#B38600',
          900: '#996B00',
          950: '#7A5400',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #171717 100%)',
        'gradient-card': 'linear-gradient(135deg, #1A1A1A 0%, #262626 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 25px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

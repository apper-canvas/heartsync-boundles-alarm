/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E91E63',
          light: '#F48FB1',
          dark: '#C2185B'
        },
        secondary: {
          DEFAULT: '#FF5722',
          light: '#FF8A65',
          dark: '#E64A19'
        },
        accent: '#9C27B0',
        success: '#4CAF50',
        surface: {
          50: '#FFFFFF',
          100: '#FFF5F7',
          200: '#FFE4E9',
          300: '#FFCDD2',
          400: '#94a3b8',
          500: '#E91E63',
          600: '#C2185B',
          700: '#880E4F',
          800: '#424242',
          900: '#212121'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(233, 30, 99, 0.1), 0 2px 4px -2px rgba(233, 30, 99, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'glow': '0 0 20px rgba(233, 30, 99, 0.3)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      animation: {
        'pulse-heart': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
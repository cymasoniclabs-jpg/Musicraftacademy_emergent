/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#5B21B6',
        'primary-royal': '#4338CA',
        'background-dark': '#0A0A0F',
        'background-light': '#F8FAFC',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        'accent-indigo': '#6366F1',
        'accent-blue': '#3B82F6',
        'accent-silver': '#E2E8F0',
        'border-gray': '#334155',
        'card-dark': '#1E1B4B',
        'royal-purple': '#3730A3',
        'deep-blue': '#1E3A8A',
        // Royal/Silver palette as specified
        'royal': {
          400: '#8B5CF6',
          500: '#7C3AED', 
          600: '#6D28D9',
          900: '#3730A3'
        },
        'silver': {
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          900: '#0F172A'
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'], 
        'source': ['Source Sans Pro', 'sans-serif'],
        // Keep existing for compatibility
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #5B21B6, #4338CA)',
        'royal-gradient': 'linear-gradient(135deg, #3730A3, #1E3A8A)',
        'silver-gradient': 'linear-gradient(135deg, #E2E8F0, #CBD5E1)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(99, 102, 241, 0.4)',
        'royal-glow': '0 0 40px rgba(91, 33, 182, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
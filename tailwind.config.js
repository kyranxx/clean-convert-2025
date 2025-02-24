/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b85c44',
        accent: {
          light: '#c97a65',
          DEFAULT: '#b85c44',
          dark: '#964a37',
        },
        content: {
          light: '#4a4a4a',
          DEFAULT: '#2d2d2d',
          dark: '#ffffff',
        },
        background: {
          light: '#ffffff',
          DEFAULT: '#faf9f8',
          dark: '#1a1a1a',
        },
        surface: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#242424',
        },
        'dark-grey': {
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'lg': '0.625rem',
        'xl': '1rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'dark-soft': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'dark-medium': '0 4px 12px rgba(0, 0, 0, 0.3)',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      ringWidth: ['focus'],
      ringColor: ['focus'],
      ringOpacity: ['focus'],
      transform: ['hover', 'dark'],
      scale: ['hover', 'dark'],
      backgroundColor: ['dark', 'dark:hover'],
      textColor: ['dark', 'dark:hover'],
      borderColor: ['dark', 'dark:hover'],
      opacity: ['dark'],
    },
  },
}

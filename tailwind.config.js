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
        primary: {
          light: '#FF7A5C',
          DEFAULT: '#E85D3D',
          dark: '#D14B2B',
        },
        accent: {
          light: '#6366F1',
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
        },
        content: {
          light: '#6B7280',
          DEFAULT: '#1F2937',
          dark: '#F9FAFB',
        },
        background: {
          light: '#F9FAFB',
          DEFAULT: '#FFFFFF',
          dark: '#111827',
        },
        'dark-grey': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
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
        '2xl': '1.25rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
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
          '2xl': '1536px',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF7A5C 0%, #E85D3D 100%)',
        'gradient-accent': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
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
      backgroundImage: ['hover', 'dark'],
    },
  },
}

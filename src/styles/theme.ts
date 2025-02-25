export const colors = {
  // Primary colors
  primary: {
    light: '#FF7A5C', // Lighter terracotta
    DEFAULT: '#E85D3D', // Main terracotta
    dark: '#D14B2B', // Darker terracotta
  },

  // Accent colors
  accent: {
    light: '#6366F1', // Indigo
    DEFAULT: '#4F46E5', // Main accent
    dark: '#4338CA', // Darker accent
  },

  // Content colors
  content: {
    DEFAULT: '#1F2937', // Main text
    light: '#6B7280', // Secondary text
    dark: '#F9FAFB', // Light mode text
  },

  // Background colors
  background: {
    light: '#F9FAFB',
    DEFAULT: '#FFFFFF',
    dark: '#111827',
  },

  // Dark mode specific
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
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const gradients = {
  primary: 'linear-gradient(135deg, #FF7A5C 0%, #E85D3D 100%)',
  accent: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  dark: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
};

// Common component styles
export const componentStyles = {
  button: {
    primary: `
      bg-primary hover:bg-primary-dark
      text-white
      font-medium
      rounded-xl
      transition-all duration-200
      shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
    `,
    secondary: `
      border border-dark-grey-200 dark:border-dark-grey-700
      hover:border-primary
      text-content-light hover:text-primary
      font-medium
      rounded-xl
      transition-all duration-200
      hover:shadow-lg
    `,
  },
  card: `
    bg-white dark:bg-dark-grey-800
    rounded-2xl
    shadow-lg hover:shadow-xl
    transition-shadow duration-200
  `,
  input: `
    w-full
    px-4 py-2
    bg-white dark:bg-dark-grey-800
    border border-dark-grey-200 dark:border-dark-grey-700
    focus:border-primary dark:focus:border-primary
    focus:ring-1 focus:ring-primary
    rounded-xl
    transition-all duration-200
  `,
};

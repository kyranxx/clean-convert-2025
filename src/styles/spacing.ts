// Spacing constants for consistent layout throughout the application
export const spacing = {
  // Base spacing unit (4px)
  base: 4,

  // Spacing scale
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px

  // Component-specific spacing
  card: {
    padding: '1.5rem',
    gap: '1rem',
    borderRadius: '1rem',
  },

  section: {
    padding: {
      x: {
        sm: '1rem',
        md: '2rem',
        lg: '4rem',
      },
      y: {
        sm: '2rem',
        md: '4rem',
        lg: '6rem',
      },
    },
    gap: '2rem',
  },

  form: {
    gap: '1.5rem',
    fieldGap: '0.75rem',
  },

  button: {
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
    },
    gap: '0.5rem',
  },

  // Layout spacing
  layout: {
    containerPadding: {
      sm: '1rem',
      md: '2rem',
      lg: '4rem',
    },
    sectionGap: '4rem',
    componentGap: '2rem',
  },

  // Helper function to get spacing in pixels
  px: (multiplier: number) => `${multiplier * 4}px`,
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 10,
  sticky: 100,
  overlay: 200,
  modal: 300,
  popover: 400,
  toast: 500,
  tooltip: 600,
  max: 9999,
};

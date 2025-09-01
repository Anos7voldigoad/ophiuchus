/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Optimized color palette
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cc',
          300: '#8ed1a9',
          400: '#5bb87e',
          500: '#8EB69B', // Main brand color
          600: '#4a9a6a',
          700: '#3d7a55',
          800: '#336146',
          900: '#2b4f3a',
          950: '#1a2f22',
        },
        secondary: {
          50: '#f7fdf8',
          100: '#edf9f0',
          200: '#d4f0db',
          300: '#a8e1b8',
          400: '#DAF1DE', // Secondary brand color
          500: '#6bcb7a',
          600: '#4da85a',
          700: '#3f8548',
          800: '#356a3c',
          900: '#2d5732',
          950: '#1a321e',
        },
        dark: {
          50: '#f6f7f7',
          100: '#e3e6e6',
          200: '#c7cdcd',
          300: '#a3acac',
          400: '#7a8585',
          500: '#5d6767',
          600: '#4a5252',
          700: '#3e4444',
          800: '#353a3a',
          900: '#2e3232',
          950: '#0B2B26', // Main dark color
          1000: '#051F20', // Darker variant
        }
      },
      // Optimized font stack
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      // Performance-optimized animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(142, 182, 155, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(142, 182, 155, 0.8)' },
        },
      },
      // Performance-optimized spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      // Optimized breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      // Performance-optimized shadows
      boxShadow: {
        'glow': '0 0 20px rgba(142, 182, 155, 0.3)',
        'glow-lg': '0 0 40px rgba(142, 182, 155, 0.4)',
        'glow-xl': '0 0 60px rgba(142, 182, 155, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(142, 182, 155, 0.2)',
      },
      // Performance-optimized backdrop blur
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      // Performance-optimized gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
      // Performance-optimized transitions
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      // Performance-optimized z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Performance optimization plugin
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.content-visibility-auto': {
          'content-visibility': 'auto',
          'contain-intrinsic-size': '0 500px',
        },
        '.will-change-transform': {
          'will-change': 'transform',
        },
        '.will-change-opacity': {
          'will-change': 'opacity',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.transform-gpu': {
          'transform': 'translateZ(0)',
        },
        '.text-render-optimize': {
          'text-rendering': 'optimizeLegibility',
          '-webkit-font-feature-settings': '"liga" 1, "kern" 1',
          'font-feature-settings': '"liga" 1, "kern" 1',
        },
      };
      addUtilities(newUtilities);
    },
  ],
  // Performance optimizations
  corePlugins: {
    // Disable unused utilities for smaller bundle
    preflight: true,
    container: false, // We'll use custom container
  },
  // JIT mode for better performance
  mode: 'jit',
}

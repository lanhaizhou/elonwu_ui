// const defaultTheme = require('tailwindcss/defaultTheme');

const primary = {
  100: '#979df1',
  200: '#9197d4',
  300: '#565cc0',
  400: '#3a43b9',
  500: '#3139ac',
  600: '#262e9c',
  700: '#1f2796',
  800: '#1b2170',
  900: '#14174b',

  LIGHT: '#565cc0',
  DEFAULT: '#434cc0',
};

module.exports = {
  mode: 'jit',
  purge: ['./packages/**/*.js', './packages/**/*.ts', './packages/**/*.tsx'],

  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary,
      },
      fontFamily: {
        notoSerif: ['-apple-system', 'Noto Serif SC', 'serif'],
        notoSans: ['-apple-system', 'Noto Sans SC', 'sans-serif'],
      },
    },

    fill: (theme) => ({
      primary: primary.DEFAULT,
      light: primary.LIGHT,
      white: theme('colors.white'),
      gray: theme('colors.gray.50'),
    }),
  },
  variants: {
    extend: {
      textColor: ['active', 'dark'],
      backgroundColor: ['active', 'dark'],
      backdropFilter: ['hover', 'focus', 'active', 'dark'],
      fill: ['hover', 'focus', 'active', 'dark'],
    },
  },
};

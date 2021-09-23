// const defaultTheme = require('tailwindcss/defaultTheme');

const primary = {
  100: '#979df1',
  200: '#6b73e0',
  300: '#434cc0',
  400: '#3a43b9',
  500: '#3139ac',
  600: '#262e9c',
  700: '#1f2796',
  800: '#1b2170',
  900: '#14174b',

  DEFAULT: '#434cc0',
};

module.exports = {
  mode: 'jit',
  purge: ['./packages/**/*.js'],

  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary,
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
      },
    },

    fill: (theme) => ({
      primary: primary.DEFAULT,
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

import type { Config } from 'tailwindcss';

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      screens: {
        // => @media (min-width: 1860px) { ... }
        '3xl': '1860px',
        // => @media (min-width: 1988px) { ... }
        '2k': '1988px',
        // => @media (min-width: 2500px) { ... }
        '4k': '2500px'
      },
      spacing: {
        18: '4.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
        42: '10.5rem',
        68: '17rem',
        86: '21.5rem',
        100: '25rem',
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        124: '31rem',
        122: '31.5rem',
        128: '32rem',
        132: '33rem',
        140: '35rem',
        144: '36rem',
        148: '37rem',
        150: '37.5rem',
        152: '38rem',
        156: '43.75rem',
        160: '45rem',
        164: '46.25rem',
        168: '47.5rem'
      },
      fontFamily: {
        sans: [ 'Futura', 'sans-serif' ]
      },
      colors: {
        primary: '#FFEABF',
        primaryHalf: '#FFEABF80',
        secondary: '#BFAF8F',
        secondaryHalf: '#BFAF8F80',
        'primary-25': '#FFEABF40',
        'secondary-25': '#BFAF8F40',
        block: '#0D0C0A',
        error: '#D42E4F'
      }
    }
  },
  plugins: []
} as Config;

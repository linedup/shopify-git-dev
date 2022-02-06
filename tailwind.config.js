  // tailwind.config.js
  module.exports = {
    purge: [
      './dist/layout/*.liquid',
      './dist/sections/*.liquid',
      './dist/snippets/*.liquid',
      './dist/templates/*.liquid',
      './dist/assets/**/*.js',
    ],
     darkMode: false, // or 'media' or 'class'
     theme: {
      container: {
        center: true,
      },
      extend: {
        screens: {
          '2xl': '1800px',
        },
        zIndex: {
          '60': '60',
          '70': '70',
          '80': '80',
          '90': '90',
          '100': '100',
        },
        maxWidth: {
          xs: '0',
          sm: '480px',
          md: '768px',
          lg: '992px',
          xl: '1440px'
        },
        spacing: {
          '4': '1rem',
          '13': '3.25rem',
          '14': '3.5rem',
          '15': '3.75rem',
          '18': '4.5rem',
          '18-5': '4.625rem',
          '19': '4.75rem',
          '22': '5.5rem',
          '23': '5.75rem',
          '26': '6.5rem',
          '29': '7.25rem',
          '32-5': '8.125rem',
          '43': '10.75rem',
          '54': '13.25rem',
          '86': '21.5rem',
          '114': '28.5rem',
          '128': '32rem',
          '142': '35.5rem',
          '160': '40rem',
          '200': '50rem',
          '202': '50.5rem',
          '240': '60rem'
        },      
        maxWidth: {
          '4': '1rem',
          '5': '1.25rem',
          '6': '1.5rem',
          '8': '2rem',
          '10': '2.5rem',
          '12': '3rem',
          '18': '4.5rem',
          '13': '3.25rem',
          '14': '3.5rem',
          '46': '11.5rem',
          '75': '18.75rem'
        },
        minWidth: {
          '4': '1rem',
          '5': '1.25rem',
          '8': '2rem',
          '13': '3.25rem',
          '14': '3.5rem',
          '18': '4.5rem',
          '40': '10rem',
          '46': '11.5rem',
          '50': '12.5rem',
          '54': '13.5rem',
          '75': '18.75rem'
        },
        colors: {
          debug: '#39FF14',
          white: '#ffffff',
          platinum: '#f6f6f6',
          purpleNavy: '#384972',
          sand: '#E7DDBB',
          richBlack: '#010B13',
          lightBlue: '#E7EBEC'
        }
      },
      screens: {
        xs: '0',
        sm: '480px',
        md: '768px',
        lg: '992px',
        xl: '1440px'
      },
      fontFamily: {
        helvetica: ["Helvetica Neue LT W05_55 Roman", 'sans-serif'],
      },
     },
     variants: {},
     plugins: [],
   }
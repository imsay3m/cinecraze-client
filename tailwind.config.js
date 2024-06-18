/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/*.{html,js}",
    "./public/assets/js/*.js",
  ],
  theme: {
    //tailwind size=px/4
    //rem size=px/16
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontFamily: {
      'sans': ['Manrope', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'header-background': "url('assets/images/laptop/banner-background.png')",
        'header-background-mobile': "url('assets/images/mobile/banner-background.png')",
        'free-trial-background': "url('assets/images/laptop/free-trial-background.png')",
        'free-trial-background-mobile': "url('assets/images/mobile/free-trial-background.png')",
        'movie-backdrop-background': "url('assets/images/laptop/eternals-original-backdrop.jpg')",
        'movie-poster-background': "url('assets/images/mobile/eternals-original-poster.png')",
        'profile-background': "url('assets/images/profile/profile-banner.jpg')",
      },
      lineHeight: {
        '14': '3.5rem',
        '18': '4.5rem',
      },
      spacing: {
        //tailwind size=px/4
        //rem size=px/16
        '7.5': '1.875rem',
        '12.5': '3.125rem',
        '15': '3.75rem',
        '16': '4rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '25': '6.25rem',
        '25.5': '102px',
        '30': '7.5rem',
        '32.5': '8.125rem',
        '38': '9.5rem',
        '41': '10.25rem',
        '47.5': '11.5rem',
        '67': '16.75rem',
        '68': '17rem',
        '73.25': '293px',
        '75': '18.75rem',
        '90': '22.5rem',
        '92.5': '23.125rem',
        '93.75': '375px',
        '103.25': '25.8125rem',
        '107.5': '26.875rem',
        '121': '30.25rem',
        '155': '38.75rem',
        '180': '45rem',
        '280': '70rem',
      },
      colors: {
        "primary": "#E50000",
        // "primarylite": "#E5EBE3",
        "secondery": "#1A1A1A",
        "seconderylite": "#0F0F0F",
        "tertiary": "#141414",
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: ["dark"],
    darkTheme: "dark",
    base: false, // applies background color and foreground color for root element by default
    styled: true,
    utils: true,
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true,
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}
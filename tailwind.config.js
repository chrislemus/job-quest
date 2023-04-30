/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        emerald: {
          ...require('daisyui/src/colors/themes')['[data-theme=emerald]'],
          primary: '#047AFF',
          'primary-content': '#F9FAFB',
          secondary: '#463AA2',
          'secondary-content': '#F9FAFB',
          neutral: '#021431',
          'base-content': '#394E6A',
          'base-100': '#FFFFFF',
          'base-200': '#F2F7FF',
          'base-300': '#E3E9F4',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};

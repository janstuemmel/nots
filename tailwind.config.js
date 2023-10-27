/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,svelte}',
  ],
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1024px',
        '2xl': '1024px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
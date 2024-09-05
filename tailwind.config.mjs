/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        luckiest_guy: ['Luckiest Guy', 'system-ui'],
        josefin_sans: ['Josefin Sans Variable', 'sans-serif']
      },
      fontSize: {
        lg: 'clamp(2.2rem, 7.5vw, 2.6rem)',
        sm: 'clamp(1rem, 3.5vw, 1.2rem)'
      },
      colors: {
        primary_color: '#51005b',
        secondary_color: '#33004c',
        primary_button: '#9a00ab'
      }
    }
  },
  plugins: []
}

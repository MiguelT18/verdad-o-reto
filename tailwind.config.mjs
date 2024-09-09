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
        xs: 'clamp(0.8rem, 3vw, 1rem)',
        sm: 'clamp(1rem, 3.5vw, 1.2rem)',
        md: 'clamp(1.2rem, 4vw, 1.6rem)',
        lg: 'clamp(2.2rem, 7.5vw, 2.6rem)'
      },
      colors: {
        primary_color: '#4b0054',
        secondary_color: '#33004c',
        primary_button: '#9a00ab'
      }
    }
  },
  plugins: []
}

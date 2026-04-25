/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#170C79',
        hotpink: '#56B6C6',
        blush: '#8ACBD0',
        ember: '#EFE3CA',
        cloud: '#EFE3CA',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 55px rgba(0, 0, 0, 0.52)',
        soft: '0 10px 35px rgba(22, 164, 240, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        reveal: {
          from: { clipPath: 'inset(100% 0 0 0)' },
          to: { clipPath: 'inset(0% 0 0 0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.25, transform: 'translateY(0px)' },
          '50%': { opacity: 0.6, transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        reveal: 'reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
        serif: ['"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
        mono: ['"Microsoft YaHei"', '"PingFang SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
let colors = [
  'amber',
  'gray',
  'green',
  'yellow',
  'fuchsia',
  'green',
  'red',
  'sky',
  'indigo',
  'blue',
];
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [...colors.map((color) => `bg-${color}-200`)],
  theme: {
    extend: {},
  },
  plugins: [],
};

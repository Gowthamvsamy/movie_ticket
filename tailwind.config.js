/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                  
    "./src/**/*.{js,ts,jsx,tsx}",    
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'primary-blue': '#0e62e6',
        'primary-yellow': '#FFD700',
        'secondary-gray': '#D3D3D3',
        'secondary-blue' : '#023896',
        'background-gray': '#F5F5F5',
      },
    },
  },
  plugins: [],
}


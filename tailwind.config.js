/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                  
    "./src/**/*.{js,ts,jsx,tsx}",    
  ],
  theme: {
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


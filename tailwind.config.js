/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./main.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F172A',    
          primary: '#2563EB', 
          light: '#F8FAFC',   
          accent: '#10B981',  
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], 
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
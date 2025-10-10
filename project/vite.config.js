// vite.config.js (The Correct Code)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({ // <-- Change [ to ( and {
  plugins: [
    react(),
    tailwindcss()
  ]
}) 
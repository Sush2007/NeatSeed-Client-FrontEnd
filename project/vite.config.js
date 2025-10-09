import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    hmr: {
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost',
      clientPort: 443,
      protocol: 'wss'
    }
  }
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/euroliga': {
        target: 'https://api-live.euroleague.net',
        changeOrigin: true,
        rewrite: (ruta) => ruta.replace(/^\/api\/euroliga/, ''),
      },
    },
  },
})

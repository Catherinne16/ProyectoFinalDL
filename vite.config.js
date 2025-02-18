import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve('index.html'),
    },
  },
  server: {
    port: process.env.PORT || 5173,
  },
  preview: {
    allowedHosts: ['proyectofinaldl.onrender.com', 'localhost'],
  },
});
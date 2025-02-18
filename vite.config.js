import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve('index.html'), // Asegura que index.html es el punto de entrada
    },
  },
  server: {
    port: 5173, // Asegura que se sirva en el puerto correcto
  },
});
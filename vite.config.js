import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativa para que funcione igual servido desde la raíz de un dominio
// o desde un subdirectorio (GitHub Pages, previews, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
})

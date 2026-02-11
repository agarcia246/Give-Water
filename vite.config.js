import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages path: https://agarcia246.github.io/Give-Water/
  base: "/Give-Water/",
  plugins: [
    react(),
    tailwindcss()
  ]
})

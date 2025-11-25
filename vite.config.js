import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true // Allow external access if needed
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps for smaller build
    minify: 'terser' // Better minification
  },
  // ✅ CORRECT: Let Vite handle environment variables automatically
  // ❌ NO manual process.env definition needed
})
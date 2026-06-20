import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/coffee-branch/',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/.playwright-mcp/**', '**/*.png', '**/.claude/**'],
    },
  },
})

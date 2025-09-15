import path from 'node:path'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tanstack-router-keepalive/',
  plugins: [tanstackRouter(
    {
      target: 'react',
      indexToken: 'page',
      routeToken: 'layout',
      quoteStyle: 'single',
      semicolons: true,
      routeFileIgnorePrefix: '-',
      autoCodeSplitting: true,
    },
  ), react()],
  optimizeDeps: {
    force: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

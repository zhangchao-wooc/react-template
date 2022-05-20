import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/request'),
      '@asset': path.resolve(__dirname, 'src/asset'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  },
  plugins: [
    react(),
    Pages({
      dirs: 'src/views'
    })
  ],
  server: {
    host: '127.0.0.1',
    port: 4000,
    strictPort: false,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true
  }
})

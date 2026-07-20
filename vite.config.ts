import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import babel from '@rolldown/plugin-babel'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
      exclude: [/\/pdf\//, /\/node_modules\//]
    }),
    babel({
      exclude: [/\/pdf\//, /\/src\/store\//, /\/node_modules\//],
      presets: [reactCompilerPreset()],
      plugins: [['@babel/plugin-proposal-decorators', { version: 'legacy' }]]
    }),
    Pages({
      importMode: 'async',
      dirs: 'src/views',
      extensions: ['tsx'],
      exclude: ['**/components/**/*.tsx'],
      moduleId: '～react-pages'
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
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      // production build rollup options
      plugins: []
    }
  },
  envDir: path.resolve(__dirname, 'env'),
  envPrefix: 'WOOC_'
})

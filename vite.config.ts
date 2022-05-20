import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import vitePluginImp from 'vite-plugin-imp'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }, // 解决 vite 支持 @ant-design/pro-layout 的 less 引入方式的问题
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/request') },
      { find: '@asset', replacement: path.resolve(__dirname, 'src/asset') },
      { find: '@models', replacement: path.resolve(__dirname, 'src/models') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
      {
        find: '@/components',
        replacement: path.resolve(__dirname, 'src/components')
      }
    ]
  },
  plugins: [
    react(),
    Pages({
      dirs: 'src/views',
      // 默认 ～react-pages 与 @ant-design/pro-layout 的 less 引入方式重合, 在解决 @ant-design/pro-layout 的 less 引入方式时会影响
      // 其他以 ～ 引入方式的包，故改为 @@ 开头
      moduleId: '@@react-pages'
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;' // 解决 vite 支持 @ant-design/pro-layout 的 less 引入方式的问题
      }
    }
  },
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

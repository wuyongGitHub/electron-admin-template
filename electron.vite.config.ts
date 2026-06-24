import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
//element
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// fall back to require to avoid TypeScript error when resolver types are missing
// @ts-ignore
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@router': resolve('src/renderer/src/router'),
        '@store': resolve('src/renderer/src/store'),
        '@views': resolve('src/renderer/src/views'),
        '@assets': resolve('src/renderer/src/assets'),
        '@components': resolve('src/renderer/src/components'),
        '@api': resolve('src/renderer/src/api'),
        '@utils': resolve('src/renderer/src/utils')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://uat.crm.xuexiluxian.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})

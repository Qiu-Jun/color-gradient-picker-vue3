/*
 * @Author: June
 * @Description: Vite构建配置文件
 * @Date: 2023-04-11 11:17:35
 * @LastEditors: June
 * @LastEditTime: 2024-12-22 12:46:23
 */
import type { ConfigEnv, UserConfigExport } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'

export default ({ command }: ConfigEnv): UserConfigExport => {
  const isDev = command === 'serve'

  return {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    },
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      }),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'lodash-es': ['cloneDeep', 'debounce', 'throttle'],
          },
        ],
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
      preprocessorOptions: {
        scss: {
          // 移除variables.scss的引用，因为文件不存在
          // additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.mjs',
        '.vue',
        '.json',
        '.less',
        '.css',
        '.scss',
      ],
    },
    server: {
      port: 3000,
      host: true,
      open: true,
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console和debugger
          drop_console: !isDev,
          drop_debugger: !isDev,
          pure_funcs: isDev ? [] : ['console.log', 'console.info'],
        },
        mangle: {
          safari10: true,
        },
      },
      lib: {
        entry: path.resolve(__dirname, './index.ts'),
        name: 'color-gradient-picker-vue3',
        fileName: (format) => `color-gradient-picker-vue3.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['vue', 'tinycolor2', 'lodash-es'],
        output: {
          globals: {
            vue: 'Vue',
            tinycolor2: 'tinycolor',
            'lodash-es': '_',
          },
          exports: 'named',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'color-gradient-picker-vue3.css'
            }
            return assetInfo.name || 'asset'
          },
        },
      },
      sourcemap: isDev,
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ['vue', 'tinycolor2', 'lodash-es'],
    },
  }
}

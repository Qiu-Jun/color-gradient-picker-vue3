/*
 * @Author: June
 * @Description:
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
  return {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true,
        },
      }),
      visualizer(),
    ],
    css: {
      postcss: {
        plugins: [autoprefixer],
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
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },

      lib: {
        entry: path.resolve(__dirname, './index.ts'),
        name: 'color-gradient-picker-vue3',
        fileName: (format) => `color-gradient-picker-vue3.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
}

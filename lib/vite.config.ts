/*
 * @Author: June
 * @Description:
 * @Date: 2023-04-11 11:17:35
 * @LastEditors: June
 * @LastEditTime: 2024-12-02 12:06:27
 */
import type { ConfigEnv, UserConfigExport } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      VueSetupExtend(),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true,
        },
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/svgs')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
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

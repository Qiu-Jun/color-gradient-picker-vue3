/*
 * @Author: June
 * @Description:
 * @Date: 2023-04-11 11:17:35
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 12:56:20
 */
import type { ConfigEnv, UserConfigExport } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [
            vue(),
            vueJsx(),
            VueSetupExtend(),
            AutoImport({
                imports: ['vue'],
                eslintrc: {
                    enabled: true,
                },
            }),
        ],
        resolve: {
            alias: {
                '@l': path.resolve(__dirname, './'),
                '@c': path.resolve(__dirname, './components/'),
            },
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
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
    };
};

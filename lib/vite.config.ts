/*
 * @Author: June
 * @Description:
 * @Date: 2023-04-11 11:17:35
 * @LastEditors: June
 * @LastEditTime: 2023-04-11 12:00:36
 */
import type { ConfigEnv, UserConfigExport } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [vue(), vueJsx(), VueSetupExtend()],
        resolve: {
            alias: {
                '@c': path.resolve(__dirname, './'),
            },
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
        },
        build: {
            outDir: 'dist',
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

import type { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [vue(), vueJsx(), vueSetupExtend()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
        },
        build: {
            outDir: 'dist',
            lib: {
                entry: path.resolve(__dirname, './src/lib/index.ts'),
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

            minify: 'terser',
            terserOptions: {
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
    };
};

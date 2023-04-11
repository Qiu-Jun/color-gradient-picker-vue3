/*
 * @Author: June
 * @Description:
 * @Date: 2023-04-11 11:17:35
 * @LastEditors: June
 * @LastEditTime: 2023-04-11 12:48:36
 */
import type { ConfigEnv, UserConfigExport } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [vue(), vueJsx(), VueSetupExtend()],
    };
};

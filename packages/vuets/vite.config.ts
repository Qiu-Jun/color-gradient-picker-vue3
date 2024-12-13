/*
 * @Author: June
 * @Description:
 * @Date: 2023-10-03 23:27:30
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 23:27:33
 */
import type { ConfigEnv, UserConfigExport } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [vue(), vueJsx()],
  }
}

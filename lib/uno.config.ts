/*
 * @Author: June
 * @Description: Description,
 * @Date: 2024-11-30 20:08:48
 * @LastEditTime: 2024-12-02 11:19:58
 * @LastEditors: June
 */
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-center', 'flex justify-center items-center'],
  ],
})

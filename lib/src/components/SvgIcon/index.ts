/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-24 18:54:13
 * @LastEditors: June
 * @LastEditTime: 2024-12-02 12:13:04
 * @FilePath: /element-fabric-editor/src/components/SvgIcon/index.ts
 */
import SvgIcon from './SvgIcon.vue'
import type { App } from 'vue'

export function setupSvgIcon(app: App) {
  app.component('SvgIcon', SvgIcon)
}

export default SvgIcon

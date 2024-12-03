/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 23:47:54
 * @LastEditors: June
 * @LastEditTime: 2024-12-03 20:20:40
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupSvgIcon } from '@/components/SvgIcon'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

function start() {
  const app = createApp(App)
  setupSvgIcon(app)
  app.mount('#app')
}
start()

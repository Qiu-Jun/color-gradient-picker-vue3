/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 23:47:54
 * @LastEditors: June
 * @LastEditTime: 2024-12-10 12:58:18
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

function start() {
  const app = createApp(App)
  app.use(ElementPlus)
  app.mount('#app')
}
start()

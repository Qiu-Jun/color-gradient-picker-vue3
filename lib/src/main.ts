/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 23:47:54
 * @LastEditors: June
 * @LastEditTime: 2024-12-07 20:52:53
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

import '@/styles/index.scss'

function start() {
  const app = createApp(App)
  app.mount('#app')
}
start()

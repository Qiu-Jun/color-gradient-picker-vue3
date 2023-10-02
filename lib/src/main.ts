/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 23:47:54
 * @LastEditors: June
 * @LastEditTime: 2023-03-18 00:30:26
 */
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import 'virtual:uno.css';

function start() {
  const app = createApp(App);
  app.use(ElementPlus);
  app.mount('#app');
}
start();

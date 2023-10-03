/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 23:47:54
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 23:50:36
 */
import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css';

function start() {
  const app = createApp(App);
  app.mount('#app');
}
start();

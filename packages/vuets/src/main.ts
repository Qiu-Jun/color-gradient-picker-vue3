/*
 * @Author: June
 * @Description:
 * @Date: 2023-10-03 23:29:44
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 23:30:42
 */
import { createApp } from 'vue';
import App from './App.vue';

function start() {
  const app = createApp(App);
  app.mount('#app');
}
start();

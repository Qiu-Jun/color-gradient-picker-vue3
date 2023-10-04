<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-10-04 12:24:19
-->
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker :color="color" show-btn @change="onChange" />
    </div>
    <div>
      <ColorPicker is-gradient @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorPicker from '../components/ColorPicker/index.vue'
import '../index.scss'
const color = {
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1,
}

const testStyle = ref('')

const onChange = (e) => {
  testStyle.value = `background: ${e.style}`
  console.log(e)
}
</script>

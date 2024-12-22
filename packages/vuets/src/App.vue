<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-10-03 23:30:50
 * @LastEditors: June
 * @LastEditTime: 2024-12-22 12:48:58
-->
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker v-model:value="curColor" @change="onChange" />
    </div>

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const curColor = ref('rgba(175, 51, 242, 1)')
const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>

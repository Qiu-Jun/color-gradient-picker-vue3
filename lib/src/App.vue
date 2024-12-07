<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2024-12-07 21:36:52
-->
<template>
  <div id="app" class="flex justify-start items-center">
    <ColorPicker v-model:value="curColor" @change="onChange" />

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ColorPicker } from '@/components/ColorPicker'

const curColor = ref('rgba(175, 51, 242, 1)')
const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>

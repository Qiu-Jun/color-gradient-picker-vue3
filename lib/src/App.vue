<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2024-12-22 00:20:23
-->
<template>
  <div id="app" class="flex justify-start items-start">
    <ColorPicker
      v-model:value="curColor"
      :preset-colors="presetColors"
      :width="320"
      @change="onChange"
    />

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor2 }"
    ></div>

    <el-popover placement="right" width="340px" trigger="hover">
      <template #reference>
        <el-button class="m-2">Hover to activate</el-button>
      </template>
      <ColorPicker v-model:value="curColor2" />
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ColorPicker } from '@/components/ColorPicker'

const presetColors = [
  'rgba(0,0,0,1)',
  'rgba(128,128,128, 1)',
  'rgba(192,192,192, 1)',
  '#f34250',
]
const curColor = ref(
  'linear-gradient(45deg, rgba(245,66,245,1) 0%, RGBA(245,66,245,1) 47%, rgba(0,0,255,1) 100%)',
)
const curColor2 = ref('rgba(0,0,0,1)')
// const curColor = ref(
//   'linear-gradient(90deg, rgba(245,66,245,1) 0%, RGBA(245,66,245,1) 47%, rgba(0,0,255,1) 100%)',
// )
const onChange = (val: any) => {
  // console.log(val, 'colorpicker 回调')
}
</script>

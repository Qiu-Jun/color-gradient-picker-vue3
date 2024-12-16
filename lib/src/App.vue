<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2024-12-16 17:55:34
-->
<template>
  <div id="app" class="flex justify-start items-start">
    <ColorPicker
      v-model:value="curColor"
      hide-gradient
      :width="300"
      @change="onChange"
    />

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>

    <!-- <el-popover placement="right" width="340px" trigger="hover">
      <template #reference>
        <el-button class="m-2">Hover to activate</el-button>
      </template>
      <ColorPicker v-model:value="curColor" @change="onChange" />
    </el-popover> -->
  </div>
</template>

<script lang="ts" setup>
import { ColorPicker } from '@/components/ColorPicker'

const curColor = ref('rgba(175, 51, 242, 1)')
// const curColor = ref(
//   'linear-gradient(90deg, rgba(245,66,245,1) 0%, RGBA(245,66,245,1) 47%, rgba(0,0,255,1) 100%)',
// )
const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>

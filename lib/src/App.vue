<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2024-12-03 20:47:52
-->
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <ColorPicker @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import ColorPicker from '@/components/ColorPicker'

const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>

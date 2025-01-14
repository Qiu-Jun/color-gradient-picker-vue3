<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 10:37:40
 * @LastEditTime: 2024-12-22 00:19:31
 * @LastEditors: June
-->
<template>
  <div class="cpg-preview-wrap">
    <div
      class="cpg-preview-color"
      :style="{
        background: colorValue,
        border:
          colorValue === 'rgba(255,255,255,1)' && colorState.hc?.a === 1
            ? '1px solid #96959c'
            : '',
      }"
    ></div>
    <div class="cpg-preview-presetColor" @click="handleUpdateValue">
      <span
        v-for="(color, idx) in colorState.presetColors"
        :key="color + idx"
        class="cpg-preview-presetItem"
        :style="{
          background: color,
          border: color === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : '',
        }"
        :data-color="color"
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'

const { colorState, isGradient, changeColor, setValue } = inject('colorProvider') as any

const colorValue = computed(() => {
  if (unref(isGradient)) {
    return colorState.gradientColor ?? ''
  } else {
    return colorState.value ?? ''
  }
})

const handleUpdateValue = debounce(function (e) {
  const color = e.target.dataset.color
  if (!color) return
  if (unref(isGradient)) {
    changeColor(color)
  } else {
    setValue(color)
  }
}, 250)
</script>

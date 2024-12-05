<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 10:37:40
 * @LastEditTime: 2024-12-05 13:35:34
 * @LastEditors: June
-->
<template>
  <div class="cpg-preview-wrap">
    <div
      class="cpg-preview-color"
      :style="{
        background: colorState.value,
        border:
          colorState.value === 'rgba(255,255,255,1)' ? '1px solid #96959c' : '',
      }"
    ></div>
    <div class="cpg-preview-presetColor" @click="handleUpdateValue">
      <span
        v-for="(color, idx) in fakePresets"
        :key="color + idx"
        class="cpg-preview-presetItem bg-red"
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
import { fakePresets } from '@/constants'
import { useColor } from '@/hooks/useColor'
import { debounce } from 'lodash-es'

const { colorState, setValue, setHc } = useColor()
const handleUpdateValue = debounce(function (e) {
  const color = e.target.dataset.color
  color && setValue(color)
  setHc(color)
}, 250)
</script>

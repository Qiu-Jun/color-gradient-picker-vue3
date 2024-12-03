<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 10:37:40
 * @LastEditTime: 2024-12-03 20:23:12
 * @LastEditors: June
-->
<template>
  <div class="cpg-preview-wrap">
    <div class="cpg-preview-color"></div>
    <div class="cpg-preview-presetColor">
      <span
        v-for="(color, idx) in fakePresets"
        :key="color + idx"
        class="cpg-preview-presetItem bg-red"
        :style="{
          background: color,
          border: color === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : '',
        }"
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fakePresets } from '@/constants'
</script>

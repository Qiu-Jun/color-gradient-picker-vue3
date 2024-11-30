<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2024-11-30 22:05:32
 * @LastEditors: June
-->
<template>
  <div>cos</div>
</template>

<script lang="ts" setup>
import { LocalesProps } from '@/interfaces'
import { defaultLocales } from '@/constants'

const props = defineProps({
  value: {
    type: String,
    default: 'rgba(175, 51, 242, 1)',
  },
  hideControls: {
    type: Boolean,
    default: false,
  },
  hideInputs: {
    type: Boolean,
    default: false,
  },
  hideOpacity: {
    type: Boolean,
    default: false,
  },
  hidePresets: {
    type: Boolean,
    default: false,
  },
  presets: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  hideHue: {
    type: Boolean,
    default: false,
  },
  hideEyeDrop: {
    type: Boolean,
    default: false,
  },
  hideAdvancedSliders: {
    type: Boolean,
    default: false,
  },
  hideColorGuide: {
    type: Boolean,
    default: false,
  },
  hideInputType: {
    type: Boolean,
    default: false,
  },
  hideColorTypeBtns: {
    type: Boolean,
    default: false,
  },
  hideGradientType: {
    type: Boolean,
    default: false,
  },
  hideGradientAngle: {
    type: Boolean,
    default: false,
  },
  hideGradientStop: {
    type: Boolean,
    default: false,
  },
  hideGradientControls: {
    type: Boolean,
    default: false,
  },
  locales: {
    type: Object as PropType<LocalesProps>,
    default: () => defaultLocales,
  },
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 300,
  },
  style: {
    type: Object,
    default: () => {},
  },
  disableDarkMode: {
    type: Boolean,
    default: false,
  },
  disableLightMode: {
    type: Boolean,
    default: false,
  },
})

console.log(props)
</script>

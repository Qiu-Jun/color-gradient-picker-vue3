<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2024-12-03 20:59:04
 * @LastEditors: June
-->
<template>
  <div class="cpg-box">
    <!-- PickerArea -->
    <PickerArea />

    <!-- operation -->
    <Operation />

    <!-- gradient operation -->
    <OperationGradient />

    <!-- GradientBar -->
    <GradientBar />

    <!-- Hue -->
    <Hue />

    <!-- Opacity -->
    <Opacity />

    <!-- Inputs -->
    <Inputs />

    <!-- Preview -->
    <Preview />
  </div>
</template>

<script lang="ts" setup>
import { LocalesProps } from '@/interfaces'
import { defaultLocales } from '@/constants'

import {
  Opacity,
  PickerArea,
  Operation,
  OperationGradient,
  Preview,
  GradientBar,
  Inputs,
  Hue,
} from './components'
import tinycolor from 'tinycolor2'
import { isUpperCase, getColorObj, getDetails } from '@/utils/utils'
import { low, high, getColors } from '@/utils/format'
import { GradientProps, Styles, IProvide } from '@/interfaces'

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

// context 待抽离hooks
const context = reactive<IProvide>({
  value: props.value,
  width: props.width,
  height: props.height,
  hc: {},
})
const colors = getColors(props.value)
const { degrees, degreeStr, isGradient, gradientType } = getDetails(props.value)
const { currentColor, selectedColor, currentLeft } = getColorObj(colors)
const tinyColor = tinycolor(currentColor)
const rgba = tinyColor.toRgb()
const hsv = tinyColor.toHsv()
context.hc = { ...rgba, ...hsv }
// context 待抽离hooks

const styles = computed(() => `width: ${props.width}px`)

console.log(props)

provide('context', context)
</script>

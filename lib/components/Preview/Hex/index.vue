<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 21:29:54
 * @LastEditors: June
 * @LastEditTime: 2023-10-05 22:18:16
-->
<template>
  <CInput
    :value="hexValue"
    label="Hex"
    max-len="7"
    classes="hex mr-8px"
    @input="changeHex"
  />
</template>

<script name="PreviewHex" lang="ts" setup>
import CInput from '@c/CInput/index.vue'
import { rgbToHex, hexToRgb } from '@l/helpers'
import type { IColor, IColorState } from '@l/types'

const colorPickerState = inject('colorPickerState') as IColorState
const updateColor = inject('updateColor') as any
const hexValue = computed(() => {
  const { isGradient, activePointIndex } = colorPickerState
  // @ts-ignore
  const activePoint = colorPickerState.points[activePointIndex]
  if (isGradient) {
    return rgbToHex(activePoint!.red, activePoint!.green, activePoint!.blue)
  } else {
    return rgbToHex(
      colorPickerState.red,
      colorPickerState.green,
      colorPickerState.blue,
    )
  }
})

const changeHex = (event) => {
  let val = event.target.value
  if (!val && val !== 0) return
  const color = hexToRgb(val) as IColor
  if (color) {
    // colorPickerState.color = color;
    updateColor(color)
  }
}
</script>

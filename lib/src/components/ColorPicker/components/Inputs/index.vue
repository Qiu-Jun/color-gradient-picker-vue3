<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 11:43:15
 * @LastEditTime: 2024-12-06 11:01:29
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputs-wrap" :style="{ width: `${colorState.width}px` }">
    <InputHex v-if="colorState.inputType !== InputType.cmyk" />
    <HSLInputs v-if="colorState.inputType === InputType.hsl" />
    <RGBInputs v-if="colorState.inputType === InputType.rgb" />
    <HSVInputs v-if="colorState.inputType === InputType.hsv" />
    <CMYKInputs v-if="colorState.inputType === InputType.cmyk" />
    <InputItem
      v-if="!colorState.hideOpacity"
      :input-val="colorState.hc.a * 100"
      label="A"
      :callback="(val: number) => handleChange(`rgba(${colorState.hc?.r}, ${colorState.hc?.g}, ${colorState.hc?.b}, ${val / 100})`)"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  InputHex,
  HSLInputs,
  RGBInputs,
  HSVInputs,
  CMYKInputs,
  InputItem,
} from './components'
import { useColor } from '@/hooks/useColor'
import { InputType } from '@/enums'

const { colorState, handleChange } = useColor()

watch(
  () => colorState.inputType,
  (val) => console.log('噢噢噢噢', val),
)
</script>

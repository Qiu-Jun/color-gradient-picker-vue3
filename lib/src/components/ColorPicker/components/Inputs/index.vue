<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 11:43:15
 * @LastEditTime: 2024-12-04 16:09:48
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputs-wrap" :style="{ width: `${colorState.width}px` }">
    <InputHex v-if="colorState.inputType !== InputType.cmyk" />
    <HSLInputs v-if="colorState.inputType === InputType.hsl" />
    <RGBInputs v-if="colorState.inputType === InputType.rgb" />
    <HSVInputs v-if="colorState.inputType === InputType.hsv" />
    <CMKYInputs v-if="colorState.inputType === InputType.cmyk" />
    <InputItem
      v-if="!colorState.hideOpacity"
      :input-val="colorState.hc.a * 100"
      label="A"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  InputHex,
  HSLInputs,
  RGBInputs,
  HSVInputs,
  CMKYInputs,
  InputItem,
} from './components'
import { useColor } from '@/hooks/useColor'
import { InputType } from '@/enums'

const { colorState } = useColor()

watch(
  () => colorState.inputType,
  (val) => console.log('噢噢噢噢', val),
)
</script>

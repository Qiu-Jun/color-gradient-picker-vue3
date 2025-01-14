<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 21:20:20
 * @LastEditTime: 2024-12-06 11:01:23
 * @LastEditors: June
-->
<template>
  <InputItem
    :input-val="round(colorState.hc?.h)"
    label="H"
    :max="360"
    :callback="(val: number) => handleH(val, sVal, vVal)"
  />
  <InputItem
    :input-val="round(sVal * 100)"
    label="S"
    :max="100"
    :callback="(val: number) => handleSV({ h: colorState.hc?.h, s: val, v: vVal })"
  />
  <InputItem
    :input-val="round(vVal * 100)"
    label="V"
    :max="100"
    :callback="(val: number) => handleSV({ h: colorState.hc?.h,  s: sVal, v: val })"
  />
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import { round } from '@/utils/format'
import tc from 'tinycolor2'
import { InputType } from '@/enums'

const sVal = ref(0)
const vVal = ref(0)
const { colorState, changeColor } = inject('colorProvider') as any

const handleSV = (value: any) => {
  const { r, g, b } = tc(value).toRgb()
  changeColor(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

const handleH = (h: number, s: number, v: number) => {
  const { r, g, b } = tc({ h: h, s: s, v: v }).toRgb()
  changeColor(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

watchEffect(() => {
  if (colorState.inputType === InputType.hsv && colorState.hc) {
    sVal.value = colorState.hc.s
    vVal.value = colorState.hc.v
  }
})
</script>

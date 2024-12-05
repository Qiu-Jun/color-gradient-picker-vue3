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
    :callback="(val: number) => handleSl({ h: colorState.hc?.h, s: val, l: vVal })"
  />
  <InputItem
    :input-val="round(vVal * 100)"
    label="V"
    :max="100"
    :callback="(val: number) => handleSl({ h: colorState.hc?.h,  s: sVal, l: val })"
  />
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import { useColor } from '@/hooks/useColor'
import { round } from '@/utils/format'
import tc from 'tinycolor2'
import { InputType } from '@/enums'

const sVal = ref(0)
const vVal = ref(0)
const { colorState, handleChange, tinycolor } = useColor()

const handleSl = (value: any) => {
  const { r, g, b } = tc(value).toRgb()
  handleChange(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

const handleH = (h: number, s: number, l: number) => {
  const { r, g, b } = tc({ h: h, s: s, l: l }).toRgb()
  handleChange(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

watchEffect(() => {
  if (colorState.inputType === InputType.hsv && colorState.hc) {
    const { s, l } = tinycolor.value.toHsl(colorState.value)
    sVal.value = s
    vVal.value = l
  }
})
</script>

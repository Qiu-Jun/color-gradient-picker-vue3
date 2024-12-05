<template>
  <InputItem
    :input-val="round(valueState.c * 100)"
    label="C"
    :max="100"
    :callback="(val: number) => handleCmyk({c: val / 100, m: valueState.m, y: valueState.y, k: valueState.k})"
  />
  <InputItem
    :input-val="round(valueState.m * 100)"
    label="M"
    :max="100"
    :callback="(val: number) => handleCmyk({ c: valueState.c, m: val, y: valueState.y, k: valueState.k })"
  />
  <InputItem
    :input-val="round(valueState.y * 100)"
    label="Y"
    :max="100"
    :callback="(val: number) => handleCmyk({ c: valueState.c, m: valueState.m, y: val, k: valueState.k })"
  />
  <InputItem
    :input-val="round(valueState.k * 100)"
    label="K"
    :max="100"
    :callback="(val: number) => handleCmyk({ c: valueState.c, m: valueState.m, y: valueState.y, k: val })"
  />
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import { useColor } from '@/hooks/useColor'
import { round } from '@/utils/format'
import { rgb2cmyk, cmykToRgb } from '@/utils/convert'
import { InputType } from '@/enums'

const { colorState, handleChange } = useColor()

const handleCmyk = (value: any) => {
  const { r, g, b } = cmykToRgb(value)
  handleChange(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

const valueState = reactive({
  c: 0,
  m: 0,
  y: 0,
  k: 0,
})

watchEffect(() => {
  if (colorState.inputType === InputType.cmyk && colorState.hc) {
    const { c, m, y, k } = rgb2cmyk(
      colorState.hc?.r,
      colorState.hc?.g,
      colorState.hc?.b,
    )
    Object.assign(valueState, { c, m, y, k })
  }
})
</script>

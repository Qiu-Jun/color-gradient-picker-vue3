<template>
  <InputItem
    v-model:input-val="cmykState.c"
    label="C"
    :max="100"
    :callback="(val: number) => handleCmyk({c: val / 100, m: cmykState.m, y: cmykState.y, k: cmykState.k})"
  />
  <InputItem
    v-model:input-val="cmykState.m"
    label="M"
    :max="100"
    :callback="(val: number) => handleCmyk({ c: cmykState.c, m: val / 100, y: cmykState.y, k: cmykState.k })"
  />
  <InputItem
    v-model:input-val="cmykState.y"
    label="Y"
    :max="100"
    :callback="(val: number) => handleCmyk({ c: cmykState.c, m: cmykState.m, y: val / 100, k: cmykState.k })"
  />
  <InputItem
    v-model:input-val="cmykState.k"
    label="K"
    :max="100"
    :callback="(val: number) => handleCmyk({ c: cmykState.c, m: cmykState.m, y: cmykState.y, k: val / 100 })"
  />
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import { round } from '@/utils/format'
import { rgb2cmyk, cmykToRgb } from '@/utils/convert'
import { InputType } from '@/enums'

const { colorState, changeColor } = inject('colorProvider') as any

const handleCmyk = (value: any) => {
  const { r, g, b } = cmykToRgb(value)
  changeColor(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

const cmykState = reactive({
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
    Object.assign(cmykState, {
      c: round(c * 100),
      m: round(m * 100),
      y: round(y * 100),
      k: round(k * 100),
    })
  }
})
</script>

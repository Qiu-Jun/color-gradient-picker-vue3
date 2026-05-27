<template>
  <InputItem
    :input-val="red"
    label="R"
    :max="255"
    :callback="(val: number) => handleRgb({ r: val, g: colorState.hc?.g ?? 0, b: colorState.hc?.b ?? 0 })"
  />
  <InputItem
    :input-val="green"
    label="G"
    :max="255"
    :callback="(val: number) => handleRgb({ r: colorState.hc?.r ?? 0, g: val, b: colorState.hc?.b ?? 0 })"
  />
  <InputItem
    :input-val="blue"
    label="B"
    :max="255"
    :callback="(val: number) => handleRgb({ r: colorState.hc?.r ?? 0, g: colorState.hc?.g ?? 0, b: val })"
  />
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import { InputType } from '@/enums'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, changeColor } = inject(COLOR_PROVIDER_KEY)!
const red = ref(colorState.hc?.r)
const green = ref(colorState.hc?.g)
const blue = ref(colorState.hc?.b)
const handleRgb = ({ r, g, b }: { r: number; g: number; b: number }) => {
  changeColor(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a ?? 1})`)
}

watch(
  () => colorState.hc,
  (val) => {
    if (colorState.inputType === InputType.rgb && val) {
      const { r, g, b } = val
      red.value = r
      green.value = g
      blue.value = b
    }
  },
)
</script>

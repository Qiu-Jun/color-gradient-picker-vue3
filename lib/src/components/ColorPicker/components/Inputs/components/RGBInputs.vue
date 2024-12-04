<template>
  <InputItem
    :input-val="red"
    label="R"
    :max="255"
    :callback="(val: number) => handleRgb({ r: val, g: colorState.hc.g, b: colorState.hc.b })"
  />
  <InputItem
    :input-val="green"
    label="G"
    :max="255"
    :callback="(val: number) => handleRgb({ r: colorState.hc.r, g: val, b: colorState.hc.b })"
  />
  <InputItem
    :input-val="blue"
    label="B"
    :max="255"
    :callback="(val: number) => handleRgb({ r: colorState.hc.r, g: colorState.hc?.g, b: val })"
  />
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import { useColor } from '@/hooks/useColor'

const { colorState, handleChange } = useColor()
const red = ref(colorState.hc?.r)
const green = ref(colorState.hc?.g)
const blue = ref(colorState.hc?.n)
const handleRgb = ({ r, g, b }: { r: number; g: number; b: number }) => {
  handleChange(`rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`)
}

watch(
  () => colorState.hc,
  (val) => {
    const { r, g, b } = val
    red.value = r
    green.value = g
    blue.value = b
  },
)
</script>

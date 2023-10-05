<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 21:58:47
 * @LastEditors: June
 * @LastEditTime: 2023-10-06 02:19:20
-->
<template>
  <div>
    <CInput
      :value="RGBValue"
      :label="props.label"
      :type="props.type"
      :classes="props.label !== 'A' ? 'mr-8px' : ''"
      @input="onInput"
    />
  </div>
</template>

<script name="PreviewRGBItem" lang="ts" setup>
import CInput from '@c/CInput/index.vue'
import type { IColorState } from '@l/types'

interface Iprops {
  type: string
  label: string
}
const colorPickerState = inject('colorPickerState') as IColorState
const updateColor = inject('updateColor') as any
const props = withDefaults(defineProps<Iprops>(), {
  type: 'text',
  label: '',
})

const RGBValue = computed(() => {
  const {
    isGradient,
    red,
    green,
    blue,
    alpha,
    points = [],
    activePointIndex = 0,
  } = colorPickerState
  const activePoint = points[activePointIndex]
  let value: number | undefined = 0
  switch (props.label) {
    case 'R':
      value = isGradient ? activePoint.red! : red
      break
    case 'G':
      value = isGradient ? activePoint.green : green
      break
    case 'B':
      value = isGradient ? activePoint.blue : blue
      break
    case 'A':
      value = ~~((isGradient ? activePoint.alpha : alpha) * 100)
      break
    default:
      break
  }
  return value
})

const onInput = (event) => {
  let value = +event.target.value
  const { isGradient, points = [], activePointIndex = 0 } = colorPickerState
  // @ts-ignore
  const activePoint = points[activePointIndex]

  if (props.label === 'A' && value > 100) {
    value = 100
  } else if (value <= 0) {
    value = 0
  } else if (value > 255) {
    value = 255
  }
  switch (props.label) {
    case 'R':
      updateColor({ red: value }, 'red')
      break
    case 'G':
      updateColor({ green: value }, 'green')
      break
    case 'B':
      updateColor({ blue: value }, 'blue')
      break
    case 'A':
      updateColor({ alpha: value / 100 }, 'alpha')
      break
    default:
      break
  }
}
</script>

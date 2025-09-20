<!--
 * @Author: June
 * @Description: 渐变bar
 * @Date: 2024-12-04 21:20:20
 * @LastEditTime: 2024-12-09 14:52:25
 * @LastEditors: June
-->
<template>
  <div class="cpg-gradientBar-warp">
    <div
      class="cpg-gradientBar"
      :style="{ width: colorState.width + 'px', backgroundImage }"
      @mousedown="onMouseBarDown"
      @mousemove="onMousemove"
      @mouseup="stopDragging"
    ></div>
    <div
      v-for="(point, idx) in colorState.gradientColors"
      :key="point.value + idx"
      class="cpg-pointer"
      :class="{
        'cpg-pointer-centerPoint': colorState.gradientColorsIdx === idx,
        'cpg-cursor-pointer': dragging,
      }"
      :style="{ left: point.left! * leftMultiplyer + 'px' }"
      @mousedown="handlePoinDown($event, idx)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { getHandleValue } from '@/utils/utils'

const { colorState, handleGradient, addPoint, setSelectColorIdx } = inject(
  'colorProvider',
) as any
const leftMultiplyer = (colorState.width - 18) / 100

const backgroundImage = computed(() => {
  return colorState.gradientColor
    ? force90degLinear(colorState.gradientColor)
    : ''
})

const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}

const onMousemove = (e) => {
  if (unref(dragging)) {
    const { gradientColors, gradientColorsIdx } = colorState
    const color = gradientColors![gradientColorsIdx!].value
    handleGradient(color, getHandleValue(e))
  }
}

const handlePoinDown = (e: any, idx: number) => {
  e.stopPropagation()
  setSelectColorIdx(idx)
  dragging.value = true
}

const onMouseBarDown = (e: any) => {
  if (unref(dragging)) return
  const left = getHandleValue(e)
  addPoint(left)
  dragging.value = true
}

onMounted(() => {
  window.addEventListener('mouseup', stopDragging)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', stopDragging)
})

function force90degLinear(color: string) {
  return color.replace(
    /(radial|linear)-gradient\([^,]+,/,
    'linear-gradient(90deg,',
  )
}
</script>

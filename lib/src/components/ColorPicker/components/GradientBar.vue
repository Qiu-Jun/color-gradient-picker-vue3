<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 21:20:20
 * @LastEditTime: 2024-12-07 23:34:38
 * @LastEditors: June
-->
<template>
  <div class="cpg-gradientBar-warp">
    <div
      class="cpg-gradientBar"
      :style="{ width: colorState.width + 'px', backgroundImage }"
      @mousedown="handleDown"
    ></div>
    <div
      v-for="(point, idx) in colorState.gradientColors"
      :key="point.value + idx"
      class="cpg-pointer"
      :class="{
        'cpg-pointer-centerPoint': colorState.gradientColorsIdx === idx,
      }"
      :style="{ left: point.left! * leftMultiplyer + 'px' }"
      @mousedown.stop="() => false"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useColor } from '@/hooks/useColor'
import { low, high } from '@/utils/format'
import { getHandleValue } from '@/utils/utils'

const { colorState, addPoint } = useColor()
const leftMultiplyer = (colorState.width - 18) / 100

const backgroundImage = computed(() => {
  return colorState.gradientColor
    ? force90degLinear(colorState.gradientColor)
    : ''
})
const colors = computed(() => colorState.gradientColors)
const setSelectedColor = (index: number) => {
  // const newGradStr = colorState.gradientColors?.map(
  //   (cc: GradientProps, i: number) => ({
  //     ...cc,
  //     value: i === index ? high(cc) : low(cc),
  //   }),
  // )
  // createGradientStr(newGradStr)
}

const handleCreatePoint = (e) => {
  const left = getHandleValue(e)
  addPoint(left)
}

const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}

const handleDown = (e: any) => {
  if (unref(dragging)) return
  handleCreatePoint(e)
  dragging.value = true
}

const handleMove = (e: any) => {
  console.log('sdfsdf')
  if (unref(dragging)) return
  // handleGradient(currentColor, getHandleValue(e))
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

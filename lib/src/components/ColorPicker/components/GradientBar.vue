<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 21:20:20
 * @LastEditTime: 2024-12-07 10:51:44
 * @LastEditors: June
-->
<template>
  <div class="cpg-gradientBar-warp">
    <div
      class="cpg-gradientBar"
      :style="{ width: colorState.width + 'px', backgroundImage }"
      @mousedown="handleDown"
      @mousemove="test"
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
import { getColors, low, high } from '@/utils/format'
import { getHandleValue } from '@/utils/utils'
import type { GradientProps } from '@/interfaces'
const test = () => console.log('tes')
const { colorState, createGradientStr } = useColor()
const leftMultiplyer = (colorState.width - 18) / 100

const backgroundImage = computed(() => {
  return colorState.value ? force90degLinear(colorState.value) : ''
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
watch(
  () => colors.value,
  (val) => console.log(val, '哈哈哈哈啊'),
  { immediate: true },
)

const addPoint = (e) => {
  console.log(e, '--------------------------------------')
  const left = getHandleValue(e)
  console.log(left)
}

const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}

const handleDown = (e: any) => {
  if (unref(dragging)) return
  addPoint(e)
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

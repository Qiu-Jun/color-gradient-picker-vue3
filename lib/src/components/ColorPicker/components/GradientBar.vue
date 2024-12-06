<template>
  <div class="cpg-gradientBar-warp">
    <div
      class="cpg-gradientBar"
      :style="{ width: colorState.width + 'px', backgroundImage }"
    ></div>
    <div
      v-for="(point, idx) in colors"
      :key="point.value + idx"
      class="cpg-pointer"
      :class="{ 'cpg-pointer-centerPoint': selectColorIdx === idx }"
      :style="{ left: point.left * leftMultiplyer + 'px' }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useColor } from '@/hooks/useColor'
import { getColors, low, high } from '@/utils/format'
import type { GradientProps } from '@/interfaces'

const { colorState, selectColorIdx, createGradientStr } = useColor()
const leftMultiplyer = (colorState.width - 18) / 100

const backgroundImage = computed(() => {
  return colorState.value ? force90degLinear(colorState.value) : ''
})
const colors = computed(() => getColors(colorState.value!))
const setSelectedColor = (index: number) => {
  const newGradStr = colors.value?.map((cc: GradientProps, i: number) => ({
    ...cc,
    value: i === index ? high(cc) : low(cc),
  }))
  createGradientStr(newGradStr)
}
watch(
  () => colors.value,
  (val) => console.log(val, '哈哈哈哈啊'),
  { immediate: true },
)

const addPoint = () => {}

const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}

const handleDown = (e: any) => {
  if (unref(dragging)) return
  // addPoint(e)
  dragging.value = true
}

const handleMove = (e: any) => {
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

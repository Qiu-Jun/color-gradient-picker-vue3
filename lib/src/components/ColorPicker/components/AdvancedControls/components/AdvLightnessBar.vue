<template>
  <div class="cpg-advance-item" @mousemove="handleMove">
    <div
      class="cpg-pointer !top-1px"
      :style="{ left: left + 'px' }"
      @mousedown="handleDown"
    ></div>
    <div class="cpg-advance-text">Lightness</div>
    <canvas
      ref="canvasRef"
      class="cpg-advance-canvas"
      height="14"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { getHandleValue } from '@/utils/utils'
import { debounce } from 'lodash-es'
import tc from 'tinycolor2'
import { DEBOUNCE_DELAY } from '@/constants'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, tinycolor, changeColor } = inject(COLOR_PROVIDER_KEY)!
const canvasRef = ref<HTMLCanvasElement | null>(null)
const setLight = (value: number) => {
  const { s } = tinycolor.value.toHsl()
  const { r, g, b } = tc({
    h: colorState.hc?.h,
    s,
    l: value / 100,
  }).toRgb()
  changeColor(`rgba(${r},${g},${b},${colorState.hc?.a ?? 1})`)
}
const left = ref(0)

const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}
const handleDown = () => {
  dragging.value = true
}

const handleMove = (e: MouseEvent) => {
  if (unref(dragging)) {
    setLight(getHandleValue(e))
  }
}

const handleClick = debounce(function (e: MouseEvent) {
  if (!unref(dragging)) {
    setLight(getHandleValue(e))
  }
}, DEBOUNCE_DELAY)

watchEffect(() => {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const { s } = tinycolor.value.toHsl()
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  const hc = colorState.hc
  if (!hc) return

  ctx.rect(0, 0, colorState.width, 14)
  const gradient = ctx.createLinearGradient(0, 0, colorState.width, 0)
  for (let i = 0; i <= 100; i += 10) {
    gradient.addColorStop(i / 100, `hsl(${hc.h}, ${s * 100}%, ${i}%)`)
  }
  ctx.fillStyle = gradient
  ctx.fill()
})

watch(
  () => colorState.hc,
  (val) => {
    if (val && tinycolor.value) {
      const { l } = tinycolor.value.toHsl()
      left.value = l * (colorState.width! - 18)
    }
  },
)

onMounted(() => {
  window.addEventListener('mouseup', stopDragging)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', stopDragging)
})
</script>

<template>
  <section
    class="cpg-wrapper"
    :style="{
      width: `${colorState.width}px`,
    }"
    @mouseup="stopDragging"
    @touchend="stopDragging"
    @mousedown="handleCanvasDown"
    @touchstart="handleCanvasDown"
    @mousemove="handleMove"
  >
    <div class="cpg-wrapper">
      <span
        class="cpg-pointer"
        :style="{
          transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
        }"
        @mousedown="handleMouseDown"
      ></span>
      <canvas
        ref="canvasRef"
        class="cpg-picker-area"
        :style="{
          width: `${colorState.width}px`,
          height: `${colorState.height}px`,
        }"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { throttle } from 'lodash-es'
import { computePickerPosition, computeSquareXY } from '@/utils/utils'
import { config } from '@/constants'
import tc from 'tinycolor2'
import { useColor } from '@/hooks/useColor'

const { colorState, setValue } = useColor()
const { crossSize } = config

const canvasRef = ref<HTMLCanvasElement | null>(null)
const dragging = ref(false)
const setDragging = (val: boolean) => (dragging.value = val)
const stopDragging = () => {
  setDragging(false)
}
const dragPos = reactive({
  x: 0,
  y: 0,
})

const handleColor = throttle(function (e: any) {
  const [x, y] = computePickerPosition(e)
  if (x && y) {
    const width = colorState.width!
    const height = colorState.height!
    const x1 = Math.min(x + crossSize / 2, width - 1)
    const y1 = Math.min(y + crossSize / 2, height - 1)
    const newS = (x1 / width) * 100
    const newY = 100 - (y1 / height) * 100
    dragPos.x = newY === 0 ? dragPos?.x : x
    dragPos.y = y
    const updated = tc(
      `hsva(${colorState.hc?.h}, ${newS}%, ${newY}%, ${colorState.hc?.a})`,
    )
    setValue(updated.toRgbString())
  }
}, 200)

//   const onMouseMove = throttle(() => {
//     console.log(e)
//
//   }, 3000)

//   onMouseMove()
// }
const handleMove = throttle(function (e: any) {
  if (unref(dragging)) {
    handleColor(e)
  }
}, 180)
const handleCanvasDown = (e: any) => {
  setDragging(true)
  handleColor(e)
}
const handleMouseDown = () => {
  setDragging(true)
}
const handleUp = () => {
  stopDragging()
}

onMounted(() => {
  window.addEventListener('mouseup', handleUp)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', handleUp)
})

watch(
  () => [colorState.hc?.s, colorState.hc?.v],
  () => {
    const [x, y] = computeSquareXY(
      colorState.hc?.s,
      colorState.hc?.v * 100,
      colorState.width!,
      colorState.height!,
    )
    console.log(x, y)
    dragPos.x = x
    dragPos.y - y
  },
  { immediate: true },
)

// drawing
watchEffect(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const width = colorState.width!
    const height = colorState.height!
    const hue = colorState.hc?.h
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
      ctx.fillRect(0, 0, colorState.width!, height)
      const gradientWhite = ctx.createLinearGradient(0, 0, width, 0)
      gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`)
      gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`)
      ctx.fillStyle = gradientWhite
      ctx.fillRect(0, 0, width, height)
      const gradientBlack = ctx.createLinearGradient(0, 0, 0, height)
      gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`)
      gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`)
      ctx.fillStyle = gradientBlack
      ctx.fillRect(0, 0, width, height)
    }
  }
})
</script>

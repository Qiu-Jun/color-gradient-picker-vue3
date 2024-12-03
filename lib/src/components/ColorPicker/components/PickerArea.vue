<template>
  <section
    class="cpg-wrapper"
    :style="{
      width: `${context.width}px`,
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
          transform: `translate(${dragPos?.x ?? 0}px, ${dragPos?.y ?? 0}px)`,
        }"
        @mousedown="handleMouseDown"
      ></span>
      <canvas
        ref="canvasRef"
        class="cpg-picker-area"
        :style="{
          width: `${context.width}px`,
          height: `${context.height}px`,
        }"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { throttle } from 'lodash-es'
import { computePickerPosition, computeSquareXY } from '@/utils/utils'
import { config } from '@/constants'
import tinycolor from 'tinycolor2'
import type { IProvide } from '@/interfaces'

const context = inject('context') as IProvide
const { crossSize } = config
console.log(context, '333')
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
    const width = context.width
    const height = context.height
    const x1 = Math.min(x + crossSize / 2, width - 1)
    const y1 = Math.min(y + crossSize / 2, height - 1)
    const newS = (x1 / width) * 100
    const newY = 100 - (y1 / height) * 100
    dragPos.x = newY === 0 ? dragPos?.x : x
    dragPos.y = y
    console.log(dragPos)
    const updated = tinycolor(
      `hsva(${context.hc.value?.h}, ${newS}%, ${newY}%, ${context.hc.value?.a})`,
    )
    console.log(updated.toRgbString())
    // handleChange(updated.toRgbString())
  }
}, 200)

//   const onMouseMove = throttle(() => {
//     console.log(e)
//
//   }, 3000)

//   onMouseMove()
// }
const handleMove = (e: any) => {
  if (unref(dragging)) {
    handleColor(e)
  }
}
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

watchEffect(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.fillStyle = `hsl(${context.hc.h}, 100%, 50%)`
      ctx.fillRect(0, 0, context.width, context.height)
      const gradientWhite = ctx.createLinearGradient(0, 0, context.width, 0)
      gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`)
      gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`)
      ctx.fillStyle = gradientWhite
      ctx.fillRect(0, 0, context.width, context.height)
      const gradientBlack = ctx.createLinearGradient(0, 0, 0, context.height)
      gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`)
      gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`)
      ctx.fillStyle = gradientBlack
      ctx.fillRect(0, 0, context.width, context.height)
    }
  }
})
</script>

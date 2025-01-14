<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 11:02:31
 * @LastEditTime: 2024-12-09 14:31:43
 * @LastEditors: June
-->
<template>
  <div class="cpg-hue-wrap" @mousedown="handleDown" @mousemove="handleMove">
    <div
      class="cpg-pointer"
      :style="{ left: colorState.hc?.h * ((colorState.width! - 18) / 360) + 'px'}"
    ></div>

    <canvas
      ref="canvasRef"
      :width="colorState.width"
      height="14"
      class="cpg-hue-colors"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts" setup>
import tinycolor from 'tinycolor2'
import { debounce } from 'lodash-es'
import { getHandleValue } from '@/utils/utils'

const { colorState, isGradient, changeColor, setHcH, updateSelectColor } =
  inject('colorProvider') as any
// 渲染颜色
const canvasRef = ref<HTMLCanvasElement | null>(null)
const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}

const handleDown = () => {
  dragging.value = true
}

const handleHue = (e: any) => {
  const newHue = getHandleValue(e) * 3.6
  const tinyHsv = tinycolor({
    h: newHue,
    s: colorState.hc?.s,
    v: colorState.hc?.v,
  })
  const { r, g, b } = tinyHsv.toRgb()
  setHcH(newHue)
  const rgbaColor = `rgba(${r}, ${g}, ${b}, ${colorState.hc.a})`
  unref(isGradient) ? updateSelectColor(rgbaColor) : changeColor(rgbaColor)
}
const handleMove = (e: any) => {
  if (unref(dragging)) {
    handleHue(e)
  }
}
const handleClick = debounce(function (e) {
  if (!unref(dragging)) {
    handleHue(e)
  }
}, 250)

onMounted(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, colorState.width!, 14)

      const gradient = ctx.createLinearGradient(0, 0, colorState.width!, 0)
      for (let i = 0; i <= 360; i += 30) {
        gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }
  window.addEventListener('mouseup', stopDragging)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', stopDragging)
})
</script>

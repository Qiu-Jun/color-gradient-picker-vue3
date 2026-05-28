<!--
 * @Author: June
 * @Description: 色相条组件
 * @Date: 2024-12-03 11:02:31
 * @LastEditTime: 2024-12-09 14:31:43
 * @LastEditors: June
-->
<template>
  <div
    class="cpg-hue-wrap"
    @mousedown="onMousedown"
    @touchstart="onMousedown"
    @mousemove="onMousemove"
    @touchmove="onMousemove"
    @mouseup="stopDragging"
    @touchend="stopDragging"
  >
    <div
      class="cpg-pointer"
      :class="{ 'cpg-cursor-pointer': dragging }"
      :style="{ left: (colorState.hc?.h || 0) * ((colorState.width! - 18) / 360) + 'px'}"
    ></div>

    <canvas
      ref="canvasRef"
      :width="colorState.width"
      :height="BAR_HEIGHT"
      class="cpg-hue-colors"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts" setup>
import tinycolor from 'tinycolor2'
import { debounce, throttle } from 'lodash-es'
import { getHandleValue } from '@/utils/utils'
import { THROTTLE_DELAY, DEBOUNCE_DELAY, BAR_HEIGHT } from '@/constants'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, isGradient, changeColor, setHcH, updateSelectColor } =
  inject(COLOR_PROVIDER_KEY)!
// 渲染颜色
const canvasRef = ref<HTMLCanvasElement | null>(null)
const dragging = ref(false)
const stopDragging = () => {
  dragging.value = false
}

const onMousedown = () => {
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
  const rgbaColor = `rgba(${r}, ${g}, ${b}, ${colorState.hc?.a || 1})`
  unref(isGradient) ? updateSelectColor(rgbaColor) : changeColor(rgbaColor)
}
const onMousemove = throttle(function (e: any) {
  if (unref(dragging)) {
    e.preventDefault()
    handleHue(e)
  }
}, THROTTLE_DELAY)

const handleClick = debounce(function (e) {
  if (!unref(dragging)) {
    handleHue(e)
  }
}, DEBOUNCE_DELAY)

onMounted(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, colorState.width!, BAR_HEIGHT)

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

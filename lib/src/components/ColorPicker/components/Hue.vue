<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 11:02:31
 * @LastEditTime: 2024-12-04 18:28:11
 * @LastEditors: June
-->
<template>
  <div class="cpg-hue-wrap">
    <div class="cpg-pointer"></div>

    <canvas
      ref="canvasRef"
      :width="colorState.width"
      height="14"
      class="cpg-hue-colors"
    />
  </div>
</template>

<script lang="ts" setup>
import { useColor } from '@/hooks/useColor'

const { colorState } = useColor()
// 渲染颜色
const canvasRef = ref<HTMLCanvasElement | null>(null)
watchEffect(() => {
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
})
</script>

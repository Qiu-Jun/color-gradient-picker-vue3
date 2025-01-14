<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-05 13:49:21
 * @LastEditTime: 2024-12-05 15:02:54
 * @LastEditors: June
-->
<template>
  <div class="cpg-advance-item">
    <div class="cpg-pointer !top-1px"></div>
    <div class="cpg-advance-text">Saturation</div>
    <canvas ref="canvasRef" class="cpg-advance-canvas" height="14" />
  </div>
</template>

<script lang="ts" setup>
const { colorState, tinycolor } = inject('colorProvider') as any

const canvasRef = ref<HTMLCanvasElement | null>(null)

watchEffect(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const { l } = tinycolor.value.toHsl()
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, colorState.width, 14)

      const gradient = ctx.createLinearGradient(0, 0, colorState.width, 0)
      for (let i = 0; i <= 100; i += 10) {
        gradient.addColorStop(
          i / 100,
          `hsl(${colorState.hc.h}, ${i}%, ${l * 100}%)`,
        )
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }
})
</script>

<template>
  <div class="cpg-advance-item">
    <div class="cpg-pointer !top-1px"></div>
    <div class="cpg-advance-text">Brightness</div>
    <canvas ref="canvasRef" class="cpg-advance-canvas" height="14" />
  </div>
</template>

<script lang="ts" setup>
import { useColor } from '@/hooks/useColor'
import tc from 'tinycolor2'

const { colorState, tinycolor } = useColor()

const canvasRef = ref<HTMLCanvasElement | null>(null)

watchEffect(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const { s } = tinycolor.value.toHsl()
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, colorState.width, 14)

      const gradient = ctx.createLinearGradient(0, 0, colorState.width, 0)
      for (let i = 0; i <= 100; i += 10) {
        const hsl = tc({ h: colorState.hc.h, s: s * 100, v: i })
        gradient.addColorStop(i / 100, hsl.toHslString())
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }
})
</script>

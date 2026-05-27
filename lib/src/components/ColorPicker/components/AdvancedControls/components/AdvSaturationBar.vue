<template>
  <div class="cpg-advance-item">
    <div class="cpg-pointer !top-1px"></div>
    <div class="cpg-advance-text">Saturation</div>
    <canvas ref="canvasRef" class="cpg-advance-canvas" height="14" />
  </div>
</template>

<script lang="ts" setup>
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, tinycolor } = inject(COLOR_PROVIDER_KEY)!

const canvasRef = ref<HTMLCanvasElement | null>(null)

watchEffect(() => {
  const canvas = unref(canvasRef)
  if (!canvas) return
  const hc = colorState.hc
  if (!hc) return
  const { l } = tinycolor.value.toHsl()
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  ctx.rect(0, 0, colorState.width, 14)
  const gradient = ctx.createLinearGradient(0, 0, colorState.width, 0)
  for (let i = 0; i <= 100; i += 10) {
    gradient.addColorStop(i / 100, `hsl(${hc.h}, ${i}%, ${l * 100}%)`)
  }
  ctx.fillStyle = gradient
  ctx.fill()
})
</script>

<template>
  <div class="cpg-hue-wrap">
    <div class="cpg-pointer"></div>
    <canvas
      ref="canvasRef"
      height="14"
      :width="context.width"
      class="cpg-hue-colors"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IProvide } from '@/interfaces'

const context = inject('context') as IProvide
// 渲染颜色
const canvasRef = ref<HTMLCanvasElement | null>(null)
watchEffect(() => {
  const canvas = unref(canvasRef)
  if (canvas) {
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, context.width, 14)

      const gradient = ctx.createLinearGradient(0, 0, context.width, 0)
      for (let i = 0; i <= 360; i += 30) {
        gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }
})
</script>

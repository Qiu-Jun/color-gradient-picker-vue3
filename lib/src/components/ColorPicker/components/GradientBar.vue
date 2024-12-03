<template>
  <div class="cpg-gradientBar-warp">
    <div class="cpg-gradientBar bg-red" :style="{ backgroundImage }"></div>
    <div class="cpg-pointer"></div>
  </div>
</template>

<script lang="ts" setup>
import type { IProvide } from '@/interfaces'

const context = inject('context') as IProvide
const backgroundImage = computed(() => {
  if (context.value) {
    console.log(force90degLinear(context.value), 'SSSSSSSSSSSSSS')
    return force90degLinear(context.value)
  } else {
    return ''
  }
})

function force90degLinear(color: string) {
  return color.replace(
    /(radial|linear)-gradient\([^,]+,/,
    'linear-gradient(90deg,',
  )
}
</script>

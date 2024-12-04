<template>
  <div class="cpg-gradientBar-warp">
    <div class="cpg-gradientBar bg-red" :style="{ backgroundImage }"></div>
    <div class="cpg-pointer"></div>
  </div>
</template>

<script lang="ts" setup>
const backgroundImage = computed(() => {
  return ''
})

function force90degLinear(color: string) {
  return color.replace(
    /(radial|linear)-gradient\([^,]+,/,
    'linear-gradient(90deg,',
  )
}
</script>

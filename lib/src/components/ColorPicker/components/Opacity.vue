<!--
 * @Author: June
 * @Description: 透明度条组件
 * @Date: 2024-12-02 12:33:56
 * @LastEditTime: 2024-12-16 17:48:28
 * @LastEditors: June
-->
<template>
  <section
    class="cpg-opacity-wrap"
    @mousedown="onMousedown"
    @touchstart="onMousedown"
    @mousemove="onMouseMove"
    @touchmove="onMouseMove"
    @mouseup="stopDragging"
    @touchend="stopDragging"
  >
    <div class="cpg-opacity-bar"></div>
    <div
      class="cpg-pointer"
      :class="{ 'cpg-cursor-pointer': dragging }"
      :style="{ left: left * (colorState.hc?.a ?? 1) + 'px' }"
    ></div>
    <div
      class="cpg-opacity-color"
      :style="{ background: bg }"
      @click="handleClick"
    ></div>
  </section>
</template>

<script lang="ts" setup>
import { getHandleValue } from '@/utils/utils'
import { throttle } from 'lodash-es'
import { config, THROTTLE_DELAY } from '@/constants'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, changeColor } = inject(COLOR_PROVIDER_KEY)!
const { barSize } = config
const dragging = ref(false)
const left = ref(colorState.width! - barSize)
const bg = computed(() => {
  if (colorState.hc) {
    const { r, g, b } = colorState.hc
    return `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`
  }
  return ''
})
const stopDragging = () => {
  dragging.value = false
}

const onMousedown = () => {
  dragging.value = true
}

const handleOpacity = (e: any) => {
  if (!colorState.hc) return
  const { r, g, b } = colorState.hc
  const newO = getHandleValue(e) / 100
  const newColor = `rgba(${r}, ${g}, ${b}, ${newO})`
  changeColor(newColor)
}

const onMouseMove = throttle(function (e: any) {
  if (unref(dragging)) {
    e.preventDefault()
    handleOpacity(e)
  }
}, THROTTLE_DELAY)

const handleClick = (e: any) => {
  if (!unref(dragging)) {
    handleOpacity(e)
  }
}

onMounted(() => {
  window.addEventListener('mouseup', stopDragging)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', stopDragging)
})
</script>

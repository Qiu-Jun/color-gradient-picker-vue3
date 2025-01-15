<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-02 12:33:56
 * @LastEditTime: 2024-12-16 17:48:28
 * @LastEditors: June
-->
<template>
  <section
    class="cpg-opacity-wrap"
    @mousedown="onMousedown"
    @mousemove="onMouseMove"
    @mouseup="stopDragging"
  >
    <div class="cpg-opacity-bar"></div>
    <div
      class="cpg-pointer"
      :class="{ 'cpg-cursor-pointer': dragging }"
      :style="{ left: left * colorState.hc?.a + 'px' }"
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

const { colorState, changeColor } = inject('colorProvider') as any
const dragging = ref(false)
const left = ref(colorState.width! - 18) //  18是point的大小
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
    handleOpacity(e)
  }
}, 80)

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

<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 11:42:48
 * @LastEditTime: 2024-12-04 18:32:53
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputItem-wrap" :style="{ width }">
    <input v-model="hexVal" class="cpg-input" @change="onChange" />
    <div class="cpg-input-label">HEX</div>
  </div>
</template>

<script lang="ts" setup>
import tc from 'tinycolor2'
import { SETCOLOR_MODE } from '@/enums'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, setValue, isGradient } = inject(COLOR_PROVIDER_KEY)!
const hexVal = ref('')
const width = computed(() => {
  if (unref(isGradient)) {
    return colorState.hideOpacity ? '20%' : '16%'
  }
  return '23%'
})

const hexFromHc = () => {
  const hc = colorState.hc
  if (!hc) return ''
  return tc({ r: hc.r, g: hc.g, b: hc.b }).toHex()
}

const onChange = (e) => {
  const tinyHex = tc(e.target.value)
  if (tinyHex.isValid()) {
    const { r, g, b } = tinyHex.toRgb()
    const newColor = `rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`
    setValue(newColor, SETCOLOR_MODE.input)
  } else {
    hexVal.value = hexFromHc()
  }
}

watchEffect(() => {
  if (colorState.hc) {
    hexVal.value = hexFromHc()
  }
})
</script>

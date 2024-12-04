<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 11:42:48
 * @LastEditTime: 2024-12-04 18:32:53
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputItem-wrap" style="width: 23%">
    <input v-model="hexVal" class="cpg-input" @change="onChange" />
    <div class="cpg-input-label">HEX</div>
  </div>
</template>

<script lang="ts" setup>
import { useColor } from '@/hooks/useColor'
import tc from 'tinycolor2'

const { colorState, setValue } = useColor()
const hexVal = ref('')

const onChange = (e) => {
  const tinyHex = tc(e.target.value)
  if (tinyHex.isValid()) {
    const { r, g, b } = tinyHex.toRgb()
    const newColor = `rgba(${r}, ${g}, ${b}, ${colorState.hc?.a})`
    setValue(newColor)
  } else {
    hexVal.value = tc(colorState.value)?.toHex()
  }
}

watchEffect(() => {
  if (colorState.value) {
    hexVal.value = tc(colorState.value)?.toHex()
  }
})
</script>

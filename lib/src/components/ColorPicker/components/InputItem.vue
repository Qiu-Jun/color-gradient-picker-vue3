<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 19:05:04
 * @LastEditTime: 2024-12-03 20:21:16
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputItem-wrap" :style="{ width: props.width }">
    <input class="cpg-input" :value="inputVal" />
    <div class="cpg-input-label">{{ props.label }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  inputVal: {
    type: [String, Number],
    default: 0,
  },
  width: {
    type: String,
    default: '0px',
  },
  label: {
    type: String,
    default: '',
  },
})

const inputVal = ref(props.inputVal)
</script>

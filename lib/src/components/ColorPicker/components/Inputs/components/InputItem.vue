<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 19:05:04
 * @LastEditTime: 2024-12-06 11:57:14
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputItem-wrap" :style="{ width }">
    <input v-model="inputVal" class="cpg-input" @change="onChange" />
    <div class="cpg-input-label">{{ props.label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { formatInputValues } from '@/utils/format'

const { colorState } = inject('colorProvider') as any
const width = computed(() => (colorState.hideOpacity ? '22%' : '18%'))

const emits = defineEmits(['update:inputVal'])
const props = defineProps({
  inputVal: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  label: {
    type: String,
    default: '',
  },
  callback: {
    type: Function,
  },
})

const inputVal = ref<number>(0)

const onChange = (e) => {
  const newVal = formatInputValues(parseFloat(e.target.value), 0, props.max)
  inputVal.value = newVal
  emits('update:inputVal', newVal)
  props.callback &&
    typeof props.callback === 'function' &&
    props.callback(newVal)
}

watchEffect(() => {
  if (props.inputVal || props.inputVal === 0) {
    inputVal.value = ~~props.inputVal
  }
})
</script>

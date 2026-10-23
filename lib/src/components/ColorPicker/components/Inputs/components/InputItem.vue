<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 19:05:04
 * @LastEditTime: 2024-12-06 11:57:14
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputItem-wrap" :style="{ width }">
    <input
      v-model.number="inputVal"
      type="number"
      class="cpg-input"
      :min="min"
      :max="max"
      :step="step"
      @change="onChange"
      @input="onChange"
    />
    <div class="cpg-input-label">{{ props.label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { formatInputValues } from '@/utils/format'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const { colorState, isGradient } = inject(COLOR_PROVIDER_KEY)!
const width = computed(() => {
  if (unref(isGradient)) {
    return colorState.hideOpacity ? '18%' : '14%'
  }
  return colorState.hideOpacity ? '22%' : '18%'
})

const emits = defineEmits(['update:inputVal'])
const props = defineProps({
  inputVal: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: [Number, String],
    default: 1,
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

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const newVal = formatInputValues(parseFloat(target.value), props.min, props.max)
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

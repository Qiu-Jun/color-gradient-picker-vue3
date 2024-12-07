<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2024-12-07 20:53:32
 * @LastEditors: June
-->
<template>
  <div class="cpg-box">
    <!-- PickerArea -->
    <PickerArea />

    <template v-if="!props.hideControls">
      <!-- operation -->
      <Operation />

      <!-- AdvancedControls -->
      <AdvancedControls v-if="colorState.showAdvancedSliders" />

      <!-- gradient operation -->
      <OperationGradient v-if="!props.hideGradientControls && isGradient" />
    </template>

    <!-- GradientBar -->
    <GradientBar v-if="!props.hideGradientControls && isGradient" />

    <!-- Hue -->
    <Hue />

    <!-- Opacity -->
    <Opacity v-if="!props.hideOpacity" />

    <!-- Inputs -->
    <Inputs v-if="!props.hideInputs" />

    <!-- Preview -->
    <Preview />
  </div>
</template>

<script lang="ts" setup>
import {
  Opacity,
  PickerArea,
  Operation,
  OperationGradient,
  Preview,
  GradientBar,
  Inputs,
  Hue,
  AdvancedControls,
} from './components'
import { useColor } from '@/hooks/useColor'
import type { IColor } from '@/interfaces'

const emits = defineEmits(['update:value', 'change'])
const { init, colorState, isGradient } = useColor()

watch(
  () => colorState,
  (val) => console.log(val, '监听colorState'),
  { immediate: true },
)

const props = defineProps({
  value: {
    type: String,
    default: 'rgba(175, 51, 242, 1)',
  },
  hideControls: {
    type: Boolean,
    default: false,
  },
  hideInputs: {
    type: Boolean,
    default: false,
  },
  hideOpacity: {
    type: Boolean,
    default: false,
  },
  hidePresets: {
    type: Boolean,
    default: false,
  },
  hideColorGuide: {
    type: Boolean,
    default: false,
  },
  hideGradientControls: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 300,
  },
  disableDarkMode: {
    type: Boolean,
    default: false,
  },
  disableLightMode: {
    type: Boolean,
    default: false,
  },
})

const onChange = (val: IColor) => {
  emits('update:value', val.color)
  emits('change', { ...val })
}
init(props, onChange)
</script>

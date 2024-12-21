<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2024-12-21 13:56:09
 * @LastEditors: June
-->
<template>
  <div class="cpg-box" :style="{ width: props.width + 'px' }">
    <!-- PickerArea -->
    <PickerArea />

    <!-- operation -->
    <Operation />

    <!-- AdvancedControls -->
    <AdvancedControls v-if="colorState.showAdvancedSliders" />

    <!-- gradient operation -->
    <OperationGradient v-if="!colorState.hideGradient && isGradient" />

    <!-- GradientBar -->
    <GradientBar v-if="!colorState.hideGradient && isGradient" />

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

const props = defineProps({
  value: {
    type: String,
    default: 'rgba(175, 51, 242, 1)',
  },
  width: {
    type: Number,
    default: 300,
  },
  hideInputs: {
    type: Boolean,
    default: false,
  },
  hideOpacity: {
    type: Boolean,
    default: false,
  },
  hideGradient: {
    type: Boolean,
    default: false,
  },
  hidePresets: {
    type: Boolean,
    default: false,
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

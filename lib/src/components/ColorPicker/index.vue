<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2024-12-04 19:07:55
 * @LastEditors: June
-->
<template>
  <div class="cpg-box">
    <!-- PickerArea -->
    <PickerArea />

    <template v-if="!props.hideControls">
      <!-- operation -->
      <Operation />

      <!-- gradient operation -->
      <OperationGradient
        v-if="!props.hideGradientControls && colorState.isGradient"
      />
    </template>

    <!-- GradientBar -->
    <GradientBar v-if="!props.hideGradientControls && colorState.isGradient" />

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
} from './components'
import { useColor } from '@/hooks/useColor'

const { init, colorState } = useColor()

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
init(props)
</script>

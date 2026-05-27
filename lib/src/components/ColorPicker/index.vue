<!--
 * @Author: June
 * @Description: Vue3颜色选择器主组件
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2025-09-02 14:05:14
 * @LastEditors: June 1601745371@qq.com
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
import { presetColors } from '@/constants'
import {
  InputType,
  DEFAULT_VALUES,
} from '@/enums'
import {
  COLOR_PROVIDER_KEY,
  type IColor,
  type ILocales,
} from '@/interfaces'
import { useColorProvider } from '@/composables/useColorProvider'

const emits = defineEmits<{
  'update:value': [value: string]
  change: [color: IColor]
}>()

const props = withDefaults(
  defineProps<{
    locale: ILocales
    value?: string
    width?: number
    hideInputs?: boolean
    hideOpacity?: boolean
    hideGradient?: boolean
    presetColors?: string[]
    hidePresets?: boolean
    showAdvancedSliders?: boolean
    inputType?: InputType
  }>(),
  {
    locale: DEFAULT_VALUES.LOCALE,
    value: DEFAULT_VALUES.DEFAULT_COLOR,
    width: DEFAULT_VALUES.DEFAULT_WIDTH,
    hideInputs: false,
    hideOpacity: false,
    hideGradient: false,
    presetColors: () => presetColors,
    hidePresets: false,
    showAdvancedSliders: false,
    inputType: InputType.rgb,
  },
)

const { colorState, isGradient, colorProvider } = useColorProvider(props, emits)

provide(COLOR_PROVIDER_KEY, colorProvider)
</script>

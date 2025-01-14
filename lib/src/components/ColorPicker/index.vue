<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:19:44
 * @LastEditTime: 2024-12-22 00:06:48
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
import { presetColors } from '@/constants'
import { getColors, formatInputValues, low, high } from '@/utils/format'
import { getDetails, getIsGradient } from '@/utils/utils'
import tc from 'tinycolor2'
import { InputType, GradientType, Modes } from '@/enums'
import { cloneDeep } from 'lodash-es'
import { createGradientStr } from '@/utils/color'
import type {
  IColor,
  ColorPickerProps,
  GradientProps,
  IMode,
} from '@/interfaces'

const emits = defineEmits(['update:value', 'change'])
// const { init, colorState, isGradient } = useColor()

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
  presetColors: {
    type: Array as PropType<string[]>,
    default: () => presetColors,
  },
  hidePresets: {
    type: Boolean,
    default: false,
  },
})

const colorState = reactive<ColorPickerProps>({
  width: 300,
  height: 300,
  showAdvancedSliders: false,
  mode: Modes.solid,
  degrees: 90,
  degreesStr: '',
  gradientColor: '',
  gradientColors: [],
  gradientColorsIdx: 0,
})
// 渐变类型
const gradientType = ref<GradientType>(GradientType.linear)
const tinycolor = ref<typeof tc | null>(null)

const onChange = (val: IColor) => {
  emits('update:value', val.color)
  emits('change', { ...val })
}

// 渐变类型
const isGradient = computed(() => colorState.mode === Modes.gradient)
// 设置纯色或渐变模式
const setMode = (mode: IMode) => {
  if (mode === Modes.solid) {
    colorState.degrees = 90
    colorState.gradientColors = []
    colorState.gradientColorsIdx = 0
  }
  colorState.mode = mode
}

// 更新颜色
const setValue = (color?: string) => {
  const _color = color || colorState.value!
  const colors: GradientProps[] = getColors(_color)
  const { degreeStr } = getDetails(_color)
  if (unref(isGradient)) {
    colorState.degreesStr = degreeStr
    colorState.gradientColors = colors
    colorState.gradientColor = createGradientStr(
      colors,
      unref(gradientType),
      colorState,
    )
    tinycolor.value = tc(
      colorState.gradientColors[colorState.gradientColorsIdx!].value,
    )
    // colorState.gradientColors[colorState.gradientColorsIdx].value = color
  } else {
    colorState.value = colors[0].value?.replace(/\s+/g, '')
    tinycolor.value = tc(colors[0].value)
  }
  const rgba = tinycolor.value.toRgb()
  const hsv = tinycolor.value.toHsv()
  colorState.hc = { ...rgba, s: hsv.s, v: hsv.v, h: hsv.h === 0 ? colorState.hc?.h : hsv.h }
  if (onChange) {
    if (unref(isGradient)) {
      onChange({
        color: colorState.gradientColor,
        mode: colorState.mode,
        degrees: colorState.degrees,
        gradientType: unref(gradientType),
        gradientColors: cloneDeep(
          colorState.gradientColors?.map((i: GradientProps) => ({
            color: i.value?.toLowerCase(),
            left: i.left,
          })),
        ),
      })
    } else {
      onChange({
        color: colorState.value,
        mode: colorState.mode,
      })
    }
  }
}

const updateSelectColor = (value: string) => {
  const colors = colorState.gradientColors || []
  const colorValue = colors[colorState.gradientColorsIdx!]
  if (!colorValue) return
  colorValue.value = value
  const newGradStr = createGradientStr(colors, unref(gradientType), colorState)
  setValue(newGradStr)
}

const handleGradient = (newColor: string, left?: number) => {
  const colors = colorState.gradientColors || []
  const colorValue = colors[colorState.gradientColorsIdx!]
  if (!colorValue) return
  colorValue.left = left ?? colorValue.left
  colorValue.value = newColor
  const newGradStr = createGradientStr(colors, unref(gradientType), colorState)
  setValue(newGradStr)
}

const changeColor = (newColor: string) => {
  if (unref(isGradient)) {
    handleGradient(newColor)
  } else {
    setValue(newColor)
  }
}

const setHcH = (h: number) => {
  if (colorState.hc?.h) {
    colorState.hc.h = h
  }
}

const setSelectColorIdx = (idx: number) => {
  colorState.gradientColorsIdx = idx
  // warning: Here is update hc， but not need to handle onChange
  tinycolor.value = tc(
    colorState.gradientColors![colorState.gradientColorsIdx!].value,
  )
  const rgba = tinycolor.value.toRgb()
  const hsv = tinycolor.value.toHsv()
  colorState.hc = { ...rgba, ...hsv, }
}

// 设置inputs的类型
const setInputType = (type: InputType) => {
  colorState.inputType = type
}

// 设置线性渐变
const setLinear = () => {
  const value = colorState.gradientColor?.split(/,(.+)/)[1]
  value && setValue(`linear-gradient(90deg, ${value}`)
  gradientType.value = GradientType.linear
}

// 设置径向渐变
const setRadial = () => {
  const value = colorState.gradientColor?.split(/,(.+)/)[1]
  value && setValue(`radial-gradient(circle, ${value}`)
  gradientType.value = GradientType.radial
}

// 设置角度
const setDegrees = (val: number) => {
  if (gradientType.value !== GradientType.linear)
    return console.log(
      'Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired',
    )

  const remaining = colorState.gradientColor?.split(/,(.+)/)[1]
  if (!remaining) return
  colorState.degrees = val
  setValue(`linear-gradient(${formatInputValues(val, 0, 360)}deg, ${remaining}`)
}

// 添加渐变点
const addPoint = (left: number) => {
  if (!left && left !== 0) {
    console.log(
      'You did not pass a stop value (left amount) for the new color point so it defaulted to 50',
    )
  }
  const colors = cloneDeep(colorState.gradientColors!)
  const curColorValue = colors[colorState.gradientColorsIdx!]

  const newColors = [
    ...colors?.map((c: GradientProps) => ({
      ...c,
      value: low(c),
    })),
    { value: curColorValue.value, left: left },
  ]?.sort((a: any, b: any) => a.left - b.left)

  colorState.gradientColorsIdx = newColors.findIndex((i) => i.left === left)
  const color = createGradientStr(newColors, unref(gradientType), colorState)
  setValue(color)
}

// 删除渐变点
const deletePoint = (index?: number) => {
  const colors = colorState.gradientColors
  if (colors && colors?.length > 2) {
    const pointToDelete = index ?? colorState.gradientColorsIdx
    const remaining = colors?.filter(
      (rc: GradientProps, i: number) => i !== pointToDelete,
    )
    colorState.gradientColors = cloneDeep(remaining)

    const newGradientColor = createGradientStr(
      remaining,
      unref(gradientType),
      colorState,
    )
    setValue(newGradientColor)
  } else {
    console.log(
      'A gradient must have atleast two colors, disable your delete button when necessary',
    )
  }
}

const init = () => {
  Object.assign(colorState, props)
  colorState.width = props.width <= 320 ? 304 : props.width - 16
  colorState.height = props.width // 让宽等于高，area区域称为正方形
  // 控制预设色最多18个
  if (colorState.presetColors && colorState.presetColors?.length > 18) {
    colorState.presetColors.length = 18
  }
  if (colorState.value) {
    const isGradient = getIsGradient(colorState.value)
    colorState.inputType = InputType.rgb
    setMode(isGradient ? Modes.gradient : Modes.solid)
    setValue(colorState.value)
  }
}

const colorProvider = {
  isGradient,
  colorState,
  tinycolor,
  gradientType,
  setValue,
  setMode,
  updateSelectColor,
  handleGradient,
  changeColor,
  setHcH,
  setInputType,
  setLinear,
  setRadial,
  setDegrees,
  setSelectColorIdx,
  addPoint,
  deletePoint,
}

init()
provide('colorProvider', colorProvider)
// init(props, onChange)
</script>

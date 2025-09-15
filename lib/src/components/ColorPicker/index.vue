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
import { getColors, formatInputValues, low, high } from '@/utils/format'
import { getDetails, getIsGradient } from '@/utils/utils'
import tc from 'tinycolor2'
import { InputType, GradientType, Modes, DEFAULT_VALUES } from '@/enums'
import { cloneDeep } from 'lodash-es'
import { createGradientStr, isValidColor } from '@/utils/color'
import type {
  IColor,
  ColorPickerProps,
  GradientProps,
  IMode,
  IColorValue,
  IColorPicker,
} from '@/interfaces'

// 定义事件
const emits = defineEmits<{
  'update:value': [value: string]
  change: [color: IColor]
}>()

// 定义属性
const props = withDefaults(
  defineProps<{
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

// 响应式状态
const colorState = reactive<ColorPickerProps>({
  width: DEFAULT_VALUES.DEFAULT_WIDTH,
  height: DEFAULT_VALUES.DEFAULT_WIDTH,
  showAdvancedSliders: false,
  mode: Modes.solid,
  degrees: DEFAULT_VALUES.DEFAULT_DEGREES,
  degreesStr: '',
  gradientColor: '',
  gradientColors: [],
  gradientColorsIdx: 0,
  value: DEFAULT_VALUES.DEFAULT_COLOR,
  inputType: InputType.rgb,
  presetColors: presetColors,
})

// 渐变类型
const gradientType = ref<GradientType>(GradientType.linear)
const tinycolor = ref<typeof tc | null>(null)

/**
 * 颜色变化回调函数
 */
const onChange = (val: IColor) => {
  if (val.color) {
    emits('update:value', val.color)
    emits('change', { ...val })
  }
}

// 计算属性
const isGradient = computed(() => colorState.mode === Modes.gradient)

/**
 * 设置纯色或渐变模式
 */
const setMode = (mode: IMode) => {
  if (mode === Modes.solid) {
    colorState.degrees = DEFAULT_VALUES.DEFAULT_DEGREES
    colorState.gradientColors = []
    colorState.gradientColorsIdx = 0
  }
  colorState.mode = mode
}

/**
 * 更新颜色值
 */
const setValue = (color?: string) => {
  const _color = color || colorState.value || DEFAULT_VALUES.DEFAULT_COLOR

  if (!isValidColor(_color)) {
    console.warn('setValue: invalid color provided', _color)
    return
  }

  const colors: GradientProps[] = getColors(_color)
  const { degreeStr, degrees } = getDetails(_color)

  if (unref(isGradient)) {
    colorState.degrees = degrees
    colorState.degreesStr = degreeStr
    colorState.gradientColors = colors
    colorState.gradientColor = createGradientStr(
      colors,
      unref(gradientType),
      colorState,
    )

    const currentColor =
      colorState.gradientColors[colorState.gradientColorsIdx || 0]
    if (currentColor) {
      tinycolor.value = tc(currentColor.value)
    }
  } else {
    const solidColor =
      colors[0]?.value?.replace(/\s+/g, '') || DEFAULT_VALUES.DEFAULT_COLOR
    colorState.value = solidColor
    tinycolor.value = tc(solidColor)
  }

  // 更新颜色对象
  if (tinycolor.value) {
    const rgba = tinycolor.value.toRgb()
    const hsv = tinycolor.value.toHsv()
    colorState.hc = {
      ...rgba,
      s: hsv.s,
      v: hsv.v,
      h: hsv.h === 0 ? colorState.hc?.h || 0.1 : hsv.h,
    } as IColorValue
  }

  // 触发回调
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
            left: i.left || 0,
          })) || [],
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

/**
 * 更新选中的颜色
 */
const updateSelectColor = (value: string) => {
  if (!isValidColor(value)) {
    console.warn('updateSelectColor: invalid color value', value)
    return
  }

  const colors = colorState.gradientColors || []
  const colorValue = colors[colorState.gradientColorsIdx || 0]
  if (!colorValue) return

  colorValue.value = value
  const newGradStr = createGradientStr(colors, unref(gradientType), colorState)
  setValue(newGradStr)
}

/**
 * 处理渐变颜色变化
 */
const handleGradient = (newColor: string, left?: number) => {
  if (!isValidColor(newColor)) {
    console.warn('handleGradient: invalid color value', newColor)
    return
  }

  const colors = colorState.gradientColors || []
  const colorValue = colors[colorState.gradientColorsIdx || 0]
  if (!colorValue) return

  colorValue.left = left ?? colorValue.left
  colorValue.value = newColor
  const newGradStr = createGradientStr(colors, unref(gradientType), colorState)
  setValue(newGradStr)
}

/**
 * 改变颜色
 */
const changeColor = (newColor: string) => {
  if (unref(isGradient)) {
    handleGradient(newColor)
  } else {
    setValue(newColor)
  }
}

/**
 * 设置色相值
 */
const setHcH = (h: number) => {
  if (colorState.hc?.h !== undefined) {
    colorState.hc.h = formatInputValues(h, 0, 360)
  }
}

/**
 * 设置选中颜色索引
 */
const setSelectColorIdx = (idx: number) => {
  const colors = colorState.gradientColors || []
  if (idx >= 0 && idx < colors.length) {
    colorState.gradientColorsIdx = idx
    const selectedColor = colors[idx]
    if (selectedColor) {
      tinycolor.value = tc(selectedColor.value)
      const rgba = tinycolor.value.toRgb()
      const hsv = tinycolor.value.toHsv()
      colorState.hc = { ...rgba, ...hsv } as IColorValue
    }
  }
}

/**
 * 设置输入类型
 */
const setInputType = (type: InputType) => {
  colorState.inputType = type
}

/**
 * 设置线性渐变
 */
const setLinear = () => {
  const value = colorState.gradientColor?.split(/,(.+)/)[1]
  if (value) {
    setValue(`linear-gradient(90deg, ${value}`)
    gradientType.value = GradientType.linear
  }
}

/**
 * 设置径向渐变
 */
const setRadial = () => {
  const value = colorState.gradientColor?.split(/,(.+)/)[1]
  if (value) {
    setValue(`radial-gradient(circle, ${value}`)
    gradientType.value = GradientType.radial
  }
}

/**
 * 设置角度
 */
const setDegrees = (val: number) => {
  if (gradientType.value !== GradientType.linear) {
    console.warn(
      'Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired',
    )
    return
  }

  const remaining = colorState.gradientColor?.split(/,(.+)/)[1]
  if (!remaining) return

  colorState.degrees = val
  setValue(
    `linear-gradient(${formatInputValues(val, 0, 360)}deg, ${remaining})`,
  )
}

/**
 * 添加渐变点
 */
const addPoint = (left: number) => {
  if (left === undefined || left === null) {
    console.warn(
      'You did not pass a stop value (left amount) for the new color point so it defaulted to 50',
    )
    left = 50
  }

  const colors = cloneDeep(colorState.gradientColors || [])
  const curColorValue = colors[colorState.gradientColorsIdx || 0]

  if (!curColorValue) return

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

/**
 * 删除渐变点
 */
const deletePoint = (index?: number) => {
  const colors = colorState.gradientColors
  if (colors && colors.length > DEFAULT_VALUES.MIN_GRADIENT_POINTS) {
    const pointToDelete = index ?? colorState.gradientColorsIdx
    const remaining = colors?.filter(
      (rc: GradientProps, i: number) => i !== pointToDelete,
    )
    colorState.gradientColors = cloneDeep(remaining || [])

    const newGradientColor = createGradientStr(
      remaining || [],
      unref(gradientType),
      colorState,
    )
    setValue(newGradientColor)
  } else {
    console.warn(
      'A gradient must have at least two colors, disable your delete button when necessary',
    )
  }
}

/**
 * 初始化组件
 */
const init = () => {
  // 合并属性到状态
  Object.assign(colorState, props)

  // 设置尺寸
  colorState.width = props.width <= 320 ? 304 : props.width - 16
  colorState.height = props.width // 让宽等于高，area区域成为正方形

  // 控制预设色最多18个
  if (
    colorState.presetColors &&
    colorState.presetColors.length > DEFAULT_VALUES.MAX_PRESET_COLORS
  ) {
    colorState.presetColors.length = DEFAULT_VALUES.MAX_PRESET_COLORS
  }

  // 初始化颜色
  if (colorState.value) {
    const isGradient = getIsGradient(colorState.value)
    colorState.inputType = InputType.rgb
    setMode(isGradient ? Modes.gradient : Modes.solid)
    setValue(colorState.value)
  }
}

// 提供者对象
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

// 初始化
init()

// 提供依赖注入
provide('colorProvider', colorProvider)
</script>

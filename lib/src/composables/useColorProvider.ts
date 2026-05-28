import { ref, computed, watch, shallowReactive } from 'vue'
import type { EmitFn } from 'vue'
import { cloneDeep } from 'lodash-es'
import { presetColors } from '@/constants'
import { getColors, formatInputValues, low } from '@/utils/format'
import { getDetails, getIsGradient } from '@/utils/utils'
import { getTinycolor, createGradientStr, isValidColor } from '@/utils/color'
import {
  InputType,
  GradientType,
  Modes,
  DEFAULT_VALUES,
  SETCOLOR_MODE,
} from '@/enums'
import type {
  IColor,
  ColorPickerProps,
  GradientProps,
  IMode,
  IColorValue,
  IColorProvider,
  ILocales,
} from '@/interfaces'
import { setLang } from '@/utils/i18n'

interface ColorPickerEmits {
  'update:value': [value: string]
  change: [color: IColor]
}

interface ColorPickerPropsDef {
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
}

export function useColorProvider(
  props: ColorPickerPropsDef,
  emits: EmitFn<ColorPickerEmits>,
) {
  // 响应式状态
  const colorState = shallowReactive<ColorPickerProps>({
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

  const gradientType = ref<GradientType>(GradientType.linear)
  const tinycolorRef = ref<any>(null)

  const isGradient = computed(() => colorState.mode === Modes.gradient)

  const onChange = (val: IColor) => {
    if (val.color) {
      lastEmittedValue = val.color.toLowerCase()
      emits('update:value', val.color)
      emits('change', { ...val })
    }
  }

  const setMode = (mode: IMode) => {
    if (mode === Modes.solid) {
      colorState.degrees = DEFAULT_VALUES.DEFAULT_DEGREES
      colorState.gradientColors = []
      colorState.gradientColorsIdx = 0
    }
    colorState.mode = mode
  }

  const setValue = (color: string, mode?: string) => {
    let _color = color || colorState.value || DEFAULT_VALUES.DEFAULT_COLOR

    if (!isValidColor(_color)) {
      const colorMatch = _color.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/i)
      if (colorMatch) {
        _color = `#${colorMatch[1]}`
      } else {
        return
      }
    }
    const colors: GradientProps[] = getColors(_color)

    if (unref(isGradient)) {
      const { degreeStr, degrees } = getDetails(_color)
      colorState.degrees = degrees
      colorState.degreesStr = degreeStr

      if (mode === SETCOLOR_MODE.input) {
        const oldGradientColors = cloneDeep(colorState.gradientColors) || []
        const gradientColorsIdx = colorState.gradientColorsIdx || 0
        oldGradientColors[gradientColorsIdx] = colors[0]
        colorState.gradientColors = oldGradientColors
        colorState.gradientColor = createGradientStr(
          oldGradientColors,
          unref(gradientType),
          colorState,
        )
      } else {
        colorState.gradientColors = colors
        colorState.gradientColor = createGradientStr(
          colors,
          unref(gradientType),
          colorState,
        )
      }
      const currentColor =
        colorState.gradientColors[colorState.gradientColorsIdx || 0]
      if (currentColor) {
        tinycolorRef.value = getTinycolor(currentColor.value)
      }
    } else {
      const solidColor =
        colors[0]?.value?.replace(/\s+/g, '') || DEFAULT_VALUES.DEFAULT_COLOR
      colorState.value = solidColor
      tinycolorRef.value = getTinycolor(solidColor)
    }

    if (tinycolorRef.value) {
      const rgba = tinycolorRef.value.toRgb()
      const hsv = tinycolorRef.value.toHsv()
      colorState.hc = {
        ...rgba,
        s: hsv.s,
        v: hsv.v,
        h: hsv.h === 0 ? colorState.hc?.h || 0.1 : hsv.h,
      } as IColorValue
    }

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

  const updateSelectColor = (value: string) => {
    if (!isValidColor(value)) {
      console.warn('updateSelectColor: invalid color value', value)
      return
    }

    const colors = colorState.gradientColors || []
    const colorValue = colors[colorState.gradientColorsIdx || 0]
    if (!colorValue) return

    colorValue.value = value
    const newGradStr = createGradientStr(
      colors,
      unref(gradientType),
      colorState,
    )
    setValue(newGradStr)
  }

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
    const newGradStr = createGradientStr(
      colors,
      unref(gradientType),
      colorState,
    )
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
    if (colorState.hc?.h !== undefined) {
      colorState.hc.h = formatInputValues(h, 0, 360)
    }
  }

  const setSelectColorIdx = (idx: number) => {
    const colors = colorState.gradientColors || []
    if (idx >= 0 && idx < colors.length) {
      colorState.gradientColorsIdx = idx
      const selectedColor = colors[idx]
      if (selectedColor) {
        tinycolorRef.value = getTinycolor(selectedColor.value)
        if (tinycolorRef.value) {
          const rgba = tinycolorRef.value.toRgb()
          const hsv = tinycolorRef.value.toHsv()
          colorState.hc = { ...rgba, ...hsv } as IColorValue
        }
      }
    }
  }

  const setInputType = (type: InputType) => {
    colorState.inputType = type
  }

  const setLinear = () => {
    gradientType.value = GradientType.linear
    const colors = colorState.gradientColors || []
    if (colors.length > 0) {
      const gradStr = createGradientStr(colors, unref(gradientType), colorState)
      setValue(gradStr)
    }
  }

  const setRadial = () => {
    gradientType.value = GradientType.radial
    const colors = colorState.gradientColors || []
    if (colors.length > 0) {
      const gradStr = createGradientStr(colors, unref(gradientType), colorState)
      setValue(gradStr)
    }
  }

  const setDegrees = (val: number) => {
    if (gradientType.value !== GradientType.linear) {
      console.warn(
        'Warning: you are updating degrees when the gradient type is not linear.',
      )
      return
    }
    const colors = colorState.gradientColors || []
    if (colors.length === 0) return
    colorState.degrees = formatInputValues(+val, 0, 360)
    const gradStr = createGradientStr(colors, unref(gradientType), colorState)
    setValue(gradStr)
  }

  const addPoint = (left: number) => {
    if (left === undefined || left === null) {
      console.warn(
        'You did not pass a stop value for the new color point, defaulted to 50',
      )
      left = 50
    }

    const colors = cloneDeep(colorState.gradientColors || [])
    const curColorValue = colors[colorState.gradientColorsIdx || 0]

    if (!curColorValue) return

    const newColors = [
      ...colors.map((c: GradientProps) => ({
        ...c,
        value: low(c),
      })),
      { value: curColorValue.value, left: left },
    ].sort((a: any, b: any) => a.left - b.left)

    colorState.gradientColorsIdx = newColors.findIndex((i) => i.left === left)
    const color = createGradientStr(newColors, unref(gradientType), colorState)
    setValue(color)
  }

  const deletePoint = (index?: number) => {
    const colors = colorState.gradientColors
    if (colors && colors.length > DEFAULT_VALUES.MIN_GRADIENT_POINTS) {
      const pointToDelete = index ?? colorState.gradientColorsIdx
      const remaining = colors.filter(
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
      console.warn(
        'A gradient must have at least two colors, disable your delete button when necessary',
      )
    }
  }

  // 防止 init 和 watch 形成无限递归
  // 记录最后一次内部 emit 出去的值，当 props.value 回传与此一致时跳过初始化
  let lastEmittedValue = ''

  const init = () => {
    const incomingValue = (props.value || '').toLowerCase()

    // 如果外部传入的值就是内部刚 emit 出去的，跳过避免死循环
    // （lastEmittedValue 为空时表示首次加载或尚未 emit 过，不跳过）
    if (lastEmittedValue && incomingValue === lastEmittedValue) {
      return
    }

    const cloneProps = cloneDeep(props)
    cloneProps.value = incomingValue
    Object.assign(colorState, cloneProps)

    colorState.width = props.width! <= 320 ? 304 : props.width! - 16
    colorState.height = props.width

    if (
      colorState.presetColors &&
      colorState.presetColors.length > DEFAULT_VALUES.MAX_PRESET_COLORS
    ) {
      colorState.presetColors.length = DEFAULT_VALUES.MAX_PRESET_COLORS
    }

    if (colorState.value) {
      const isGrad = getIsGradient(colorState.value)
      colorState.inputType = InputType.rgb
      setMode(isGrad ? Modes.gradient : Modes.solid)
      setValue(colorState.value)
    }
  }

  const colorProvider: IColorProvider = {
    isGradient,
    colorState,
    tinycolor: tinycolorRef,
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

  watch(() => props.value, init, { immediate: true })

  watch(
    () => props.locale,
    (val) => setLang(val),
    { immediate: true },
  )

  return {
    colorState,
    isGradient,
    colorProvider,
  }
}

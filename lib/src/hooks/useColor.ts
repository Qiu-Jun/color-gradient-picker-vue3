/*
 * @Author: June
 * @Description: store
 * @Date: 2024-12-03 23:02:32
 * @LastEditTime: 2024-12-08 12:23:51
 * @LastEditors: June
 */
import { getColors, formatInputValues, low, high } from '@/utils/format'
import {
  getColorObj,
  getDetails,
  getIsGradient,
  isUpperCase,
} from '@/utils/utils'
import tc from 'tinycolor2'
import { InputType, GradientType, Modes } from '@/enums'
import { cloneDeep } from 'lodash-es'
import type { ColorPickerProps, GradientProps, IMode } from '@/interfaces'

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
const gradientType = ref<GradientType>(GradientType.linear)
const tinycolor = ref<typeof tc | null>(null)
let onChange: any = null
export function useColor() {
  const isGradient = computed(() => colorState.mode === Modes.gradient)

  const setHcH = (h: number) => {
    if (colorState.hc?.h) {
      colorState.hc.h = h
    }
  }

  const setValue = (color?: string) => {
    const _color = color || colorState.value!
    const colors: GradientProps[] = getColors(_color)
    const { degreeStr } = getDetails(_color)
    if (unref(isGradient)) {
      colorState.degreesStr = degreeStr
      colorState.gradientColors = colors
      colorState.gradientColor = createGradientStr(colors)
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
    colorState.hc = { ...rgba, ...hsv }
    onChange &&
      onChange({
        color: unref(isGradient) ? colorState.gradientColor : colorState.value,
        mode: colorState.mode,
        degrees: colorState.degrees,
      })
    console.log('-----------------hc', colorState.hc)
  }

  // const setGradientValue = (startingGradiant: string) => {
  //   const newValue = startingGradiant
  //   const { degreeStr, isGradient } = getDetails(color)
  //   setValue(newValue)
  // }

  const setMode = (mode: IMode) => {
    if (mode === Modes.solid) {
      colorState.degrees = 90
      colorState.gradientColors = []
      colorState.gradientColorsIdx = 0
    }
    colorState.mode = mode
  }

  const setInputType = (type: InputType) => {
    colorState.inputType = type
  }

  const setShowAdvance = (bol: boolean) => {
    colorState.showAdvancedSliders = bol
  }

  // 生成渐变色string
  function createGradientStr(newColors: GradientProps[]) {
    const sorted = newColors.sort(
      (a: GradientProps, b: GradientProps) => a.left! - b.left!,
    )
    const colorString = sorted?.map((cc: any) => `${cc?.value} ${cc.left}%`)
    const newGrade = `${unref(
      gradientType,
    )}-gradient(${`${colorState.degreesStr!}`}, ${colorString.join(', ')})`

    return newGrade
  }

  const handleGradient = (newColor: string, left?: number) => {
    const colors = colorState.gradientColors || []
    const colorValue = colors[colorState.gradientColorsIdx!]
    if (!colorValue) return
    if (!left && left !== 0) {
      colorValue.left = left
    }
    // 测试用
    colorValue.left = 0
    console.log(colorValue, '==--------=====******')
    colorValue.value = newColor
    const newGradStr = createGradientStr(colors)
    setValue(newGradStr)
  }

  const setDegrees = (val: number) => {
    if (gradientType.value !== GradientType.linear) return false
    colorState.degrees = val
    const value = colorState.value?.split(/,(.+)/)[1]
    setValue(`linear-gradient(${formatInputValues(val, 0, 360)}deg, ${value}`)
    {
      console.log(
        'Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired',
      )
    }
  }

  const setSelectColorIdx = (idx: number) => {
    colorState.gradientColorsIdx = idx
  }

  const handleChange = (newColor: string) => {
    if (unref(isGradient)) {
      handleGradient(newColor)
    } else {
      setValue(newColor)
    }
  }

  const setLinear = () => {
    const value = colorState.gradientColor?.split(/,(.+)/)[1]
    value && setValue(`linear-gradient(90deg, ${value}`)
    gradientType.value = GradientType.linear
  }

  const setRadial = () => {
    const value = colorState.gradientColor?.split(/,(.+)/)[1]
    value && setValue(`radial-gradient(circle, ${value}`)
    gradientType.value = GradientType.radial
  }

  const init = (data: ColorPickerProps, cb?: any) => {
    Object.assign(colorState, data)
    onChange = cb
    if (colorState.value) {
      const isGradient = getIsGradient(colorState.value)
      colorState.inputType = InputType.rgb
      setMode(isGradient ? Modes.gradient : Modes.solid)
      setValue()
    }
  }

  const setR = (newR: number) => {
    const newVal = formatInputValues(newR, 0, 255)
    const hc = colorState.hc
    handleChange(`rgba(${newVal}, ${hc.g}, ${hc.b}, ${hc.a})`)
  }

  const setG = (newG: number) => {
    const newVal = formatInputValues(newG, 0, 255)
    const hc = colorState.hc
    handleChange(`rgba(${hc.r}, ${newVal}, ${hc.b}, ${hc.a})`)
  }

  const setB = (newB: number) => {
    const newVal = formatInputValues(newB, 0, 255)
    const hc = colorState.hc
    handleChange(`rgba(${hc.r}, ${hc.g}, ${newVal}, ${hc.a})`)
  }

  const setA = (newA: number) => {
    const newVal = formatInputValues(newA, 0, 100)
    const hc = colorState.hc
    handleChange(`rgba(${hc.r}, ${hc.g}, ${hc.b}, ${newVal / 100})`)
  }

  const setHue = (newHue: number) => {
    const newVal = formatInputValues(newHue, 0, 360)
    const hc = colorState.hc
    const tinyNew = tc({ h: newVal, s: hc.s, l: hc.l })
    const { r, g, b } = tinyNew.toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`)
  }

  const setSaturation = (newSat: number) => {
    const newVal = formatInputValues(newSat, 0, 100)
    const hc = colorState.hc
    const tinyNew = tc({ h: h, s: newVal / 100, l: hc.l })
    const { r, g, b } = tinyNew.toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`)
  }

  const setLightness = (newLight: number) => {
    const newVal = formatInputValues(newLight, 0, 100)
    const hc = colorState.hc
    const tinyNew = tc({ h: h, s: hc.s, l: newVal / 100 })
    if (tinyNew?.isValid()) {
      const { r, g, b } = tinyNew.toRgb()
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`)
    } else {
      console.log(
        'The new color was invalid, perhaps the lightness you passed in was a decimal? Please pass the new value between 0 - 100',
      )
    }
  }

  const setSelectedPoint = (index: number) => {
    colorState.gradientColorsIdx = index
  }

  const updateSelectColor = (value: GradientProps) => {
    const selectedPoint =
      colorState.gradientColor![colorState.gradientColorsIdx!]
    Object.assign(selectedPoint, value)
  }

  // const setSelectedPoint = (index: number) => {
  //   if (unref(isGradient)) {
  //     const newGradStr = colors?.map((cc: GradientProps, i: number) => ({
  //       ...cc,
  //       value: i === index ? high(cc) : low(cc),
  //     }))
  //     createGradientStr(newGradStr)
  //   } else {
  //     console.log(
  //       'This function is only relevant when the picker is in gradient mode',
  //     )
  //   }
  // }

  const addPoint = (left: number) => {
    if (!left) {
      console.log(
        'You did not pass a stop value (left amount) for the new color point so it defaulted to 50',
      )
    }
    const colors = cloneDeep(colorState.gradientColors!)
    const newColors = [
      ...colors?.map((c: GradientProps) => ({
        ...c,
        value: low(c),
      })),
      { value: colors[colorState.gradientColorsIdx!].value, left: left },
    ]
    const color = createGradientStr(newColors)
    setValue(color)
  }

  // const deletePoint = (index: number) => {
  //   if (colorState.gradientColors && colorState.gradientColors?.length > 2) {
  //     const pointToDelete = index ?? colorState.gradientColorsIdx
  //     const remaining = colors?.filter(
  //       (rc: ColorsProps, i: number) => i !== pointToDelete,
  //     )
  //     createGradientStr(remaining)
  //     if (!index) {
  //       console.log(
  //         'You did not pass in the index of the point you wanted to delete so the function default to the currently selected point',
  //       )
  //     }
  //   } else {
  //     console.log(
  //       'A gradient must have atleast two colors, disable your delete button when necessary',
  //     )
  //   }
  // }

  // const setPointLeft = (left: number) => {
  //   handleGradient(currentColor, formatInputValues(left, 0, 100))
  // }

  return {
    colorState,
    tinycolor,
    gradientType,
    isGradient,
    init,
    setHcH,
    setShowAdvance,
    setValue,
    setInputType,
    handleChange,
    setMode,
    setLinear,
    setRadial,
    createGradientStr,
    setDegrees,
    setSelectColorIdx,
    setR,
    setG,
    setB,
    setA,
    setHue,
    setSaturation,
    setLightness,
    addPoint,
    setSelectedPoint,
    updateSelectColor,
  }
}

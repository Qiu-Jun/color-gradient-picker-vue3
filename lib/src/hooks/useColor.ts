/*
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-04 21:20:20
 * @LastEditTime: 2024-12-10 13:41:41
 * @LastEditors: June
 */
import { getColors, formatInputValues, low, high } from '@/utils/format'
import { getDetails, getIsGradient } from '@/utils/utils'
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
    colorValue.left = left ?? colorValue.left
    colorValue.value = newColor
    const newGradStr = createGradientStr(colors)
    setValue(newGradStr)
  }

  const setDegrees = (val: number) => {
    if (gradientType.value !== GradientType.linear)
      return console.log(
        'Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired',
      )

    const remaining = colorState.gradientColor?.split(/,(.+)/)[1]
    if (!remaining) return
    colorState.degrees = val
    setValue(
      `linear-gradient(${formatInputValues(val, 0, 360)}deg, ${remaining}`,
    )
  }

  const setSelectColorIdx = (idx: number) => {
    colorState.gradientColorsIdx = idx
    // warning: Here is update hc， but not need to handle onChange
    tinycolor.value = tc(
      colorState.gradientColors![colorState.gradientColorsIdx!].value,
    )
    const rgba = tinycolor.value.toRgb()
    const hsv = tinycolor.value.toHsv()
    colorState.hc = { ...rgba, ...hsv }
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
      setValue(colorState.value)
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

  const updateSelectColor = (value: string) => {
    const colors = colorState.gradientColors || []
    const colorValue = colors[colorState.gradientColorsIdx!]
    if (!colorValue) return
    colorValue.value = value
    const newGradStr = createGradientStr(colors)
    setValue(newGradStr)
  }

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
    const color = createGradientStr(newColors)
    setValue(color)
  }

  const deletePoint = (index?: number) => {
    const colors = colorState.gradientColors
    if (colors && colors?.length > 2) {
      const pointToDelete = index ?? colorState.gradientColorsIdx
      const remaining = colors?.filter(
        (rc: GradientProps, i: number) => i !== pointToDelete,
      )
      colorState.gradientColors = cloneDeep(remaining)

      const newGradientColor = createGradientStr(remaining)
      setValue(newGradientColor)
    } else {
      console.log(
        'A gradient must have atleast two colors, disable your delete button when necessary',
      )
    }
  }

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
    handleGradient,
    updateSelectColor,
    deletePoint,
  }
}

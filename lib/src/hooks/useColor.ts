/*
 * @Author: June
 * @Description: store
 * @Date: 2024-12-03 23:02:32
 * @LastEditTime: 2024-12-07 13:02:38
 * @LastEditors: June
 */
import { getColors, formatInputValues, low, high } from '@/utils/format'
import { getColorObj, getDetails, isUpperCase } from '@/utils/utils'
import tc from 'tinycolor2'
import { InputType, GradientType, Modes } from '@/enums'
import type { ColorPickerProps, GradientProps, IMode } from '@/interfaces'

const colorState = reactive<ColorPickerProps>({
  width: 300,
  height: 300,
  showAdvancedSliders: false,
  mode: Modes.solid,
  degrees: 90,
  degreesStr: '',
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

  const setValue = (color: string) => {
    if (!color) return
    const { degreeStr, isGradient } = getDetails(color)
    setMode(isGradient ? Modes.gradient : Modes.solid)
    const colors: GradientProps[] = getColors(color)
    if (unref(isGradient)) {
      colorState.degreesStr = degreeStr
      colorState.gradientColors = colors
      colorState.value = createGradientStr(colors)
      tinycolor.value = tc(
        colorState.gradientColors[colorState.gradientColorsIdx!].value,
      )
      onChange &&
        onChange({
          color: colorState.value,
          mode: colorState.mode,
          degrees: colorState.degrees,
        })

      // colorState.gradientColors[colorState.gradientColorsIdx].value = color
    } else {
      colorState.value = color.replace(/\s+/g, '')
      onChange &&
        onChange({
          color: colorState.value,
          mode: colorState.mode,
          degrees: colorState.degrees,
        })

      tinycolor.value = tc(colors[0].value)
    }
    const rgba = tinycolor.value.toRgb()
    const hsv = tinycolor.value.toHsv()
    colorState.hc = { ...rgba, ...hsv }
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
    const colorValue = colorState.value
    if (!colorValue) return
    const colors = getColors(colorValue)
    const { currentLeft } = getColorObj(colors)
    const remaining = colors?.filter(
      (c: GradientProps) => !isUpperCase(c.value),
    )
    const newColors = [
      { value: newColor.toUpperCase(), left: left ?? currentLeft },
      ...remaining,
    ]
    createGradientStr(newColors)
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
    console.log(newColor)
    if (unref(isGradient)) {
      handleGradient(newColor)
    } else {
      setValue(newColor)
    }
  }

  const setLinear = () => {
    const value = colorState.value?.split(/,(.+)/)[1]
    value && setValue(`linear-gradient(90deg, ${value}`)
    gradientType.value = GradientType.linear
  }

  const setRadial = () => {
    const value = colorState.value?.split(/,(.+)/)[1]
    value && setValue(`radial-gradient(circle, ${value}`)
    gradientType.value = GradientType.radial
  }

  const init = (data: ColorPickerProps, cb?: any) => {
    Object.assign(colorState, data)
    onChange = cb
    if (colorState.value) {
      colorState.inputType = InputType.rgb
      const color = getColors(colorState.value)
      setValue(typeof color === 'string' ? color : color[0].value)
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

  // const addPoint = (left: number) => {
  //   const newColors = [
  //     ...colors.map((c: GradientProps) => ({ ...c, value: low(c) })),
  //     { value: currentColor, left: left },
  //   ]
  //   createGradientStr(newColors)
  //   if (!left) {
  //     console.log(
  //       'You did not pass a stop value (left amount) for the new color point so it defaulted to 50',
  //     )
  //   }
  // }

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
    // setGradientValue,
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
  }
}

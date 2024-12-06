/*
 * @Author: June
 * @Description: store
 * @Date: 2024-12-03 23:02:32
 * @LastEditTime: 2024-12-05 22:29:44
 * @LastEditors: June
 */
import { getColors, formatInputValues } from '@/utils/format'
import { getColorObj, getDetails, isUpperCase } from '@/utils/utils'
import tc from 'tinycolor2'
import { InputType, GradientType } from '@/enums'
import type { ColorPickerProps, GradientProps } from '@/interfaces'

const colorState = reactive<ColorPickerProps>({
  width: 300,
  height: 300,
  showAdvancedSliders: false,
  degrees: 90,
})
const gradientType = ref<GradientType>(GradientType.linear)
const tinycolor = ref<typeof tc | null>(null)
let onChange: any = null
const selectColorIdx = ref<number>(0) // 渐变色时选中的下标
export function useColor() {
  const setIsGradient = (val: boolean) => {
    colorState.isGradient = val
  }

  const setHc = (color: string) => {
    const colors = getColors(color)
    const { currentColor, selectedColor } = getColorObj(colors)
    selectColorIdx.value = selectedColor
    tinycolor.value = tc(currentColor)
    const rgba = tinycolor.value.toRgb()
    const hsv = tinycolor.value.toHsv()
    colorState.hc = { ...rgba, ...hsv }
    console.log('-----------------hc', colorState.hc)
    // if (!hc) return
    // colorState.hc = hc
  }

  const setHcH = (h: number) => {
    if (colorState.hc?.h) {
      colorState.hc.h = h
    }
  }

  const setValue = (color: string | string[]) => {
    colorState.value = (typeof color === 'string' ? color : color[0])?.replace(
      /\s+/g,
      '',
    )
    console.log(colorState.value, '-----------------')
    onChange && onChange(colorState.value)
    setHc(colorState.value)
  }

  const setInputType = (type: InputType) => {
    colorState.inputType = type
  }

  const setShowAdvance = (bol: boolean) => {
    colorState.showAdvancedSliders = bol
  }

  // 生成渐变色string
  const createGradientStr = (newColors: GradientProps[]) => {
    const sorted = newColors.sort(
      (a: GradientProps, b: GradientProps) => a.left - b.left,
    )
    const degreeStr = getDetails(colorState.value!)
    const colorString = sorted?.map((cc: any) => `${cc?.value} ${cc.left}%`)
    const newGrade = `${unref(gradientType)}(${degreeStr}, ${colorString.join(
      ', ',
    )})`
    console.log(newGrade, 'createGradientStr===========')
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
    selectColorIdx.value = idx
  }

  const handleChange = (newColor: string) => {
    console.log(newColor)
    if (colorState.isGradient) {
      handleGradient(newColor)
    } else {
      setValue(newColor)
    }
  }

  const setGradient = (startingGradiant: string) => {
    const newValue = startingGradiant
    setValue(newValue)
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
      const { degrees, degreeStr, isGradient, gradientType } = getDetails(
        colorState.value,
      )
      console.log(isGradient, 'isGradient')
      setIsGradient(isGradient)
      colorState.inputType = InputType.rgb
      const color = getColors(colorState.value)
      setValue(typeof color === 'string' ? color : color[0].value)
    }
  }

  return {
    colorState,
    tinycolor,
    gradientType,
    selectColorIdx,
    init,
    setHcH,
    setShowAdvance,
    setValue,
    setHc,
    setIsGradient,
    setInputType,
    handleChange,
    setGradient,
    setLinear,
    setRadial,
    createGradientStr,
    setDegrees,
    setSelectColorIdx,
  }
}

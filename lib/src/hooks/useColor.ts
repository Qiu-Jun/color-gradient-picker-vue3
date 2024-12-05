/*
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 23:02:32
 * @LastEditTime: 2024-12-05 14:07:14
 * @LastEditors: June
 */
import { getColors } from '@/utils/format'
import { getColorObj, getDetails, isUpperCase } from '@/utils/utils'
import tc from 'tinycolor2'
import { InputType, GradientType } from '@/enums'
import type { ColorPickerProps, GradientProps } from '@/interfaces'

const colorState = reactive<ColorPickerProps>({
  width: 300,
  height: 300,
  showAdvancedSliders: false,
})
const gradientType = ref<GradientType>(GradientType.linear)
const tinycolor = ref<typeof tc | null>(null)
export function useColor() {
  const setIsGradient = (val: boolean) => {
    colorState.isGradient = val
  }

  const setHc = (color: string) => {
    const colors = getColors(color)
    const { currentColor } = getColorObj(colors)
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
    const newGrade = `${gradientType}(${degreeStr}, ${colorString.join(', ')})`
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

  const handleChange = (newColor: string) => {
    console.log(newColor)
    if (colorState.isGradient) {
      handleGradient(newColor)
    } else {
      setValue(newColor)
    }
  }

  const init = (data: ColorPickerProps) => {
    Object.assign(colorState, data)
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
    GradientType: unref(GradientType),
    tinycolor,
    init,
    setHcH,
    setShowAdvance,
    setValue,
    setHc,
    setIsGradient,
    setInputType,
    handleChange,
  }
}

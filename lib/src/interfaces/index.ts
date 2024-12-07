/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: June
 * @LastEditTime: 2024-12-07 12:10:33
 */
import { InputType, Modes } from '@/enums'

export interface ColorPickerProps {
  width: number
  height: number
  gradientColorsIdx?: number // 当前的渐变点下标
  degrees?: number
  degreesStr?: string
  value?: string // 预览颜色  最终结果
  showAdvancedSliders?: boolean
  hideControls?: boolean
  hideInputs?: boolean
  hideOpacity?: boolean
  hidePresets?: boolean
  hideHue?: boolean
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
  hideGradientControls?: boolean
  disableDarkMode?: boolean
  disableLightMode?: boolean
  hc?: any
  isGradient?: boolean
  inputType?: InputType
  onChange?: any
  mode?: IMode
  gradientColors?: GradientProps[] // 渐变点颜色
}

export type GradientProps = {
  value: string
  index?: number
  left?: number
}

export type IMode = Modes.solid | Modes.gradient

export interface IColor {
  mode: IMode
  color: string
  angle?: number
  colors?: { color: string; offset: number }[]
}

export interface IProvide extends ColorPickerProps {
  value: string
  width: number
  height: number
  hc: any
}

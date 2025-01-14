/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: June
 * @LastEditTime: 2024-12-22 00:02:02
 */
import { InputType, Modes } from '@/enums'

export interface ColorPickerProps {
  width: number
  height?: number
  gradientColorsIdx?: number // 当前的渐变点下标
  degrees?: number
  degreesStr?: string
  gradientColor?: string
  value?: string
  hideGradient?: boolean
  showAdvancedSliders?: boolean
  hideInputs?: boolean
  hideOpacity?: boolean
  hc?: any
  isGradient?: boolean
  inputType?: InputType
  onChange?: any
  mode?: IMode
  gradientColors?: GradientProps[] // 渐变点颜色
  presetColors?: string[]
  hidePresets?: boolean
}

export type GradientProps = {
  value: string
  index?: number
  left?: number
}

export type IMode = Modes.solid | Modes.gradient

export interface IColor {
  mode?: IMode
  color?: string
  angle?: number
  degrees?: number
  colors?: { color: string; offset: number }[]
  [key: string]: any
}

export interface IProvide extends ColorPickerProps {
  value: string
  width: number
  height: number
  hc: any
}
export type IColorPicker = any

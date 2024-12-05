/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: June
 * @LastEditTime: 2024-12-05 22:15:05
 */
import { InputType } from '@/enums'

export interface ColorPickerProps {
  width: number
  height: number
  degrees?: number
  value?: string
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
}

export type ColorsProps = {
  value: string
  index?: number
  left?: number
}

export type GradientProps = {
  value: string
  index: number
  left: number
}

export type ThemeProps = {
  light: ThemeMode
  dark: ThemeMode
}

export type ThemeMode = {
  color?: string
  background?: string
  highlights?: string
  accent?: string
}

export interface IProvide extends ColorPickerProps {
  value: string
  width: number
  height: number
  hc: any
}

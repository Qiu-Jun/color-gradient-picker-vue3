/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: June
 * @LastEditTime: 2024-12-22 00:02:02
 */
import type { InjectionKey, Ref } from 'vue'
import type tinycolor from 'tinycolor2'
import { InputType, GradientType, Modes } from '@/enums'

export interface ColorPickerProps {
  width: number
  height?: number
  gradientColorsIdx?: number
  degrees?: number
  degreesStr?: string
  gradientColor?: string
  value?: string
  hideGradient?: boolean
  showAdvancedSliders?: boolean
  hideInputs?: boolean
  hideOpacity?: boolean
  hc?: IColorValue
  isGradient?: boolean
  inputType?: InputType
  onChange?: any
  mode?: IMode
  gradientColors?: GradientProps[]
  presetColors?: string[]
  hidePresets?: boolean
}

export type GradientProps = {
  value: string
  index?: number
  left?: number
}

export type IMode = Modes.solid | Modes.gradient

/**
 * 颜色值对象
 */
export interface IColorValue {
  r: number
  g: number
  b: number
  a: number
  h: number
  s: number
  v: number
}

/**
 * 颜色对象接口
 */
export interface IColor {
  mode?: IMode
  color?: string
  angle?: number
  degrees?: number
  colors?: { color: string; offset: number }[]
  gradientType?: string
  gradientColors?: { color: string; left?: number }[]
}

/**
 * 颜色提供者接口 - 用于 provide/inject 类型安全
 */
export interface IColorProvider {
  colorState: ColorPickerProps
  tinycolor: Ref<InstanceType<typeof tinycolor> | null>
  isGradient: Ref<boolean>
  gradientType: Ref<GradientType>
  setValue: (color: string, mode?: string) => void
  setMode: (mode: IMode) => void
  updateSelectColor: (value: string) => void
  handleGradient: (newColor: string, left?: number) => void
  changeColor: (newColor: string) => void
  setHcH: (h: number) => void
  setInputType: (type: InputType) => void
  setLinear: () => void
  setRadial: () => void
  setDegrees: (val: number) => void
  setSelectColorIdx: (idx: number) => void
  addPoint: (left: number) => void
  deletePoint: (index?: number) => void
}

/**
 * 颜色提供者注入键
 */
export const COLOR_PROVIDER_KEY: InjectionKey<IColorProvider> =
  Symbol('colorProvider')

export type ILocales = 'zh' | 'en'

/**
 * 颜色提供者简化接口（必填属性版本）
 */
export interface IProvide extends ColorPickerProps {
  value: string
  width: number
  height: number
  hc: IColorValue
}

/**
 * 颜色选择器操作接口
 */
export interface IColorPicker {
  setValue: (color?: string) => void
  setMode: (mode: IMode) => void
  updateSelectColor: (value: string) => void
  handleGradient: (newColor: string, left?: number) => void
  changeColor: (newColor: string) => void
  setHcH: (h: number) => void
  setInputType: (type: InputType) => void
  setLinear: () => void
  setRadial: () => void
  setDegrees: (val: number) => void
  setSelectColorIdx: (idx: number) => void
  addPoint: (left: number) => void
  deletePoint: (index?: number) => void
}

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
  hc?: IColorValue
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

/**
 * 颜色值对象
 */
export interface IColorValue {
  /** 红色分量 (0-255) */
  r: number
  /** 绿色分量 (0-255) */
  g: number
  /** 蓝色分量 (0-255) */
  b: number
  /** 透明度 (0-1) */
  a: number
  /** 色相 (0-360) */
  h: number
  /** 饱和度 (0-100) */
  s: number
  /** 明度 (0-100) */
  v: number
}

/**
 * 颜色对象接口
 */
export interface IColor {
  /** 颜色模式 */
  mode?: IMode
  /** 颜色值 */
  color?: string
  /** 角度 */
  angle?: number
  /** 度数 */
  degrees?: number
  /** 渐变颜色数组 */
  colors?: { color: string; offset: number }[]
  /** 渐变类型 */
  gradientType?: string
  /** 渐变颜色点 */
  gradientColors?: { color: string; left?: number }[]
  [key: string]: any
}

export interface IProvide extends ColorPickerProps {
  value: string
  width: number
  height: number
  hc: any
}
export type IColorPicker = any

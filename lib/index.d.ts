/*
 * @Author: June
 * @Description: 颜色选择器组件类型声明文件
 * @Date: 2023-04-11 12:35:04
 * @LastEditors: June
 * @LastEditTime: 2024-12-10 13:30:30
 */

declare module 'color-gradient-picker-vue3' {
  import { DefineComponent } from 'vue'

  // 主组件类型
  export const ColorPicker: DefineComponent<
    {
      value?: string
      width?: number
      hideInputs?: boolean
      hideOpacity?: boolean
      hideGradient?: boolean
      presetColors?: string[]
      hidePresets?: boolean
      showAdvancedSliders?: boolean
      inputType?: 'HSL' | 'RGB' | 'HSV' | 'CMYK'
    },
    {},
    any
  >

  // 类型定义
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
    onChange?: (color: IColor) => void
    mode?: IMode
    gradientColors?: GradientProps[]
    presetColors?: string[]
    hidePresets?: boolean
  }

  export interface GradientProps {
    value: string
    index?: number
    left?: number
  }

  export interface IColorValue {
    r: number
    g: number
    b: number
    a: number
    h: number
    s: number
    v: number
  }

  export interface IColor {
    mode?: IMode
    color?: string
    angle?: number
    degrees?: number
    colors?: { color: string; offset: number }[]
    gradientType?: string
    gradientColors?: { color: string; left: number }[]
    [key: string]: any
  }

  export interface IProvide extends ColorPickerProps {
    value: string
    width: number
    height: number
    hc: IColorValue
  }

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

  export type IMode = 'solid' | 'gradient'

  // 枚举
  export enum InputType {
    hsl = 'HSL',
    rgb = 'RGB',
    hsv = 'HSV',
    cmyk = 'CMYK',
  }

  export enum GradientType {
    linear = 'linear',
    radial = 'radial',
  }

  export enum Modes {
    solid = 'solid',
    gradient = 'gradient',
  }

  export enum EventType {
    change = 'change',
    update = 'update:value',
  }

  export const DEFAULT_VALUES: {
    DEFAULT_COLOR: string
    DEFAULT_WIDTH: number
    DEFAULT_DEGREES: number
    MAX_PRESET_COLORS: number
    MIN_GRADIENT_POINTS: number
  }

  // 工具函数
  export function createGradientStr(
    newColors: GradientProps[],
    gradientType: GradientType,
    colorState: ColorPickerProps,
  ): string

  export function isValidColor(color: string): boolean
  export function formatColor(color: string): string
  export function getColorContrast(color: string): number
  export function getColors(value: string): GradientProps[]
  export function formatInputValues(
    value: number,
    min: number,
    max: number,
  ): number
  export function round(val: number): number
  export function clamp(value: number, min: number, max: number): number
  export function percentToDecimal(percent: number): number
  export function decimalToPercent(decimal: number): number
}

/*
 * @Descripttion: 颜色选择器组件主入口文件
 * @version: 3.1.0
 * @Author: June
 * @Date: 2023-03-18 00:33:21
 * @LastEditors: June
 * @LastEditTime: 2024-12-10 12:50:24
 */

// 导出主组件
export { ColorPicker } from './src/components/ColorPicker'

// 导出类型定义
export type {
  ColorPickerProps,
  GradientProps,
  IColor,
  IColorValue,
  IColorPicker,
  IMode,
  IProvide,
} from '@/interfaces'

// 导出枚举
export {
  InputType,
  GradientType,
  Modes,
  EventType,
  DEFAULT_VALUES,
} from '@/enums'

// 导出工具函数
export {
  createGradientStr,
  isValidColor,
  formatColor,
  getColorContrast,
} from '@/utils/color'

export {
  getColors,
  formatInputValues,
  round,
  clamp,
  percentToDecimal,
  decimalToPercent,
} from '@/utils/format'

// 导入样式
import './src/styles/index.scss'
import 'virtual:uno.css'

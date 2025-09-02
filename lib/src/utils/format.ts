/*
 * @Author: June
 * @Description: 格式化工具函数
 * @Date: 2024-11-30 21:03:17
 * @LastEditTime: 2024-12-07 11:10:04
 * @LastEditors: June
 */
import { gradientParser } from './gradientParser'
import { config } from '@/constants'
import type { GradientProps } from '@/interfaces'

const { defaultColor, defaultGradient } = config

/**
 * 将颜色值转换为小写
 * @param color 渐变颜色对象
 * @returns 小写的颜色值
 */
export const low = (color: GradientProps): string => {
  return color.value?.toLowerCase() || ''
}

/**
 * 将颜色值转换为大写
 * @param color 渐变颜色对象
 * @returns 大写的颜色值
 */
export const high = (color: GradientProps): string => {
  return color.value?.toUpperCase() || ''
}

/**
 * 从颜色值中提取颜色数组
 * @param value 颜色值字符串
 * @returns 颜色数组
 */
export const getColors = (value: string): GradientProps[] => {
  if (!value || typeof value !== 'string') {
    console.warn('getColors: invalid value provided')
    return [{ value: defaultColor }]
  }

  const isGradient = value.includes('gradient')

  if (isGradient) {
    const isConic = value.includes('conic')
    const safeValue = !isConic ? value : defaultGradient

    if (isConic) {
      console.warn("Sorry we can't handle conic gradients yet")
    }

    try {
      const obj = gradientParser(safeValue)
      return obj?.colorStops || [{ value: defaultColor }]
    } catch (error) {
      console.error('Error parsing gradient:', error)
      return [{ value: defaultColor }]
    }
  } else {
    const safeValue = value || defaultColor
    return [{ value: safeValue }]
  }
}

/**
 * 格式化输入值，确保在指定范围内
 * @param value 输入值
 * @param min 最小值
 * @param max 最大值
 * @returns 格式化后的值
 */
export const formatInputValues = (
  value: number,
  min: number,
  max: number,
): number => {
  if (typeof value !== 'number' || isNaN(value)) {
    return min
  }

  if (value < min) return min
  if (value > max) return max

  return value
}

/**
 * 四舍五入数值
 * @param val 数值
 * @returns 四舍五入后的数值
 */
export const round = (val: number): number => {
  if (typeof val !== 'number' || isNaN(val)) {
    return 0
  }
  return Math.round(val)
}

/**
 * 限制数值在指定范围内
 * @param value 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数值
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * 将百分比值转换为0-1范围
 * @param percent 百分比值 (0-100)
 * @returns 0-1范围的值
 */
export const percentToDecimal = (percent: number): number => {
  return clamp(percent, 0, 100) / 100
}

/**
 * 将0-1范围的值转换为百分比
 * @param decimal 0-1范围的值
 * @returns 百分比值 (0-100)
 */
export const decimalToPercent = (decimal: number): number => {
  return round(clamp(decimal, 0, 1) * 100)
}

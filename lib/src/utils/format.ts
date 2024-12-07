/*
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-30 21:03:17
 * @LastEditTime: 2024-12-07 11:10:04
 * @LastEditors: June
 */
import { gradientParser } from './gradientParser'
import { config } from '@/constants'
import type { GradientProps } from '@/interfaces'

const { defaultColor, defaultGradient } = config
export const low = (color: GradientProps) => {
  return color.value.toLowerCase()
}

export const high = (color: GradientProps) => {
  return color.value.toUpperCase()
}

export const getColors = (value: string) => {
  const isGradient = value?.includes('gradient')
  if (isGradient) {
    const isConic = value?.includes('conic')
    const safeValue = !isConic ? value : defaultGradient
    if (isConic) {
      console.log("Sorry we can't handle conic gradients yet")
    }
    const obj = gradientParser(safeValue)
    return obj?.colorStops
  } else {
    const safeValue = value || defaultColor
    return [{ value: safeValue }]
  }
}

// input format
export const formatInputValues = (value: number, min: number, max: number) => {
  return isNaN(value) ? min : value < min ? min : value > max ? max : value
}

export const round = (val: number) => {
  return Math.round(val)
}

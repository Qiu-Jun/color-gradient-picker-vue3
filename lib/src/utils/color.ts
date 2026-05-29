import type { GradientProps, ColorPickerProps } from '@/interfaces'
import { GradientType } from '@/enums'
import tinycolor from 'tinycolor2'
import { LRUCache } from './lruCache'

const tinycolorCache = new LRUCache<string, any>(100)

/**
 * 获取 tinycolor 实例，使用 LRU 缓存避免重复创建
 */
export function getTinycolor(color: string) {
  if (!color) return null
  if (tinycolorCache.has(color)) {
    return tinycolorCache.get(color)
  }
  let processedColor = color
  const hexWithAlphaMatch = processedColor.match(
    /#([0-9A-Fa-f]{6})([0-9A-Fa-f]{1,2})/i,
  )
  if (hexWithAlphaMatch) {
    const [, rgbPart, alphaPart] = hexWithAlphaMatch
    if (!/^[0-9A-Fa-f]{1,2}$/i.test(alphaPart)) {
      processedColor = `#${rgbPart}`
    }
  }
  const instance = tinycolor(processedColor)
  tinycolorCache.set(color, instance)
  return instance
}

/**
 * 生成渐变色字符串
 */
export function createGradientStr(
  newColors: GradientProps[],
  gradientType: GradientType,
  colorState: ColorPickerProps,
): string {
  if (!newColors || newColors.length === 0) {
    console.warn('createGradientStr: newColors is empty')
    return ''
  }

  const sorted = newColors
    .filter((color) => color.left !== undefined)
    .sort((a: GradientProps, b: GradientProps) => (a.left || 0) - (b.left || 0))

  if (sorted.length === 0) {
    console.warn('createGradientStr: no valid colors with left position')
    return ''
  }

  const colorString = sorted.map((color) => {
    const left = Math.max(0, Math.min(100, color.left || 0))
    return `${color.value} ${left}%`
  })

  const orientation =
    gradientType === GradientType.radial
      ? 'circle'
      : colorState.degreesStr || `${colorState.degrees || 90}deg`
  return `${gradientType}-gradient(${orientation}, ${colorString.join(', ')})`
}

/**
 * 验证颜色值是否有效
 */
export function isValidColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false

  const trimmedColor = color.trim()

  if (trimmedColor.includes('gradient')) {
    const gradientTypes = [
      'linear-gradient',
      'radial-gradient',
      'conic-gradient',
    ]
    const hasValidType = gradientTypes.some((type) =>
      trimmedColor.includes(type),
    )
    if (!hasValidType) return false

    const gradientRegex =
      /^(linear-gradient|radial-gradient|conic-gradient)\s*\(.*\)$/i
    if (!gradientRegex.test(trimmedColor)) return false

    const colorMatches = trimmedColor.match(
      /(#([0-9A-F]{3}){1,2}|rgb\(|rgba\(|hsl\(|hsla\()/gi,
    )
    return !!(colorMatches && colorMatches.length >= 2)
  }

  return tinycolor(trimmedColor).isValid()
}

/**
 * 格式化颜色字符串（转小写、去空格）
 */
export function formatColor(color: string): string {
  if (!color || typeof color !== 'string') return ''
  return color.trim().toLowerCase()
}

/**
 * 计算颜色对比度（0-1 范围，白色=1，黑色=0）
 */
export function getColorContrast(color: string): number {
  if (!color) return 0
  const instance = tinycolor(color)
  if (!instance.isValid()) return 0
  const rgb = instance.toRgb()
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return Math.round(luminance * 100) / 100
}

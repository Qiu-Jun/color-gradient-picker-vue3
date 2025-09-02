import { GradientProps, ColorPickerProps } from '@/interfaces'
import { GradientType } from '@/enums'

/**
 * 生成渐变色字符串
 * @param newColors 渐变颜色数组
 * @param gradientType 渐变类型
 * @param colorState 颜色状态对象
 * @returns 渐变色字符串
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

  // 按位置排序
  const sorted = newColors
    .filter((color) => color.left !== undefined)
    .sort((a: GradientProps, b: GradientProps) => (a.left || 0) - (b.left || 0))

  if (sorted.length === 0) {
    console.warn('createGradientStr: no valid colors with left position')
    return ''
  }

  // 构建颜色字符串
  const colorString = sorted.map((color) => {
    const left = Math.max(0, Math.min(100, color.left || 0))
    return `${color.value} ${left}%`
  })

  // 构建渐变字符串
  const degreesStr = colorState.degreesStr || `${colorState.degrees || 90}deg`
  const newGrade = `${gradientType}-gradient(${degreesStr}, ${colorString.join(
    ', ',
  )})`

  return newGrade
}

/**
 * 验证颜色值是否有效
 * @param color 颜色值
 * @returns 是否有效
 */
export function isValidColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false

  // 检查是否为有效的CSS颜色值
  const colorRegex =
    /^(#([0-9A-F]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)|hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\))$/i
  return colorRegex.test(color.trim())
}

/**
 * 格式化颜色值为小写
 * @param color 颜色值
 * @returns 格式化后的颜色值
 */
export function formatColor(color: string): string {
  if (!color) return ''
  return color.toLowerCase().trim()
}

/**
 * 获取颜色的对比度
 * @param color 颜色值
 * @returns 对比度值 (0-1)
 */
export function getColorContrast(color: string): number {
  // 简单的对比度计算，实际项目中可能需要更复杂的算法
  if (!color) return 0

  // 移除透明度，只考虑RGB分量
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (!rgbMatch) return 0.5

  const [, r, g, b] = rgbMatch
  const brightness =
    (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
  return brightness / 255
}

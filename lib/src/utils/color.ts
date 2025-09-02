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

  const trimmedColor = color.trim()

  // 检查是否为渐变字符串
  if (trimmedColor.includes('gradient')) {
    // 简化的渐变验证：只要包含有效的渐变类型和至少两个颜色就认为是有效的
    const gradientTypes = [
      'linear-gradient',
      'radial-gradient',
      'conic-gradient',
    ]
    const hasValidType = gradientTypes.some((type) =>
      trimmedColor.includes(type),
    )
    if (!hasValidType) return false

    // 检查基本结构：gradient-type(...)
    // 使用更宽松的正则表达式，允许嵌套括号
    const gradientRegex =
      /^(linear-gradient|radial-gradient|conic-gradient)\s*\(.*\)$/i
    if (!gradientRegex.test(trimmedColor)) return false

    // 简单验证：至少包含两个颜色值
    const colorMatches = trimmedColor.match(
      /(#([0-9A-F]{3}){1,2}|rgb\(|rgba\(|hsl\(|hsla\()/gi,
    )
    return !!(colorMatches && colorMatches.length >= 2)
  }

  // 检查是否为有效的CSS颜色值
  const colorRegex =
    /^(#([0-9A-F]{3}){1,2}|rgb\(\s*(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*\)|rgba\(\s*(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*(?:25[0-5]|2[0-4]\d|1\d\d|\d{1,2})\s*,\s*(?:0|1|0\.\d+)\s*\)|hsl\(\s*(?:[0-2]?[0-9]?[0-9]|3[0-5][0-9]|360)\s*,\s*(?:100|[1-9]?\d)%\s*,\s*(?:100|[1-9]?\d)%\s*\)|hsla\(\s*(?:[0-2]?[0-9]?[0-9]|3[0-5][0-9]|360)\s*,\s*(?:100|[1-9]?\d)%\s*,\s*(?:100|[1-9]?\d)%\s*,\s*(?:0|1|0\.\d+)\s*\))$/i
  return colorRegex.test(trimmedColor)
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
  if (!rgbMatch) return 0

  const [, r, g, b] = rgbMatch
  const brightness =
    (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
  return brightness / 255
}

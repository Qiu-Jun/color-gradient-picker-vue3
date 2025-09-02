import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  low,
  high,
  getColors,
  formatInputValues,
  round,
  clamp,
  percentToDecimal,
  decimalToPercent,
} from '@/utils/format'
import type { GradientProps } from '@/interfaces'

// Mock gradientParser
vi.mock('@/utils/gradientParser', () => ({
  gradientParser: vi.fn((value) => {
    if (value.includes('linear-gradient')) {
      return {
        colorStops: [
          { value: '#ff0000', left: 0 },
          { value: '#00ff00', left: 100 },
        ],
      }
    }
    if (value.includes('conic-gradient')) {
      return { colorStops: [] }
    }
    // 对于defaultGradient，返回空数组，这样会使用defaultColor
    return { colorStops: [] }
  }),
}))

// Mock config
vi.mock('@/constants', () => ({
  config: {
    defaultColor: 'rgba(175, 51, 242, 1)',
    defaultGradient: 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)',
  },
}))

describe('格式化工具函数', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('low', () => {
    it('应该将颜色值转换为小写', () => {
      const color: GradientProps = { value: '#FF0000' }
      expect(low(color)).toBe('#ff0000')
    })

    it('应该处理空值', () => {
      const color: GradientProps = { value: '' }
      expect(low(color)).toBe('')
    })

    it('应该处理undefined值', () => {
      const color: GradientProps = { value: undefined as any }
      expect(low(color)).toBe('')
    })
  })

  describe('high', () => {
    it('应该将颜色值转换为大写', () => {
      const color: GradientProps = { value: '#ff0000' }
      expect(high(color)).toBe('#FF0000')
    })

    it('应该处理空值', () => {
      const color: GradientProps = { value: '' }
      expect(high(color)).toBe('')
    })

    it('应该处理undefined值', () => {
      const color: GradientProps = { value: undefined as any }
      expect(high(color)).toBe('')
    })
  })

  describe('getColors', () => {
    it('应该从纯色值中提取颜色', () => {
      const result = getColors('#ff0000')
      expect(result).toEqual([{ value: '#ff0000' }])
    })

    it('应该从渐变值中提取颜色', () => {
      const result = getColors(
        'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)',
      )
      expect(result).toEqual([
        { value: '#ff0000', left: 0 },
        { value: '#00ff00', left: 100 },
      ])
    })

    it('应该处理无效的输入值', () => {
      const result = getColors('')
      expect(result).toEqual([{ value: 'rgba(175, 51, 242, 1)' }])
    })

    it('应该处理非字符串输入', () => {
      const result = getColors(null as any)
      expect(result).toEqual([{ value: 'rgba(175, 51, 242, 1)' }])
    })

    it('应该处理conic渐变', () => {
      const result = getColors('conic-gradient(red, blue)')
      // conic渐变会被转换为defaultGradient，然后解析为线性渐变
      expect(result).toEqual([
        { value: '#ff0000', left: 0 },
        { value: '#00ff00', left: 100 },
      ])
    })
  })

  describe('formatInputValues', () => {
    it('应该限制值在指定范围内', () => {
      expect(formatInputValues(50, 0, 100)).toBe(50)
      expect(formatInputValues(-10, 0, 100)).toBe(0)
      expect(formatInputValues(150, 0, 100)).toBe(100)
    })

    it('应该处理NaN值', () => {
      expect(formatInputValues(NaN, 0, 100)).toBe(0)
    })

    it('应该处理非数字值', () => {
      expect(formatInputValues('invalid' as any, 0, 100)).toBe(0)
    })
  })

  describe('round', () => {
    it('应该四舍五入数值', () => {
      expect(round(3.4)).toBe(3)
      expect(round(3.5)).toBe(4)
      expect(round(3.6)).toBe(4)
    })

    it('应该处理NaN值', () => {
      expect(round(NaN)).toBe(0)
    })

    it('应该处理非数字值', () => {
      expect(round('invalid' as any)).toBe(0)
    })
  })

  describe('clamp', () => {
    it('应该限制值在指定范围内', () => {
      expect(clamp(50, 0, 100)).toBe(50)
      expect(clamp(-10, 0, 100)).toBe(0)
      expect(clamp(150, 0, 100)).toBe(100)
    })

    it('应该处理边界值', () => {
      expect(clamp(0, 0, 100)).toBe(0)
      expect(clamp(100, 0, 100)).toBe(100)
    })
  })

  describe('percentToDecimal', () => {
    it('应该将百分比转换为小数', () => {
      expect(percentToDecimal(0)).toBe(0)
      expect(percentToDecimal(50)).toBe(0.5)
      expect(percentToDecimal(100)).toBe(1)
    })

    it('应该限制值在0-100范围内', () => {
      expect(percentToDecimal(-10)).toBe(0)
      expect(percentToDecimal(150)).toBe(1)
    })
  })

  describe('decimalToPercent', () => {
    it('应该将小数转换为百分比', () => {
      expect(decimalToPercent(0)).toBe(0)
      expect(decimalToPercent(0.5)).toBe(50)
      expect(decimalToPercent(1)).toBe(100)
    })

    it('应该限制值在0-1范围内', () => {
      expect(decimalToPercent(-0.1)).toBe(0)
      expect(decimalToPercent(1.5)).toBe(100)
    })

    it('应该四舍五入结果', () => {
      expect(decimalToPercent(0.333)).toBe(33)
      expect(decimalToPercent(0.666)).toBe(67)
    })
  })
})

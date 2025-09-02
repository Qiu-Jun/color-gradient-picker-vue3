import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  safeBounds,
  getHandleValue,
  computeSquareXY,
  computePickerPosition,
  isUpperCase,
  objectToString,
  getColorObj,
  getIsGradient,
  getDetails,
} from '@/utils/utils'
import type { GradientProps } from '@/interfaces'

// Mock config
vi.mock('@/constants', () => ({
  config: {
    barSize: 20,
    crossSize: 18,
    defaultGradient: 'linear-gradient(90deg, #ff0000, #00ff00)',
  },
}))

describe('工具函数', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('safeBounds', () => {
    it('应该返回正确的边界信息', () => {
      const mockEvent = {
        target: {
          parentNode: {
            getBoundingClientRect: () => ({
              x: 100,
              y: 200,
              width: 300,
              height: 400,
            }),
          },
          className: 'test-class',
        },
      }

      const result = safeBounds(mockEvent)
      expect(result.offsetLeft).toBe(100)
      expect(result.offsetTop).toBe(200)
      expect(result.clientWidth).toBe(300)
      expect(result.clientHeight).toBe(400)
    })

    it('应该处理c-resize ps-rl类名的调整', () => {
      const mockEvent = {
        target: {
          parentNode: {
            getBoundingClientRect: () => ({
              x: 100,
              y: 200,
              width: 300,
              height: 400,
            }),
          },
          className: 'c-resize ps-rl',
        },
      }

      const result = safeBounds(mockEvent)
      expect(result.offsetLeft).toBe(115) // 100 + 15
    })
  })

  describe('getHandleValue', () => {
    it('应该计算正确的句柄值', () => {
      const mockEvent = {
        clientX: 150,
        target: {
          parentNode: {
            getBoundingClientRect: () => ({
              x: 100,
              width: 300,
            }),
          },
        },
      }

      const result = getHandleValue(mockEvent)
      expect(typeof result).toBe('number')
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })
  })

  describe('computeSquareXY', () => {
    it('应该计算正确的正方形坐标', () => {
      const result = computeSquareXY(0.5, 0.5, 200, 200)
      expect(result).toHaveLength(2)
      expect(typeof result[0]).toBe('number')
      expect(typeof result[1]).toBe('number')
    })

    it('应该处理边界值', () => {
      const result1 = computeSquareXY(0, 0, 200, 200)
      const result2 = computeSquareXY(1, 1, 200, 200)

      expect(result1[0]).toBeLessThan(result2[0])
      expect(result1[1]).toBeGreaterThan(result2[1])
    })
  })

  describe('computePickerPosition', () => {
    it('应该计算正确的选择器位置', () => {
      const mockEvent = {
        clientX: 150,
        clientY: 250,
        target: {
          parentNode: {
            getBoundingClientRect: () => ({
              x: 100,
              y: 200,
              width: 300,
              height: 400,
            }),
          },
        },
      }

      const result = computePickerPosition(mockEvent)
      expect(result).toHaveLength(2)
      expect(typeof result[0]).toBe('number')
      expect(typeof result[1]).toBe('number')
    })

    it('应该处理触摸事件', () => {
      const mockTouchEvent = {
        touches: [{ clientX: 150, clientY: 250 }],
        target: {
          parentNode: {
            getBoundingClientRect: () => ({
              x: 100,
              y: 200,
              width: 300,
              height: 400,
            }),
          },
        },
      }

      const result = computePickerPosition(mockTouchEvent)
      expect(result).toHaveLength(2)
    })
  })

  describe('isUpperCase', () => {
    it('应该检测大写字符串', () => {
      expect(isUpperCase('ABC')).toBe(true)
      expect(isUpperCase('abc')).toBe(false)
      expect(isUpperCase('Abc')).toBe(true)
      expect(isUpperCase('')).toBe(false)
    })

    it('应该处理空值', () => {
      expect(isUpperCase(null as any)).toBe(false)
      expect(isUpperCase(undefined as any)).toBe(false)
    })
  })

  describe('objectToString', () => {
    it('应该处理字符串输入', () => {
      expect(objectToString('#ff0000')).toBe('#ff0000')
      expect(objectToString('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)')
    })

    it('应该处理渐变对象', () => {
      const gradientObj = {
        type: 'linear-gradient',
        orientation: { value: '90deg' },
        colorStops: [
          { value: '#ff0000', left: 0 },
          { value: '#00ff00', left: 100 },
        ],
      }

      const result = objectToString(gradientObj)
      expect(result).toContain('linear-gradient')
      expect(result).toContain('#ff0000')
      expect(result).toContain('#00ff00')
    })

    it('应该处理简写方向', () => {
      const gradientObj = {
        type: 'linear-gradient',
        orientation: { value: 'to top' },
        colorStops: [
          { value: '#ff0000', left: 0 },
          { value: '#00ff00', left: 100 },
        ],
      }

      const result = objectToString(gradientObj)
      expect(result).toContain('0deg')
    })

    it('应该处理径向渐变', () => {
      const gradientObj = {
        type: 'radial-gradient',
        orientation: { value: 'circle' },
        colorStops: [
          { value: '#ff0000', left: 0 },
          { value: '#00ff00', left: 100 },
        ],
      }

      const result = objectToString(gradientObj)
      expect(result).toContain('radial-gradient')
      expect(result).toContain('circle')
    })
  })

  describe('getColorObj', () => {
    it('应该返回正确的颜色对象', () => {
      const colors: GradientProps[] = [
        { value: '#ff0000', left: 0 },
        { value: '#00ff00', left: 50 },
        { value: '#0000ff', left: 100 },
      ]

      const result = getColorObj(colors)
      expect(result.currentColor).toBe('#ff0000')
      expect(result.selectedColor).toBe(0)
      expect(result.currentLeft).toBe(0)
    })

    it('应该优先选择大写颜色', () => {
      const colors: GradientProps[] = [
        { value: '#ff0000', left: 0 },
        { value: '#00FF00', left: 50 }, // 大写
        { value: '#0000ff', left: 100 },
      ]

      const result = getColorObj(colors)
      expect(result.currentColor).toBe('#00FF00')
      expect(result.selectedColor).toBe(1)
      expect(result.currentLeft).toBe(50)
    })

    it('应该处理空数组', () => {
      const result = getColorObj([])
      expect(result.currentColor).toBe(
        'linear-gradient(90deg, #ff0000, #00ff00)',
      )
      expect(result.selectedColor).toBe(0)
      expect(result.currentLeft).toBe(0)
    })
  })

  describe('getIsGradient', () => {
    it('应该检测渐变字符串', () => {
      expect(getIsGradient('linear-gradient(90deg, #ff0000, #00ff00)')).toBe(
        true,
      )
      expect(getIsGradient('radial-gradient(circle, #ff0000, #00ff00)')).toBe(
        true,
      )
      expect(getIsGradient('#ff0000')).toBe(false)
      expect(getIsGradient('rgb(255, 0, 0)')).toBe(false)
    })

    it('应该处理空值', () => {
      expect(getIsGradient('')).toBe(false)
      expect(getIsGradient(null as any)).toBe(false)
      expect(getIsGradient(undefined as any)).toBe(false)
    })
  })

  describe('getDetails', () => {
    it('应该解析线性渐变', () => {
      const result = getDetails('linear-gradient(90deg, #ff0000, #00ff00)')
      expect(result.degrees).toBe(90)
      expect(result.degreeStr).toBe('90deg')
      expect(result.gradientType).toBe('linear-gradient')
    })

    it('应该解析径向渐变', () => {
      const result = getDetails('radial-gradient(circle, #ff0000, #00ff00)')
      expect(result.degrees).toBe(0)
      expect(result.degreeStr).toBe('circle')
      expect(result.gradientType).toBe('radial-gradient')
    })

    it('应该处理简写方向', () => {
      const result = getDetails('linear-gradient(to top, #ff0000, #00ff00)')
      expect(result.degrees).toBe(0)
      expect(result.degreeStr).toBe('0deg')
    })

    it('应该处理无效输入', () => {
      const result = getDetails('')
      expect(result.degrees).toBe(0)
      expect(result.degreeStr).toBe('0deg')
      expect(result.gradientType).toBe('')
    })
  })
})

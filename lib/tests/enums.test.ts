import { describe, it, expect } from 'vitest'
import { InputType, GradientType, Modes, EventType, DEFAULT_VALUES } from '@/enums'

describe('枚举定义', () => {
  describe('InputType', () => {
    it('应该包含正确的输入类型', () => {
      expect(InputType.hsl).toBe('HSL')
      expect(InputType.rgb).toBe('RGB')
      expect(InputType.hsv).toBe('HSV')
      expect(InputType.cmyk).toBe('CMYK')
    })

    it('应该包含所有预期的输入类型', () => {
      const expectedTypes = ['HSL', 'RGB', 'HSV', 'CMYK']
      const actualTypes = Object.values(InputType)
      expect(actualTypes).toEqual(expectedTypes)
    })
  })

  describe('GradientType', () => {
    it('应该包含正确的渐变类型', () => {
      expect(GradientType.linear).toBe('linear')
      expect(GradientType.radial).toBe('radial')
    })

    it('应该包含所有预期的渐变类型', () => {
      const expectedTypes = ['linear', 'radial']
      const actualTypes = Object.values(GradientType)
      expect(actualTypes).toEqual(expectedTypes)
    })
  })

  describe('Modes', () => {
    it('应该包含正确的模式', () => {
      expect(Modes.solid).toBe('solid')
      expect(Modes.gradient).toBe('gradient')
    })

    it('应该包含所有预期的模式', () => {
      const expectedModes = ['solid', 'gradient']
      const actualModes = Object.values(Modes)
      expect(actualModes).toEqual(expectedModes)
    })
  })

  describe('EventType', () => {
    it('应该包含正确的事件类型', () => {
      expect(EventType.change).toBe('change')
      expect(EventType.update).toBe('update:value')
    })

    it('应该包含所有预期的事件类型', () => {
      const expectedEvents = ['change', 'update:value']
      const actualEvents = Object.values(EventType)
      expect(actualEvents).toEqual(expectedEvents)
    })
  })

  describe('DEFAULT_VALUES', () => {
    it('应该包含正确的默认值', () => {
      expect(DEFAULT_VALUES.DEFAULT_COLOR).toBe('rgba(175, 51, 242, 1)')
      expect(DEFAULT_VALUES.DEFAULT_WIDTH).toBe(300)
      expect(DEFAULT_VALUES.DEFAULT_DEGREES).toBe(90)
      expect(DEFAULT_VALUES.MAX_PRESET_COLORS).toBe(18)
      expect(DEFAULT_VALUES.MIN_GRADIENT_POINTS).toBe(2)
    })

    it('应该包含所有预期的默认值', () => {
      const expectedKeys = [
        'DEFAULT_COLOR',
        'DEFAULT_WIDTH',
        'DEFAULT_DEGREES',
        'MAX_PRESET_COLORS',
        'MIN_GRADIENT_POINTS',
      ]
      const actualKeys = Object.keys(DEFAULT_VALUES)
      expect(actualKeys).toEqual(expectedKeys)
    })

    it('应该具有正确的类型', () => {
      expect(typeof DEFAULT_VALUES.DEFAULT_COLOR).toBe('string')
      expect(typeof DEFAULT_VALUES.DEFAULT_WIDTH).toBe('number')
      expect(typeof DEFAULT_VALUES.DEFAULT_DEGREES).toBe('number')
      expect(typeof DEFAULT_VALUES.MAX_PRESET_COLORS).toBe('number')
      expect(typeof DEFAULT_VALUES.MIN_GRADIENT_POINTS).toBe('number')
    })
  })
})

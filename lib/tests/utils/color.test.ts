import { describe, it, expect } from 'vitest'
import {
  createGradientStr,
  isValidColor,
  formatColor,
  getColorContrast,
} from '../../src/utils/color'
import { GradientType } from '../../src/enums'
import type { GradientProps, ColorPickerProps } from '../../src/interfaces'

describe('Color Utils', () => {
  describe('createGradientStr', () => {
    it('should create linear gradient string', () => {
      const colors: GradientProps[] = [
        { value: '#ff0000', left: 0 },
        { value: '#00ff00', left: 100 },
      ]
      const colorState: ColorPickerProps = {
        degrees: 90,
        degreesStr: '90deg',
        width: 300,
      }

      const result = createGradientStr(colors, GradientType.linear, colorState)
      expect(result).toBe('linear-gradient(90deg, #ff0000 0%, #00ff00 100%)')
    })

    it('should handle empty colors array', () => {
      const colors: GradientProps[] = []
      const colorState: ColorPickerProps = { degrees: 90, width: 300 }

      const result = createGradientStr(colors, GradientType.linear, colorState)
      expect(result).toBe('')
    })

    it('should filter and sort colors by left position', () => {
      const colors: GradientProps[] = [
        { value: '#00ff00', left: 100 },
        { value: '#ff0000', left: 0 },
        { value: '#0000ff', left: 50 },
      ]
      const colorState: ColorPickerProps = { degrees: 90, width: 300 }

      const result = createGradientStr(colors, GradientType.linear, colorState)
      expect(result).toBe(
        'linear-gradient(90deg, #ff0000 0%, #0000ff 50%, #00ff00 100%)',
      )
    })
  })

  describe('isValidColor', () => {
    describe('Single Colors', () => {
      it('should validate hex colors', () => {
        expect(isValidColor('#ff0000')).toBe(true)
        expect(isValidColor('#f00')).toBe(true)
        expect(isValidColor('#gggggg')).toBe(false)
      })

      it('should validate rgb colors', () => {
        expect(isValidColor('rgb(255, 0, 0)')).toBe(true)
        expect(isValidColor('rgb(0, 255, 0)')).toBe(true)
        expect(isValidColor('rgb(300, 0, 0)')).toBe(false)
      })

      it('should validate rgba colors', () => {
        expect(isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true)
        expect(isValidColor('rgba(0, 255, 0, 1)')).toBe(true)
        expect(isValidColor('rgba(255, 0, 0, 1.5)')).toBe(false)
      })

      it('should validate hsl colors', () => {
        expect(isValidColor('hsl(0, 100%, 50%)')).toBe(true)
        expect(isValidColor('hsl(120, 50%, 75%)')).toBe(true)
        expect(isValidColor('hsl(400, 100%, 50%)')).toBe(false)
      })

      it('should validate hsla colors', () => {
        expect(isValidColor('hsla(0, 100%, 50%, 0.5)')).toBe(true)
        expect(isValidColor('hsla(120, 50%, 75%, 1)')).toBe(true)
        expect(isValidColor('hsla(0, 100%, 50%, 1.5)')).toBe(false)
      })

      it('should reject invalid colors', () => {
        expect(isValidColor('invalid-color')).toBe(false)
        expect(isValidColor('')).toBe(false)
        expect(isValidColor(null as any)).toBe(false)
        expect(isValidColor(undefined as any)).toBe(false)
      })
    })

    describe('Gradient Colors', () => {
      it('should validate linear gradients', () => {
        expect(
          isValidColor(
            'linear-gradient(90deg, rgb(245, 66, 245) 0%, rgb(0, 0, 255) 100%)',
          ),
        ).toBe(true)
        expect(
          isValidColor('linear-gradient(to right, #ff0000 0%, #00ff00 100%)'),
        ).toBe(true)
        expect(
          isValidColor(
            'linear-gradient(45deg, rgba(255, 0, 0, 0.5) 0%, rgba(0, 255, 0, 0.8) 100%)',
          ),
        ).toBe(true)
      })

      it('should validate radial gradients', () => {
        expect(
          isValidColor(
            'radial-gradient(circle, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
          ),
        ).toBe(true)
        expect(
          isValidColor(
            'radial-gradient(ellipse, rgb(255, 0, 0) 0%, rgb(0, 255, 0) 100%)',
          ),
        ).toBe(true)
      })

      it('should validate conic gradients', () => {
        expect(
          isValidColor('conic-gradient(from 0deg, #ff0000, #00ff00, #0000ff)'),
        ).toBe(true)
        expect(
          isValidColor(
            'conic-gradient(from 45deg, rgb(255, 0, 0) 0deg, rgb(0, 255, 0) 180deg)',
          ),
        ).toBe(true)
      })

      it('should reject invalid gradients', () => {
        expect(
          isValidColor(
            'invalid-gradient(90deg, rgb(245, 66, 245) 0%, rgb(0, 0, 255) 100%)',
          ),
        ).toBe(false)
        expect(
          isValidColor(
            'linear-gradient(90deg, invalid-color 0%, rgb(0, 0, 255) 100%)',
          ),
        ).toBe(false)
        expect(
          isValidColor('linear-gradient(90deg, rgb(245, 66, 245) 0%)'),
        ).toBe(false) // 只有一个颜色停止点
        expect(isValidColor('linear-gradient(90deg)')).toBe(false) // 没有颜色停止点
      })

      it('should handle edge cases', () => {
        expect(
          isValidColor(
            'linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
          ),
        ).toBe(true)
        expect(isValidColor('linear-gradient(90deg, #ff0000, #00ff00)')).toBe(
          true,
        ) // 没有位置
        expect(
          isValidColor(
            'linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%, #ffff00 150%)',
          ),
        ).toBe(true) // 超过100%的位置
      })
    })
  })

  describe('formatColor', () => {
    it('should format color to lowercase', () => {
      expect(formatColor('#FF0000')).toBe('#ff0000')
      expect(formatColor('RGB(255, 0, 0)')).toBe('rgb(255, 0, 0)')
      expect(formatColor('  #00FF00  ')).toBe('#00ff00')
    })

    it('should handle empty input', () => {
      expect(formatColor('')).toBe('')
      expect(formatColor(null as any)).toBe('')
      expect(formatColor(undefined as any)).toBe('')
    })
  })

  describe('getColorContrast', () => {
    it('should calculate contrast for rgb colors', () => {
      expect(getColorContrast('rgb(255, 255, 255)')).toBeCloseTo(1, 2) // 白色
      expect(getColorContrast('rgb(0, 0, 0)')).toBeCloseTo(0, 2) // 黑色
      expect(getColorContrast('rgb(128, 128, 128)')).toBeCloseTo(0.5, 1) // 灰色
    })

    it('should handle rgba colors', () => {
      expect(getColorContrast('rgba(255, 255, 255, 0.5)')).toBeCloseTo(1, 2)
      expect(getColorContrast('rgba(0, 0, 0, 0.8)')).toBeCloseTo(0, 2)
    })

    it('should return default for invalid colors', () => {
      expect(getColorContrast('invalid-color')).toBe(0)
      expect(getColorContrast('')).toBe(0)
      expect(getColorContrast(null as any)).toBe(0)
    })
  })
})

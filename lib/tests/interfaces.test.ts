import { describe, it, expect } from 'vitest'
import type {
  ColorPickerProps,
  GradientProps,
  IColor,
  IColorValue,
  IMode,
  IProvide,
} from '@/interfaces'
import { InputType, Modes } from '@/enums'

describe('接口类型定义', () => {
  describe('ColorPickerProps', () => {
    it('应该具有正确的属性类型', () => {
      const props: ColorPickerProps = {
        width: 300,
        height: 300,
        gradientColorsIdx: 0,
        degrees: 90,
        degreesStr: '90deg',
        gradientColor: 'linear-gradient(90deg, #ff0000, #00ff00)',
        value: '#ff0000',
        hideGradient: false,
        showAdvancedSliders: false,
        hideInputs: false,
        hideOpacity: false,
        hc: {
          r: 255,
          g: 0,
          b: 0,
          a: 1,
          h: 0,
          s: 100,
          v: 100,
        },
        isGradient: false,
        inputType: InputType.rgb,
        onChange: () => {},
        mode: Modes.solid,
        gradientColors: [],
        presetColors: ['#ff0000', '#00ff00'],
        hidePresets: false,
      }

      expect(props.width).toBe(300)
      expect(props.value).toBe('#ff0000')
      expect(props.hideGradient).toBe(false)
      expect(props.inputType).toBe(InputType.rgb)
      expect(props.mode).toBe(Modes.solid)
    })
  })

  describe('GradientProps', () => {
    it('应该具有正确的属性类型', () => {
      const gradient: GradientProps = {
        value: '#ff0000',
        index: 0,
        left: 50,
      }

      expect(gradient.value).toBe('#ff0000')
      expect(gradient.index).toBe(0)
      expect(gradient.left).toBe(50)
    })

    it('应该支持可选属性', () => {
      const gradient: GradientProps = {
        value: '#ff0000',
      }

      expect(gradient.value).toBe('#ff0000')
      expect(gradient.index).toBeUndefined()
      expect(gradient.left).toBeUndefined()
    })
  })

  describe('IColorValue', () => {
    it('应该具有正确的颜色值属性', () => {
      const colorValue: IColorValue = {
        r: 255,
        g: 0,
        b: 0,
        a: 1,
        h: 0,
        s: 100,
        v: 100,
      }

      expect(colorValue.r).toBe(255)
      expect(colorValue.g).toBe(0)
      expect(colorValue.b).toBe(0)
      expect(colorValue.a).toBe(1)
      expect(colorValue.h).toBe(0)
      expect(colorValue.s).toBe(100)
      expect(colorValue.v).toBe(100)
    })
  })

  describe('IColor', () => {
    it('应该具有正确的颜色对象属性', () => {
      const color: IColor = {
        mode: Modes.solid,
        color: '#ff0000',
        angle: 90,
        degrees: 90,
        colors: [
          { color: '#ff0000', offset: 0 },
          { color: '#00ff00', offset: 100 },
        ],
        gradientType: 'linear',
        gradientColors: [
          { color: '#ff0000', left: 0 },
          { color: '#00ff00', left: 100 },
        ],
      }

      expect(color.mode).toBe(Modes.solid)
      expect(color.color).toBe('#ff0000')
      expect(color.angle).toBe(90)
      expect(color.degrees).toBe(90)
      expect(color.colors).toHaveLength(2)
      expect(color.gradientType).toBe('linear')
      expect(color.gradientColors).toHaveLength(2)
    })

    it('应该支持可选属性', () => {
      const color: IColor = {
        color: '#ff0000',
      }

      expect(color.color).toBe('#ff0000')
      expect(color.mode).toBeUndefined()
      expect(color.angle).toBeUndefined()
    })
  })

  describe('IProvide', () => {
    it('应该继承ColorPickerProps并添加必需属性', () => {
      const provide: IProvide = {
        width: 300,
        height: 300,
        value: '#ff0000',
        hc: {
          r: 255,
          g: 0,
          b: 0,
          a: 1,
          h: 0,
          s: 100,
          v: 100,
        },
      }

      expect(provide.width).toBe(300)
      expect(provide.height).toBe(300)
      expect(provide.value).toBe('#ff0000')
      expect(provide.hc.r).toBe(255)
    })
  })

  describe('IMode', () => {
    it('应该是Modes的联合类型', () => {
      const solidMode: IMode = Modes.solid
      const gradientMode: IMode = Modes.gradient

      expect(solidMode).toBe('solid')
      expect(gradientMode).toBe('gradient')
    })
  })
})

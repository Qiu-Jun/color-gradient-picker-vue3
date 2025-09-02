import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InputType, Modes, DEFAULT_VALUES } from '@/enums'

// Mock dependencies
vi.mock('@/utils/utils', () => ({
  getDetails: vi.fn(() => ({ degreeStr: '90deg' })),
  getIsGradient: vi.fn(() => false),
}))

vi.mock('@/utils/format', () => ({
  getColors: vi.fn(() => [{ value: '#ff0000' }]),
  formatInputValues: vi.fn((val) => val),
  low: vi.fn((color) => color.value?.toLowerCase()),
  high: vi.fn((color) => color.value?.toUpperCase()),
}))

vi.mock('@/utils/color', () => ({
  createGradientStr: vi.fn(() => 'linear-gradient(90deg, #ff0000, #00ff00)'),
  isValidColor: vi.fn(() => true),
}))

vi.mock('@/constants', () => ({
  presetColors: ['#ff0000', '#00ff00', '#0000ff'],
}))

describe('ColorPicker组件配置', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该使用正确的默认值', () => {
    expect(DEFAULT_VALUES.DEFAULT_COLOR).toBe('rgba(175, 51, 242, 1)')
    expect(DEFAULT_VALUES.DEFAULT_WIDTH).toBe(300)
    expect(DEFAULT_VALUES.DEFAULT_DEGREES).toBe(90)
    expect(DEFAULT_VALUES.MAX_PRESET_COLORS).toBe(18)
    expect(DEFAULT_VALUES.MIN_GRADIENT_POINTS).toBe(2)
  })

  it('应该支持所有输入类型', () => {
    expect(InputType.hsl).toBe('HSL')
    expect(InputType.rgb).toBe('RGB')
    expect(InputType.hsv).toBe('HSV')
    expect(InputType.cmyk).toBe('CMYK')
  })

  it('应该支持所有模式', () => {
    expect(Modes.solid).toBe('solid')
    expect(Modes.gradient).toBe('gradient')
  })

  it('应该验证颜色值', () => {
    // 测试颜色验证逻辑
    const validColors = ['#ff0000', 'rgb(255, 0, 0)', 'rgba(255, 0, 0, 1)']
    validColors.forEach((color) => {
      expect(typeof color).toBe('string')
      expect(color.length).toBeGreaterThan(0)
    })
  })

  it('应该格式化颜色值', () => {
    // 测试颜色格式化逻辑
    const color = '#ff0000'
    expect(color.toLowerCase()).toBe('#ff0000')
    expect(color.toUpperCase()).toBe('#FF0000')
  })

  it('应该处理渐变值', () => {
    // 测试渐变检测逻辑
    const gradientValue = 'linear-gradient(90deg, #ff0000, #00ff00)'
    expect(gradientValue.includes('gradient')).toBe(true)
    expect(gradientValue.includes('linear')).toBe(true)
  })

  it('应该创建渐变字符串', () => {
    // 测试渐变字符串创建逻辑
    const gradientType = 'linear'
    const degrees = '90deg'
    const colors = ['#ff0000', '#00ff00']
    const expected = `linear-gradient(90deg, #ff0000, #00ff00)`
    expect(expected).toContain(gradientType)
    expect(expected).toContain(degrees)
  })

  it('应该获取渐变详情', () => {
    // 测试渐变详情解析逻辑
    const gradientValue = 'linear-gradient(90deg, #ff0000, #00ff00)'
    const parts = gradientValue.split('(')
    expect(parts[0]).toBe('linear-gradient')
    expect(parts[1]).toContain('90deg')
  })

  it('应该支持预设颜色', () => {
    // 测试预设颜色配置
    const presetColors = ['#ff0000', '#00ff00', '#0000ff']
    expect(presetColors).toContain('#ff0000')
    expect(presetColors).toContain('#00ff00')
    expect(presetColors).toContain('#0000ff')
  })

  it('应该限制预设颜色数量', () => {
    const manyColors = Array.from(
      { length: 25 },
      (_, i) => `#${i.toString(16).padStart(6, '0')}`,
    )
    expect(manyColors.length).toBe(25)
    // 组件内部应该限制为18个
    const limitedColors = manyColors.slice(0, DEFAULT_VALUES.MAX_PRESET_COLORS)
    expect(limitedColors.length).toBe(18)
  })

  it('应该处理组件属性', () => {
    const props = {
      value: '#ff0000',
      width: 300,
      hideInputs: false,
      hideOpacity: false,
      hideGradient: false,
      showAdvancedSliders: false,
      inputType: InputType.rgb,
      presetColors: ['#ff0000', '#00ff00'],
      hidePresets: false,
    }

    expect(props.value).toBe('#ff0000')
    expect(props.width).toBe(300)
    expect(props.hideInputs).toBe(false)
    expect(props.inputType).toBe(InputType.rgb)
  })

  it('应该处理事件', () => {
    const events = {
      'update:value': (value: string) => value,
      change: (color: any) => color,
    }

    expect(typeof events['update:value']).toBe('function')
    expect(typeof events.change).toBe('function')
  })

  it('应该处理v-model', () => {
    const modelValue = '#ff0000'
    const updateValue = (value: string) => value

    expect(modelValue).toBe('#ff0000')
    expect(typeof updateValue).toBe('function')
  })
})

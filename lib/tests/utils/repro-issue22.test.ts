import { describe, it, expect } from 'vitest'
import { createGradientStr } from '../../src/utils/color'
import { getDetails } from '../../src/utils/utils'
import { getColors } from '../../src/utils/format'
import { GradientType } from '../../src/enums'
import type { GradientProps, ColorPickerProps } from '../../src/interfaces'

// 复现 issue #22：linear -> radial -> linear 会出现黑色色标
describe('issue #22 repro: radial -> linear adds black stop', () => {
  it('full switch chain produces a black stop on current code', () => {
    const colors: GradientProps[] = [
      { value: '#ffc0cb', left: 0 },
      { value: '#0000ff', left: 100 },
    ]
    const colorState: ColorPickerProps = {
      degrees: 90,
      degreesStr: '90deg',
      width: 300,
    }

    // 步骤 1：切到 radial，setValue 内会用 getDetails 更新 degrees/degreesStr
    const radialStr = createGradientStr(colors, GradientType.radial, colorState)
    expect(radialStr).toBe('radial-gradient(circle, #ffc0cb 0%, #0000ff 100%)')

    const { degrees, degreeStr } = getDetails(radialStr)
    colorState.degrees = degrees
    colorState.degreesStr = degreeStr
    // radial 模式下 degreesStr 被污染为 'circle'，degrees 被置 0
    expect(colorState.degreesStr).toBe('circle')
    expect(colorState.degrees).toBe(0)

    // 步骤 2：切回 linear，setLinear 会再次调用 createGradientStr
    const linearStr = createGradientStr(colors, GradientType.linear, colorState)
    console.log('linearStr =', linearStr)
    expect(linearStr).toContain('circle')

    // 步骤 3：setValue 解析这个非法字符串，'circle' 被当作颜色字面量
    const parsed = getColors(linearStr)
    console.log('parsed stops =', JSON.stringify(parsed))
    expect(parsed.length).toBe(3)
    expect(parsed[0].value).toBe('rgba(0, 0, 0, 1)')
  })
})

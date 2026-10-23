import { describe, it, expect } from 'vitest'
import { gradientParser } from '../../src/utils/gradientParser'

describe('gradientParser', () => {
  it('should preserve integer stop positions', () => {
    const result = gradientParser(
      'linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
    )

    expect(result.colorStops.map((s: { left: number }) => s.left)).toEqual([
      0, 50, 100,
    ])
  })

  it('should preserve decimal stop positions', () => {
    const result = gradientParser(
      'linear-gradient(90deg, #ff0000 0%, #00ff00 33.5%, #0000ff 100%)',
    )

    expect(result.colorStops.map((s: { left: number }) => s.left)).toEqual([
      0, 33.5, 100,
    ])
  })

  it('should default missing stop positions to 0', () => {
    const result = gradientParser('linear-gradient(90deg, #ff0000, #00ff00)')

    expect(result.colorStops.every((s: { left: number }) => s.left === 0)).toBe(
      true,
    )
  })
})

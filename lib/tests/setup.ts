import { vi } from 'vitest'

// Mock CSS modules
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

// Mock Vue auto-imports
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    reactive: vi.fn((obj) => obj),
    ref: vi.fn((value) => ({ value })),
    computed: vi.fn((fn) => ({ value: fn() })),
    provide: vi.fn(),
    inject: vi.fn(),
    nextTick: vi.fn(() => Promise.resolve()),
  }
})

// Mock UnoCSS
vi.mock('virtual:uno.css', () => ({}))

// Mock tinycolor2
vi.mock('tinycolor2', () => ({
  default: vi.fn((color) => ({
    toRgb: () => ({ r: 255, g: 0, b: 0, a: 1 }),
    toHsv: () => ({ h: 0, s: 100, v: 100 }),
    toHex: () => '#ff0000',
    toHsl: () => ({ h: 0, s: 100, l: 50 }),
    isValid: () => true,
  })),
}))

// Mock lodash-es
vi.mock('lodash-es', () => ({
  cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
  debounce: vi.fn((fn) => fn),
  throttle: vi.fn((fn) => fn),
}))

// Global test utilities
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn(),
}

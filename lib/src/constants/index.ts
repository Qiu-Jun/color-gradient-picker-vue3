import { InputType } from '@/enums'

export const inputTypes: InputType[] = [
  InputType.rgb,
  InputType.hsl,
]

export const config = {
  barSize: 18,
  crossSize: 18,
  delay: 150,
  defaultColor: 'rgba(175, 51, 242, 1)',
  defaultGradient:
    'linear-gradient(90deg, rgb(245, 66, 245) 0%, rgb(0, 0, 255) 100%)',
}

/** 拖拽节流间隔（ms） */
export const THROTTLE_DELAY = 16

/** 点击防抖间隔（ms） */
export const DEBOUNCE_DELAY = 250

/** Hue/Opacity 条高度 */
export const BAR_HEIGHT = 14

export const defaultLocales = {
  CONTROLS: {
    SOLID: 'Solid',
    GRADIENT: 'Gradient',
  },
}

export const presetColors = [
  'rgba(0,0,0,1)',
  'rgba(128,128,128, 1)',
  'rgba(192,192,192, 1)',
  'rgba(255,255,255, 1)',
  'rgba(0,0,128,1)',
  'rgba(0,0,255,1)',
  'rgba(0,255,255, 1)',
  'rgba(0,128,0,1)',
  'rgba(128,128,0, 1)',
  'rgba(0,128,128,1)',
  'rgba(0,255,0, 1)',
  'rgba(128,0,0, 1)',
  'rgba(128,0,128, 1)',
  'rgba(175, 51, 242, 1)',
  'rgba(255,0,255, 1)',
  'rgba(255,0,0, 1)',
  'rgba(240, 103, 46, 1)',
  'rgba(255,255,0, 1)',
]

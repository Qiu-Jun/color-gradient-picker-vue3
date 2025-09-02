/*
 * @Author: June
 * @Description: 颜色选择器枚举定义
 * @Date: 2024-12-04 11:58:12
 * @LastEditTime: 2024-12-10 13:15:02
 * @LastEditors: June
 */

/**
 * 输入类型枚举
 */
export enum InputType {
  /** HSL颜色模式 */
  hsl = 'HSL',
  /** RGB颜色模式 */
  rgb = 'RGB',
  /** HSV颜色模式 */
  hsv = 'HSV',
  /** CMYK颜色模式 */
  cmyk = 'CMYK',
}

/**
 * 渐变类型枚举
 */
export enum GradientType {
  /** 线性渐变 */
  linear = 'linear',
  /** 径向渐变 */
  radial = 'radial',
}

/**
 * 颜色模式枚举
 */
export enum Modes {
  /** 纯色模式 */
  solid = 'solid',
  /** 渐变模式 */
  gradient = 'gradient',
}

/**
 * 事件类型枚举
 */
export enum EventType {
  /** 颜色变化 */
  change = 'change',
  /** 值更新 */
  update = 'update:value',
}

/**
 * 默认值常量
 */
export const DEFAULT_VALUES = {
  /** 默认颜色 */
  DEFAULT_COLOR: 'rgba(175, 51, 242, 1)',
  /** 默认宽度 */
  DEFAULT_WIDTH: 300,
  /** 默认角度 */
  DEFAULT_DEGREES: 90,
  /** 最大预设颜色数量 */
  MAX_PRESET_COLORS: 18,
  /** 最小渐变点数量 */
  MIN_GRADIENT_POINTS: 2,
} as const

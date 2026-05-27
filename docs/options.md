<!--
 * @Author: June
 * @Description: 配置项文档
 * @Date: 2024-12-21 12:52:42
 * @LastEditTime: 2024-12-22 00:23:32
 * @LastEditors: June
-->

# color-gradient-picker-vue3

这里主要介绍 `color-gradient-picker-vue3` 的使用以及一些常用配置，以及主要注意事项。

## 注意

由于 UI 设计问题，`color-gradient-picker-vue3` 的宽度最小为 `320px`，主要为了保证底部预设色的美观，如果设置的 `width` 小于 `320`，那么初始化时会默认为 `320`。

## 安装

#### pnpm

```bash
pnpm add color-gradient-picker-vue3
```

#### npm

```bash
npm install color-gradient-picker-vue3
```

#### yarn

```bash
yarn add color-gradient-picker-vue3
```

## 快速使用

```html
<template>
  <ColorPicker v-model:value="color" @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const color = ref('rgba(175, 51, 242, 1)')
const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>
```

## Props 配置说明

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `String` | `'rgba(175, 51, 242, 1)'` | 颜色值，支持纯色（如 `rgba(...)`、`#hex`）和渐变色（如 `linear-gradient(...)`、`radial-gradient(...)`） |
| width | `Number` | `300` | 颜色选择器宽度（最小 320px，颜色面板高度等于宽度） |
| locale | `'en' \| 'zh'` | `'en'` | 语言设置，`'en'` 英文，`'zh'` 中文 |
| hideInputs | `Boolean` | `false` | 隐藏颜色值输入框 |
| hideOpacity | `Boolean` | `false` | 隐藏透明度设置滑块 |
| hideGradient | `Boolean` | `false` | 隐藏渐变色模式（仅使用纯色模式） |
| hidePresets | `Boolean` | `false` | 隐藏预设颜色 |
| presetColors | `String[]` | 内置 18 色 | 自定义预设颜色数组（最多 18 个） |
| showAdvancedSliders | `Boolean` | `false` | 显示高级滑块（饱和度、亮度、明度） |
| inputType | `'RGB' \| 'HSL' \| 'HSV' \| 'CMYK'` | `'RGB'` | 颜色输入模式 |

## Events 事件

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:value | `(value: string)` | 颜色值变化时触发，可用于 `v-model:value` |
| change | `(color: IColor)` | 颜色变化时触发，返回详细颜色信息对象 |

### IColor 类型定义

```typescript
interface IColor {
  mode?: 'solid' | 'gradient'     // 当前模式
  color?: string                    // 颜色值（纯色为颜色字符串，渐变为渐变CSS字符串）
  degrees?: number                  // 渐变角度（仅渐变模式）
  gradientType?: string             // 渐变类型：'linear' 或 'radial'
  gradientColors?: {                 // 渐变色点数组（仅渐变模式）
    color: string
    left?: number
  }[]
}
```

### change 事件回调示例

**纯色模式：**

```javascript
{
  mode: 'solid',
  color: 'rgba(175, 51, 242, 1)'
}
```

**渐变模式：**

```javascript
{
  mode: 'gradient',
  color: 'linear-gradient(90deg, rgba(245, 66, 245, 1) 0%, rgba(0, 0, 255, 1) 100%)',
  degrees: 90,
  gradientType: 'linear',
  gradientColors: [
    { color: 'rgba(245, 66, 245, 1)', left: 0 },
    { color: 'rgba(0, 0, 255, 1)', left: 100 }
  ]
}
```

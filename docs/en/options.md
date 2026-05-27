<!--
 * @Author: June
 * @Description: Options documentation (English)
 * @Date: 2024-12-21 12:52:42
 * @LastEditTime: 2024-12-21 14:17:53
 * @LastEditors: June
-->

# color-gradient-picker-vue3

This page introduces the usage, common configurations, and important notes for `color-gradient-picker-vue3`.

## Note

Due to UI design, the minimum width of `color-gradient-picker-vue3` is `320px` to ensure the preset colors display nicely. If `width` is set less than `320`, it will default to `320` on initialization.

## Installation

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

## Quick Start

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
  console.log(val, 'colorpicker callback')
}
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `String` | `'rgba(175, 51, 242, 1)'` | Color value. Supports solid colors (e.g. `rgba(...)`, `#hex`) and gradients (e.g. `linear-gradient(...)`, `radial-gradient(...)`) |
| width | `Number` | `300` | Picker width (min 320px, picker area height equals width) |
| locale | `'en' \| 'zh'` | `'en'` | Language setting. `'en'` for English, `'zh'` for Chinese |
| hideInputs | `Boolean` | `false` | Hide color value inputs |
| hideOpacity | `Boolean` | `false` | Hide opacity slider |
| hideGradient | `Boolean` | `false` | Hide gradient mode (solid color only) |
| hidePresets | `Boolean` | `false` | Hide preset colors |
| presetColors | `String[]` | 18 built-in colors | Custom preset color array (max 18) |
| showAdvancedSliders | `Boolean` | `false` | Show advanced sliders (saturation, lightness, brightness) |
| inputType | `'RGB' \| 'HSL' \| 'HSV' \| 'CMYK'` | `'RGB'` | Color input mode |

## Events

| Event | Parameters | Description |
| --- | --- | --- |
| update:value | `(value: string)` | Emitted when color changes, usable with `v-model:value` |
| change | `(color: IColor)` | Emitted when color changes, returns detailed color info object |

### IColor Type

```typescript
interface IColor {
  mode?: 'solid' | 'gradient'     // Current mode
  color?: string                    // Color value (solid: color string, gradient: CSS gradient string)
  degrees?: number                  // Gradient angle (gradient mode only)
  gradientType?: string             // Gradient type: 'linear' or 'radial'
  gradientColors?: {                 // Gradient color stops (gradient mode only)
    color: string
    left?: number
  }[]
}
```

### Change Event Examples

**Solid mode:**

```javascript
{
  mode: 'solid',
  color: 'rgba(175, 51, 242, 1)'
}
```

**Gradient mode:**

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

# Color Gradient Picker Vue3

一个现代化的Vue 3颜色和渐变选择器组件，支持TypeScript。

## 特性

- 🎨 支持纯色和渐变选择
- 📱 响应式设计，支持移动端
- 🔧 高度可定制
- 📦 TypeScript支持
- 🎯 零依赖（除了Vue 3）
- ⚡ 基于Vite构建，开发体验优秀

## 安装

```bash
npm install color-gradient-picker-vue3
# 或
yarn add color-gradient-picker-vue3
# 或
pnpm add color-gradient-picker-vue3
```

## 基本使用

```vue
<template>
  <div>
    <ColorPicker 
      v-model:value="color" 
      :width="300"
      @change="handleColorChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import type { IColor } from 'color-gradient-picker-vue3'

const color = ref('#ff0000')

const handleColorChange = (colorData: IColor) => {
  console.log('颜色变化:', colorData)
}
</script>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | 'rgba(175, 51, 242, 1)' | 当前颜色值 |
| width | number | 300 | 组件宽度 |
| hideInputs | boolean | false | 是否隐藏输入框 |
| hideOpacity | boolean | false | 是否隐藏透明度控制 |
| hideGradient | boolean | false | 是否隐藏渐变功能 |
| presetColors | string[] | 预设颜色数组 | 预设颜色 |
| hidePresets | boolean | false | 是否隐藏预设颜色 |
| showAdvancedSliders | boolean | false | 是否显示高级滑块控制 |
| inputType | InputType | 'RGB' | 输入框类型 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:value | string | 颜色值更新 |
| change | IColor | 颜色变化 |

### 类型定义

```typescript
interface IColor {
  mode?: 'solid' | 'gradient'
  color?: string
  angle?: number
  degrees?: number
  colors?: { color: string; offset: number }[]
  gradientType?: string
  gradientColors?: { color: string; left: number }[]
}

interface ColorPickerProps {
  width: number
  height?: number
  gradientColorsIdx?: number
  degrees?: number
  degreesStr?: string
  gradientColor?: string
  value?: string
  hideGradient?: boolean
  showAdvancedSliders?: boolean
  hideInputs?: boolean
  hideOpacity?: boolean
  hc?: IColorValue
  isGradient?: boolean
  inputType?: InputType
  onChange?: (color: IColor) => void
  mode?: IMode
  gradientColors?: GradientProps[]
  presetColors?: string[]
  hidePresets?: boolean
}
```

## 高级用法

### 渐变模式

```vue
<template>
  <ColorPicker 
    v-model:value="gradientColor" 
    :width="400"
    :hide-gradient="false"
    @change="handleGradientChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'

const gradientColor = ref('linear-gradient(90deg, #ff0000 0%, #00ff00 100%)')

const handleGradientChange = (colorData: IColor) => {
  console.log('渐变变化:', colorData)
}
</script>
```

### 自定义预设颜色

```vue
<template>
  <ColorPicker 
    v-model:value="color" 
    :preset-colors="customPresetColors"
    :hide-presets="false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'

const color = ref('#ff0000')
const customPresetColors = [
  '#ff0000',
  '#00ff00', 
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff'
]
</script>
```

### 隐藏特定功能

```vue
<template>
  <ColorPicker 
    v-model:value="color" 
    :hide-inputs="true"
    :hide-opacity="true"
    :hide-gradient="true"
    :show-advanced-sliders="true"
  />
</template>
```

## 工具函数

组件还提供了一些有用的工具函数：

```typescript
import { 
  createGradientStr,
  isValidColor,
  formatColor,
  getColorContrast,
  getColors,
  formatInputValues,
  round,
  clamp,
  percentToDecimal,
  decimalToPercent
} from 'color-gradient-picker-vue3'

// 验证颜色值
const isValid = isValidColor('#ff0000') // true

// 格式化颜色值
const formatted = formatColor('RGB(255, 0, 0)') // 'rgb(255, 0, 0)'

// 获取颜色对比度
const contrast = getColorContrast('#ffffff') // 1.0

// 限制数值范围
const clamped = clamp(150, 0, 100) // 100
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 代码格式化
npm run format

# 代码检查
npm run lint
```

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

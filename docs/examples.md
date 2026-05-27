---
outline: deep
---

# 使用例子

## 基础用法

```html
<template>
  <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
    <ColorPicker v-model:value="curColor" @change="onChange" />
    <div
      :style="{
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        background: curColor,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const curColor = ref('rgba(175, 51, 242, 1)')
const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>
```

## 多语言配置

支持中文 (`'zh'`) 和英文 (`'en'`)，默认英文。

```html
<template>
  <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
    <ColorPicker v-model:value="curColor" :locale="curLocale" @change="onChange" />
    <button @click="toggleLocale">切换语言</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import type { ILocales } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const curColor = ref('rgba(175, 51, 242, 1)')
const curLocale = ref<ILocales>('zh')
const toggleLocale = () => {
  curLocale.value = curLocale.value === 'en' ? 'zh' : 'en'
}
const onChange = (val: any) => {
  console.log(val, 'colorpicker 回调')
}
</script>
```

## 自定义预设颜色

传入 `presetColors` 数组自定义预设颜色（最多 18 个）。

```html
<template>
  <ColorPicker
    v-model:value="curColor"
    :preset-colors="customColors"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const curColor = ref('rgba(255, 0, 0, 1)')
const customColors = [
  'rgba(255, 0, 0, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(255, 255, 0, 1)',
  'rgba(255, 0, 255, 1)',
  'rgba(0, 255, 255, 1)',
]
</script>
```

## 隐藏部分功能

```html
<template>
  <!-- 仅纯色模式 -->
  <ColorPicker v-model:value="color" hide-gradient />

  <!-- 隐藏透明度 -->
  <ColorPicker v-model:value="color" hide-opacity />

  <!-- 隐藏输入框 -->
  <ColorPicker v-model:value="color" hide-inputs />

  <!-- 隐藏预设颜色 -->
  <ColorPicker v-model:value="color" hide-presets />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const color = ref('rgba(175, 51, 242, 1)')
</script>
```

## 初始渐变色

传入渐变 CSS 字符串即可初始化为渐变模式。

```html
<template>
  <ColorPicker v-model:value="gradientColor" @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const gradientColor = ref(
  'linear-gradient(90deg, rgba(245, 66, 245, 1) 0%, rgba(0, 0, 255, 1) 100%)'
)
const onChange = (val: any) => {
  console.log(val)
}
</script>
```

## 显示高级滑块

启用后显示饱和度、亮度、明度滑块。

```html
<template>
  <ColorPicker v-model:value="color" show-advanced-sliders />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const color = ref('rgba(175, 51, 242, 1)')
</script>
```

---
outline: deep
---

# Examples

## Basic Usage

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
  console.log(val, 'colorpicker callback')
}
</script>
```

## Locale

Supports Chinese (`'zh'`) and English (`'en'`). Default is English.

```html
<template>
  <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
    <ColorPicker v-model:value="curColor" :locale="curLocale" @change="onChange" />
    <button @click="toggleLocale">Toggle Language</button>
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
  console.log(val, 'colorpicker callback')
}
</script>
```

## Custom Preset Colors

Pass a `presetColors` array to customize preset colors (max 18).

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

## Hide Features

```html
<template>
  <!-- Solid mode only -->
  <ColorPicker v-model:value="color" hide-gradient />

  <!-- Hide opacity slider -->
  <ColorPicker v-model:value="color" hide-opacity />

  <!-- Hide inputs -->
  <ColorPicker v-model:value="color" hide-inputs />

  <!-- Hide preset colors -->
  <ColorPicker v-model:value="color" hide-presets />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPicker } from 'color-gradient-picker-vue3'
import 'color-gradient-picker-vue3/dist/style.css'

const color = ref('rgba(175, 51, 242, 1)')
</script>
```

## Initial Gradient

Pass a gradient CSS string to initialize in gradient mode.

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

## Advanced Sliders

Enable to show saturation, lightness, and brightness sliders.

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

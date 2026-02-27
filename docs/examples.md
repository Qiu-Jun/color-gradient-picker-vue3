---
outline: deep
---

# 例子

```HTML
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker v-model:value="curColor" @change="onChange" />
    </div>

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>
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

```HTML
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker v-model:value="curColor" :locale="curLocale" @change="onChange" />
    </div>

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>
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

const curLocale = ref<ILocales>('zh')
const changeLocale = () => {
  curLocale.value = curLocale.value === 'en' ? 'zh' : 'en'
}
</script>
```

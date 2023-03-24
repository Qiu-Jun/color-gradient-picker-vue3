<!--
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 22:02:02
 * @LastEditors: June
 * @LastEditTime: 2023-03-24 09:22:41
-->

## color-gradient-picker-vue3

Color and gradient picker for vue3.js. color-gradient-picker 的 vue3 版本

#### Usage

```bash
yarn add color-gradient-picker-vue3
# or npm install color-gradient-picker-vue3 or pnpm install color-gradient-picker-vue3
```

#### Demo

```html
<template>
    <div>
        <ColorPicker
            :is-gradient="true"
            :on-start-change="(color) => onChange(color, 'start')"
            :on-change="(color) => onChange(color, 'change')"
            :on-end-change="(color) => onChange(color, 'end')"
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { ColorPicker } from 'color-gradient-picker-vue3';
    import 'color-gradient-picker-vue3/dist/style.css';

    const color = ref({
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
    });

    const onChange = (attrs, name) => {
        color.value = { ...attrs };
    };
</script>
```

#### Todo

-   [] 处理 ts 问题

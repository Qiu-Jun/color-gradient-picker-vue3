<!--
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 22:02:02
 * @LastEditors: June
 * @LastEditTime: 2023-05-10 16:13:15
-->

# color-gradient-picker-vue3

[![npm](https://badgen.net/npm/v/color-gradient-picker-vue3)](https://www.npmjs.com/package/color-gradient-picker-vue3)
[![downloads](https://badgen.net/npm/dt/color-gradient-picker-vue3)](https://www.npmjs.com/package/color-gradient-picker-vue3)

Color and gradient picker for vue3.js. [If you use vue2， plese use color-gradient-picker](https://github.com/arthay/vue-color-gradient-picker).color-gradient-picker-vue3 is an upgraded version of `color-gradient-picker`

#### Usage

```bash
yarn add color-gradient-picker-vue3
# or npm install color-gradient-picker-vue3 or pnpm install color-gradient-picker-vue3
```

#### Demo

```html
<template>
    <!-- 纯色 -->
    <div>
        <ColorPicker
            :color="color"
            cancel-text="cancel"
            cancel-color="red"
            @on-change="onChange"
            @on-cancel="onCancel"
        />
    </div>

    <!-- 渐变 -->
    <div>
        <ColorPicker
            :is-gradient="true"
            @on-change="onChange"
            @on-cancel="onCancel"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import ColorPicker from 'color-gradient-picker-vue3';
import 'color-gradient-picker-vue3/dist/style.css';

const color = ref({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
});

const onCancel = () => {
    console.log('取消');
};

const onChange = (color) => {
    console.log(color);
};
</script>
```

#### 启动 lib

```bash
# 安装依赖
pnpm install

# 启动lib(根目录或者lib下)
pnpm dev

# 预览packages的子项目
# 根目录
pnpm predev
# 子项目下
pnpm dev
```

#### Todo

-   [x] 支持 monorepo

-   [ ] fix to typescript

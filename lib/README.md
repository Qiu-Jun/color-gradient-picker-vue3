<!--
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 22:02:02
 * @LastEditors: June
 * @LastEditTime: 2024-12-13 18:04:13
-->

## color-gradient-picker-vue3

Color and gradient picker for vue3.js. It supports `RBG`, `HSL`, `HSV`, `CMYK`.

#### Usage

```bash
yarn add color-gradient-picker-vue3
# or npm install color-gradient-picker-vue3 or pnpm install color-gradient-picker-vue3
```

#### 配置说明
+ hide-opacity 隐藏透明opacity
+ hide-inputs 隐藏输入input
+ hide-gradient 隐藏渐变

```html
<!-- beta -->
 <!-- 注意目前宽度需要340px, 后续会优化配置宽度 -->
<template>
  <div id="app" class="flex justify-start items-center">
    <ColorPicker v-model:value="curColor" @change="onChange" />

    <div
      class="w-50px h-50px rounded-10px"
      :style="{ background: curColor }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
  import { ColorPicker } from 'color-gradient-picker-vue3'
  import 'color-gradient-picker-vue3/dist/style.css'

  const curColor = ref('rgba(175, 51, 242, 1)')
  const onChange = (val: any) => {
    console.log(val, 'colorpicker 回调')
  }

  // 文档未完善
  // 返回值说明
  // {
  //     "color": "linear-gradient(90deg, rgba(245,66,245,1) 0%, RGBA(245,66,245,1) 40%, rgba(0,0,255,1) 100%)",  颜色字符串
  //     "mode": "gradient", 模式  gradient | solid
  //     "degrees": 90,  渐变角度  gradient时返回
  //     "gradientType": "linear", 渐变类型 gradient时返回
  //     "gradientColors": [ // 渐变颜色数组
  //         {
  //             "color": "rgba(245,66,245,1)",
  //             "left": 0
  //         },
  //         {
  //             "color": "rgba(245,66,245,1)",
  //             "left": 40
  //         },
  //         {
  //             "color": "rgba(0,0,255,1)",
  //             "left": 100
  //         }
  //     ]
  // }
</script>
```

#### 启动 lib

```bash
# 安装依赖
pnpm install

# 启动lib(根目录或者lib下)
pnpm dev
```

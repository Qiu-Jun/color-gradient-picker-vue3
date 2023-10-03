<!--
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 22:02:02
 * @LastEditors: June
 * @LastEditTime: 2023-10-04 04:33:08
-->

## color-gradient-picker-vue3

Color and gradient picker for vue3.js. [If you use vue2， plese use color-gradient-picker](https://github.com/arthay/vue-color-gradient-picker).color-gradient-picker-vue3 is an upgraded version of `color-gradient-picker`

#### Usage

```bash
yarn add color-gradient-picker-vue3
# or npm install color-gradient-picker-vue3 or pnpm install color-gradient-picker-vue3
```


#### Attributes
|    | introduct   |  Default | 
|   ----   |   ----     |   ----   | 
| isGradient | isGradient(是否渐变) | false |
|  color   |  solid color(纯色color)  | `{ red: 255, green: 0, blue: 0, alpha: 1 }` |
|  gradient  |  gradient color(渐变颜色) | `'{"type":"linear","degree":0,"points":[{"id":0,"left":0,"red":0,"green":0,"blue":0,"alpha":1},{"id":1,"left":100,"red":255,"green":0,"blue":0,"alpha":1}]}'` ｜
| cancelText | cancel button text(取消文本) | 'cancel' |
| cancelColor | cancel button font-color(取消文本颜色) | '#333' |
| cancelBg | cancel button background color (取消背景颜色) | '#fff' |
| confirmText | confirm button text(取消文本) | 'confirm' |
| confirmColor | confirm button font-color(确认文本颜色) | '#333' |
| confirmBg | confirm button background color (确认背景颜色) | '#fff' |
| change | Event |  |

#### Example
```html
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker
        :color="color"
        cancel-text="cancel"
        cancel-color="red"
        @change="onChange"
      />
    </div>
    <div>
      <ColorPicker :is-gradient="true" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ColorPicker from 'color-gradient-picker-vue3';
import 'color-gradient-picker-vue3/dist/style.css';

const color = ref({
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1,
});

const onChange = (color) => {
  // The results of solid and gradient are different 
//   color like: 
// {
//     "style": "rgba(142, 59, 59, 1)",
//     "color": {
//         "red": 142,
//         "green": 59,
//         "blue": 59,
//         "hue": 0,
//         "alpha": 1
//     }
// }

  // gradient like:
//   {
//     "style": "linear-gradient(0deg,rgba(0, 0, 0, 1) 0%,rgba(0, 255, 63, 1) 37.096774193548384%,rgba(255, 0, 0, 1) 100%)",
//     "gradient": {
//         "type": "linear",
//         "degree": 0,
//         "points": [
//             {
//                 "id": "cf3647eb-6b59-4a34-90dc-bfd7f5383582",
//                 "left": 0,
//                 "red": 0,
//                 "green": 0,
//                 "blue": 0,
//                 "alpha": 1
//             },
//             {
//                 "id": "bf44fa8b-d7ea-4f8e-a154-1be6aa88c3bc",
//                 "left": 100,
//                 "red": 255,
//                 "green": 0,
//                 "blue": 0,
//                 "alpha": 1
//             },
//             {
//                 "id": "2974991d-1dac-40e6-a5c7-fc3a0761189b",
//                 "red": 0,
//                 "green": 255,
//                 "blue": 63,
//                 "alpha": 1,
//                 "left": 37.096774193548384
//             }
//         ]
//     }
// }
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
````
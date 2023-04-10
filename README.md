<!--
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-17 22:02:02
 * @LastEditors: June
 * @LastEditTime: 2023-04-08 22:32:02
-->

## color-gradient-picker-vue3

Color and gradient picker for vue3.js. [If you use vue2， plese use color-gradient-picker](https://github.com/arthay/vue-color-gradient-picker).color-gradient-picker-vue3 is an upgraded version of `color-gradient-picker`

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
    import ColorPicker from './lib/index';

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

#### ts Demo

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

<script lang="ts" setup>
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import ColorPicker from './lib/index';

    interface IPoitItem {
        alpha?: number | string;
        blue?: number | string;
        green?: number | string;
        left?: number | string;
        red?: number | string;
    }

    interface Iattrs {
        degree: number;
        points: [IPoitItem];
        style: string;
        type: string;
    }

    const color: Ref<IPoitItem | Iattrs> = ref({
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
    });

    const onChange = (attrs: Iattrs, name: string) => {
        color.value = { ...attrs };
    };
</script>
```

#### Todo

-   [ ] fix to typescript

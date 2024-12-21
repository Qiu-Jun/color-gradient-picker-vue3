<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-21 12:52:42
 * @LastEditTime: 2024-12-22 00:23:32
 * @LastEditors: June
-->

# color-gradient-picker-vue3

这里主要介绍`color-gradient-picker-vue3`的使用以及一些常用配置,以及主要注意事项

## 注意

由于 ui 设计问题，`color-gradient-picker-vue3`的宽度最小为`320px`, 主要为了保证底部预设色的美观, 如果设置的`width`小于`320`, 那么初始化时会默认为`320`

## 使用

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

## 配置说明

| 参数         | 类型     | 默认值                | 描述                                     |
| ------------ | -------- | --------------------- | ---------------------------------------- |
| value        | String   | rgba(175, 51, 242, 1) | 默认颜色                                 |
| width        | Number   | 320                   | 宽度(注意，颜色选择区域的高度会等于宽度) |
| hideInputs   | Boolean  | false                 | 隐藏输入                                 |
| hideOpacity  | Boolean  | false                 | 隐藏透明度设置滑块                       |
| hideGradient | Boolean  | false                 | 隐藏渐变                                 |
| presetColors | String[] | String[]              | 预设颜色                                 |

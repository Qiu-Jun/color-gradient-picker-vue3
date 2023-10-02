<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 12:54:30
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 01:24:07
-->
<template>
  <div
    class="picker-color-ui w-280px m-8px bg-[#fff] flex flex-col slelect-none"
  >
    <!-- 渐变 -->
    <Gradient v-if="props.isGradient" />

    <!-- 纯色 -->
    <Solid v-else />
  </div>
</template>

<script name="ColorPicker" lang="ts" setup>
import Solid from './components/Solid/index.vue';
import Gradient from './components/Gradient/index.vue';
import { cloneDeep } from 'lodash-es';
import { generateSolidStyle } from '@l/helpers';
import type {
  IColor,
  IGradient,
  IPoitItem,
  Iattrs,
  IColorState,
} from '@l/types';
import { cp } from 'fs';

type IProps = IColorState;

const defaultColor: IColor = {
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1,
};

const defaultGradient: IGradient = {
  type: 'linear',
  degree: 0,
  points: [
    {
      left: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    {
      left: 100,
      red: 255,
      green: 0,
      blue: 0,
      alpha: 1,
    },
  ],
};

const props: IColorState = defineProps({
  isGradient: {
    type: Boolean,
    default: false,
  },
  red: {
    type: Number,
    default: 255,
  },
  green: {
    type: Number,
    default: 0,
  },
  blue: {
    type: Number,
    default: 0,
  },
  alpha: {
    type: Number,
    default: 1,
  },
});

const color = ref(
  props.color
    ? Object.assign(cloneDeep(defaultColor), props.color)
    : cloneDeep(defaultColor),
);
const gradient = ref(
  props.gradient
    ? Object.assign(cloneDeep(defaultGradient), props.gradient)
    : cloneDeep(defaultGradient),
);

const colorPickerState = reactive<IColorState>({
  isGradient: props.isGradient, // 是否是渐变
  red: props.isGradient ? gradient.value?.points[0].red : color.value?.red,
  green: props.isGradient
    ? gradient.value?.points[0].green
    : color.value?.green,
  blue: props.isGradient ? gradient.value?.points[0].blue : color.value?.blue,
  alpha: props.isGradient
    ? gradient.value?.points[0].alpha
    : color.value?.alpha,
  hue: 0,
  saturation: 100,
  value: 100,
  style: '',
  // color: unref(color),
  // gradient: unref(gradient),
});
console.log(colorPickerState);

const updateColor = (
  { red, green, blue, alpha, hue, saturation, value }: IColor,
  key: string,
): void => {
  const params: IColor = {
    red,
    green,
    blue,
    alpha,
    hue,
    saturation,
    value,
  };
  props.isGradient ? updateGradient(params, key) : updateSolid(params, key);
};
// const color = ref<IPoitItem | Iattrs | null>();
// color.value = props.isGradient ? { ...props.gradient } : { ...props.color };

provide('colorPickerState', colorPickerState);
provide('updateColor', updateColor);
function updateGradient(color: IColor, key?: string) {
  if (key) {
    colorPickerState[key] = color[key];
  } else {
    const { red, green, blue, alpha, hue, saturation, value } = color;
    red && colorPickerState.red;
    green && colorPickerState.green;
    blue && colorPickerState.blue;
    alpha && colorPickerState.alpha;
    saturation && (colorPickerState.saturation = saturation);
    value && (colorPickerState.value = value);
    hue && (colorPickerState.hue = hue);
  }
}

function updateSolid(color: IColor, key?: string) {
  if (key) {
    colorPickerState[key] = color[key];
  } else {
    const {
      red = 0,
      green = 0,
      blue = 0,
      alpha,
      hue,
      saturation,
      value,
    } = color;
    colorPickerState.red = red;
    colorPickerState.green = green;
    colorPickerState.blue = blue;
    alpha && (colorPickerState.alpha = alpha);
    saturation && (colorPickerState.saturation = saturation);
    value && (colorPickerState.value = value);
    hue && (colorPickerState.hue = hue);
    colorPickerState.style = generateSolidStyle(red, green, blue, alpha);
  }
}
</script>

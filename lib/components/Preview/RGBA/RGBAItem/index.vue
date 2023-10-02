<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 21:58:47
 * @LastEditors: June
 * @LastEditTime: 2023-10-02 14:34:54
-->
<template>
  <div>
    <CInput
      :value="RGBValue"
      :label="props.label"
      :type="props.type"
      :classes="props.label !== 'A' ? 'mr-8px' : ''"
      @input="onInput"
    />
  </div>
</template>

<script name="PreviewRGBItem" lang="ts" setup>
import CInput from '@c/CInput/index.vue';
import { hexToRgb, rgbToHex } from '@l/helpers/index';
import type { IColorState } from '@l/types';

interface Iprops {
  type: string;
  label: string;
}
const colorPickerState = inject('colorPickerState') as IColorState;
const updateColor = inject('updateColor') as any;
const props = withDefaults(defineProps<Iprops>(), {
  type: 'text',
  label: '',
});

const RGBValue = computed(() => {
  let value: number | undefined = 0;
  switch (props.label) {
    case 'R':
      value = colorPickerState.red;
      break;
    case 'G':
      value = colorPickerState.green;
      break;
    case 'B':
      value = colorPickerState.blue;
      break;
    case 'A':
      value = ~~(colorPickerState.alpha * 100);
      break;
    default:
      break;
  }
  return value;
});

const onInput = (event) => {
  let value = +event.target.value;
  console.log(value < 0);
  if (value <= 0) {
    value = 0;
  } else if (value > 255) {
    value = 255;
  } else if (props.label === 'A' && value > 100) {
    value = 100;
  }

  switch (props.label) {
    case 'R':
      colorPickerState.red = value;
      break;
    case 'G':
      colorPickerState.green = value;
      break;
    case 'B':
      colorPickerState.blue = value;
    case 'A':
      colorPickerState.alpha = value / 100;
      break;
    default:
      break;
  }

  nextTick(() => {
    const _hex = rgbToHex(
      colorPickerState.red,
      colorPickerState.green,
      colorPickerState.blue,
    );
    const _rgb = hexToRgb(_hex);
    if (props.label === 'A') {
      // @ts-ignore
      _rgb.alpha = updateColor(_rgb);
    } else {
      updateColor(_rgb);
    }
  });
};
</script>

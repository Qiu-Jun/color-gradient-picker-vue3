<!--
 * @Author: June
 * @Description: Area Preview
 * @Date: 2023-09-27 19:28:31
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 12:22:32
-->
<template>
  <div class="preview-area mr-8px">
    <div
      class="border-box w-36px h-36px rounded-8px border-width-1px border-solid border-[#ebedf5]"
      :style="style"
    />
  </div>
</template>

<script name="AreaPreview" lang="ts" setup>
import { generateSolidStyle, generateGradientStyle } from '@l/helpers/index';
import type { IColorState } from '@l/types';

const colorPickerState = inject('colorPickerState') as IColorState;
const style = computed(() => {
  let _style = '';
  if (colorPickerState.isGradient) {
    _style = generateGradientStyle(
      colorPickerState.points!,
      colorPickerState.type!,
      colorPickerState.degree!,
    );
  } else {
    _style = generateSolidStyle(
      colorPickerState.red,
      colorPickerState.green,
      colorPickerState.blue,
      colorPickerState.alpha,
    );
  }

  return { background: _style };
});
</script>

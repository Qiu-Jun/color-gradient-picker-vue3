<!--
 * @Author: June
 * @Description: Area
 * @Date: 2023-09-27 14:20:12
 * @LastEditors: June
 * @LastEditTime: 2023-10-02 19:11:22
-->
<template>
  <div class="flex flex-col px-16px">
    <Picker />

    <GradientPoints v-if="colorPickerState.isGradient" />

    <div class="flex pb-16px">
      <Preview />

      <div class="flex flex-col flex-1">
        <Hue />

        <Alpha />
      </div>
    </div>
  </div>
</template>

<script name="Area" lang="ts" setup>
import Picker from './Picker/index.vue';
import Preview from './Preview/index.vue';
import Hue from './Hue/index.vue';
import Alpha from './Alpha/index.vue';
import GradientPoints from './GradientPoints/index.vue';
import type { IColorState } from '@l/types';

const colorPickerState = inject('colorPickerState') as IColorState;
</script>

<style></style>

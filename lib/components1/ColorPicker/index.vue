<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-18 00:57:49
 * @LastEditors: June
 * @LastEditTime: 2023-09-29 21:28:48
-->
<template>
  <div class="ui-color-picker">
    <!-- 渐变picker -->
    <Gradient
      v-if="props.isGradient"
      :points="props.gradient.points"
      :type="props.gradient.type"
      :degree="props.gradient.degree"
    />

    <!-- 非渐变Picker -->
    <Solid
      v-else
      :red="props.color.red"
      :green="props.color.green"
      :blue="props.color.blue"
      :alpha="props.color.alpha"
      :hue="props.color.hue"
      :saturation="props.color.saturation"
      :value="props.color.value"
    />

    <div class="btns">
      <div
        class="btn"
        :style="{
          color: props.cancelColor,
          backgroundColor: props.cancelBg,
        }"
        @click="handleCancel"
      >
        {{ props.cancelText }}
      </div>
      <div
        class="btn"
        :style="{
          color: props.confirmColor,
          backgroundColor: props.confirmBg,
        }"
        @click="handleConfirm"
      >
        {{ props.confirmText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="ColorPicker" setup>
import Solid from './Solid/index.vue';
import Gradient from './Gradient/index.vue';
import type { IPoitItem, Iattrs } from '@l/types';

interface Iprops {
  isGradient?: boolean;
  color?: any;
  gradient?: {
    type: string;
    degree: number;
    points: [
      {
        left: number;
        red: number;
        green: number;
        blue: number;
        alpha: number;
      },
      {
        left: number;
        red: number;
        green: number;
        blue: number;
        alpha: number;
      },
    ];
  };
  cancelText?: string;
  cancelColor?: string;
  cancelBg?: string;
  confirmText?: string;
  confirmColor?: string;
  confirmBg?: string;
}

const emits = defineEmits(['onChange', 'onCancel']);
const props = withDefaults(defineProps<Iprops>(), {
  isGradient: false,
  color: () => ({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
    hue: 0,
    saturation: 100,
    value: 100,
  }),
  gradient: () => ({
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
  }),
  cancelText: '取消',
  cancelTextColor: '#333',
  cancelTextBg: '#fff',
  confirmText: '确认',
  confirmTextColor: '#333',
  confirmTextBg: '#fff',
});

const color: Ref<IPoitItem | Iattrs | undefined> = ref();
color.value = props.isGradient ? { ...props.gradient } : { ...props.color };

provide('provideData', {
  onChange: (attrs: Iattrs) => {
    color.value = { ...attrs };
  },
  onStartChange: (attrs: Iattrs) => {
    color.value = { ...attrs };
  },
  onEndChange: (attrs: Iattrs) => {
    color.value = { ...attrs };
  },
});

const handleCancel = () => {
  emits('onCancel');
};

const handleConfirm = () => {
  emits('onChange', { ...color.value });
};
</script>

<style></style>

<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-10-03 16:16:52
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 22:42:58
-->
<template>
  <div
    class="gradient-controls border-box flex justify-between items-center w-full mb-8px px-16px"
  >
    <div class="flex flex-1">
      <div
        :class="`gradient-type-item liner-gradient ${
          type === 'linear' ? 'active' : ''
        }`"
        @click="handleType('linear')"
      />
      <div
        :class="`gradient-type-item radial-gradient ${
          type === 'radial' ? 'active' : ''
        }`"
        @click="handleType('radial')"
      />
    </div>

    <div v-if="type === 'linear'" class="relative mr-24px">
      <div
        class="gradient-degrees cursor-pointer flex justify-center items-center"
        @mousedown="mouseEvents"
        @click="onClickGradientDegree"
      >
        <div class="gradient-degree-center" :style="degreesStyle">
          <div class="gradient-degree-pointer" />
        </div>
      </div>
      <div class="gradient-degree-value flex justify-center items-center">
        <p>{{ degree }}&#176;</p>
      </div>
    </div>
  </div>
</template>

<script name="GradientControls" lang="ts" setup>
import { useMouseEvents } from '@l/hooks/index';
import { calculateDegree } from '@l/helpers/index';
import type { IColorState } from '@l/types';

const colorPickerState = inject('colorPickerState') as IColorState;
const updateColor = inject('updateColor') as any;
const type = computed(() => colorPickerState.type);
const degree = computed(() => colorPickerState.degree);

// 改变类型
const handleType = (type: string) => {
  updateColor({ type }, 'type');
};

const disableClick = ref<boolean>(true);
const onClickGradientDegree = () => {
  if (disableClick.value) {
    disableClick.value = false;
    return;
  }

  let gradientDegree = (colorPickerState.degree || 0) + 45;

  if (gradientDegree >= 360) {
    gradientDegree = 0;
  }

  updateColor({ degree: ~~gradientDegree }, 'degree');
};

const degreesStyle = computed(() => {
  return { transform: `rotate(${colorPickerState.degree}deg)` };
});

const mouseDownHandler = (event) => {
  const pointer = event.target;
  const pointerBox = pointer.getBoundingClientRect();
  const centerY = ~~(8 - window.pageYOffset) + pointerBox.top;
  const centerX = ~~(8 - window.pageXOffset) + pointerBox.left;

  return {
    centerY,
    centerX,
  };
};
const mouseMoveHandler = (event, { centerX, centerY }) => {
  disableClick.value = true;

  const newDegree = calculateDegree(
    event.clientX,
    event.clientY,
    centerX,
    centerY,
  );

  updateColor({ degree: ~~newDegree }, 'degree');
};

const mouseUpHandler = (event) => {
  const targetClasses = event.target.classList;
  disableClick.value = false;
  if (
    targetClasses.contains('gradient-degrees') ||
    targetClasses.contains('icon-rotate')
  ) {
    return;
  }
};

const mouseEvents = useMouseEvents(
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler,
);
</script>

<style lang="scss" scoped>
.gradient-controls {
  height: 24px;

  .gradient-type-item {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;

    &.active {
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: -3px;
        bottom: -3px;
        left: -3px;
        right: -3px;
        border: 2px solid #1f2667;
        border-radius: 50%;
      }
    }

    &.liner-gradient {
      background: linear-gradient(270deg, #ffffff 0%, #1f2667 100%);
    }

    &.radial-gradient {
      margin-left: 8px;
      background: radial-gradient(circle, #ffffff 0%, #1f2667 100%);
    }
  }

  .gradient-degrees {
    position: relative;
    width: 28px;
    height: 28px;
    border: 3px solid #1f2667;
    border-radius: 18px;
    margin-right: 54px;

    .gradient-degree-center {
      position: relative;
      width: 6px;
      height: 22px;
      pointer-events: none;

      .gradient-degree-pointer {
        position: absolute;
        width: 6px;
        height: 6px;
        top: 2px;
        border-radius: 3px;
        background: #1f2667;
      }
    }
  }

  .gradient-degree-value {
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 28px;
    border: 1px solid #bbbfc5;
    border-radius: 6px;

    p {
      text-align: center;
      padding: 0 6px;
    }
  }
}
</style>

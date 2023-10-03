<!--
 * @Author: June
 * @Description: Area Alapha
 * @Date: 2023-09-27 19:22:18
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 23:45:34
-->
<template>
  <div
    class="relative w-full overflow-hidden rounded-10px h-14px cursor-pointer"
    @mousedown="mouseEvents"
  >
    <div class="absolute left-0 right-0 top-0 bottom-0" :style="style" />
    <div class="alpha-area wh-full rounded-10px">
      <div ref="alphaMaskRef" class="wh-full relative">
        <div class="picker-pointer" :style="pointerStyle" />
      </div>
    </div>
  </div>
</template>

<script name="AreaAlpha" lang="ts" setup>
import { getAlpha } from '@l/helpers/index';
import { IColorState } from '@l/types';
import { useMouseEvents } from '@l/hooks/index';

const colorPickerState = inject('colorPickerState') as IColorState;
const updateColor = inject('updateColor') as any;
const alphaMaskRef = ref<HTMLElement | null>(null);
const alphaMaskBoxInfo = ref<DOMRect | null>(null);

const offsetLeft = computed(() => {
  const width = alphaMaskBoxInfo.value?.width || 0;
  return (colorPickerState.alpha * (width - 14)) | 0;
});
const style = computed(() => {
  return {
    background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${colorPickerState.red}, ${colorPickerState.green}, ${colorPickerState.blue}))`,
  };
});
const pointerStyle = computed(() => {
  return { left: `${offsetLeft.value}px` };
});

const mouseDownHandler = (event) => {
  const elementX = alphaMaskBoxInfo.value?.x || 0;
  const startX = event.pageX;
  const width = alphaMaskBoxInfo.value?.width || 0;
  let positionX = startX - elementX;

  updateColor({ alpha: getAlpha(positionX, width) }, 'alpha');
  return {
    startX,
    positionX,
  };
};
const changeObjectPositions = (event, { startX, positionX }) => {
  const moveX = event.pageX - startX;
  const width = alphaMaskBoxInfo.value?.width || 0;
  positionX += moveX;

  const alpha = getAlpha(positionX, width);

  return {
    positions: {
      positionX,
      startX: event.pageX,
    },
    alpha,
  };
};
const mouseMoveHandler = (event, { startX, positionX }) => {
  const { positions, alpha } = changeObjectPositions(event, {
    startX,
    positionX,
  });

  updateColor({ alpha }, 'alpha');

  return positions;
};

const mouseUpHandler = (event, { startX, positionX }) => {
  const { positions, alpha } = changeObjectPositions(event, {
    startX,
    positionX,
  });

  updateColor({ alpha }, 'alpha');

  return positions;
};

const mouseEvents = useMouseEvents(
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler,
);

watchEffect(() => {
  if (alphaMaskRef.value && !alphaMaskBoxInfo.value?.width) {
    alphaMaskBoxInfo.value =
      alphaMaskRef.value?.getBoundingClientRect() || null;
  }
});
</script>

<style lang="scss" scoped>
.alpha-area {
  background: url('@l/assets/images/alpha-background.svg');
  background-size: auto;
  background-position: 50% 50%;
}
</style>

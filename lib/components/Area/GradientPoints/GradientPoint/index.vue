<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-28 10:50:02
 * @LastEditors: June
 * @LastEditTime: 2023-10-02 14:40:23
-->
<template>
  <div
    :class="`picker-pointer${activeClassName}`"
    :style="pointStyle"
    @mousedown="state.mouseEvents"
    @dblclick="() => props.removePoint(index)"
    @click.stop
  >
    <span :class="`child-point${activeClassName}`" />
  </div>
</template>

<script name="AreaGradientPoint" lang="ts" setup>
const props = defineProps({
  activePointIndex: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const activeClassName = computed(() =>
  props.activePointIndex === props.index ? ' active' : '',
);

const pointStyle = '';
</script>

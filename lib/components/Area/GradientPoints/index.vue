<!--
 * @Author: June
 * @Description: Area GradientPoints
 * @Date: 2023-09-27 19:26:27
 * @LastEditors: June
 * @LastEditTime: 2023-09-28 11:14:48
-->
<template>
  <div
    class="gradient w-full h-14px relative cursor-pointer rounded-10px mb-8px px-7px"
    :style="pointsStyle"
    @click="pointsContainerClick"
  >
    <div ref="pointsContainerRef" class="wh-full relative">
      <GradientPoint
        v-for="(point, index) in 2"
        :key="index"
        :index="index"
        :point="point"
      />
    </div>
  </div>
</template>

<script name="AreaGradientPoints" lang="ts" setup>
import GradientPoint from './GradientPoint/index';
const pointsStyle = computed(() => '');
</script>

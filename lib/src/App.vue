<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-10-06 19:53:07
-->
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker :color="color" show-btn @change="onChange" />
    </div>
    <div>
      <ColorPicker is-gradient :color="gradientColort" @change="onChange" />
    </div>

    <div :style="testStyle" style="width: 300px; height: 300px"></div>
  </div>
</template>

<script lang="ts" setup>
import ColorPicker from '../components/ColorPicker/index.vue'
import '../index.scss'
const color = {
  red: 0,
  green: 8,
  blue: 255,
  alpha: 1,
}

const gradientColort = {
  type: 'linear',
  degree: 0,
  points: [
    {
      id: '81bcb3a0-00b9-4a26-bfc7-2b261722de02',
      left: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },

    {
      id: 'a5d144fb-9ab5-40b3-9beb-e79161c5f546',
      red: 0,
      green: 153,
      blue: 255,
      alpha: 1,
      left: 32.25806451612903,
    },
    {
      id: 'b1bc25ad-7273-4bd8-ad22-d5d11cab0f55',
      red: 0,
      green: 153,
      blue: 255,
      alpha: 1,
      left: 68.95161290322581,
    },
    {
      id: 'd6c7ccb8-b1c4-4470-8b73-ee0b56739421',
      left: 97.1774193548387,
      red: 255,
      green: 0,
      blue: 63,
      alpha: 1,
    },
  ],
}

const testStyle = ref('')

const onChange = (e) => {
  testStyle.value = `background: ${e.style}`
  console.log(e)
}
</script>

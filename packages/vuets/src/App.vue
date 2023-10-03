<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-10-03 23:30:50
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 23:32:04
-->
<template>
  <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
    <div>
      <ColorPicker
        :color="color"
        cancel-text="cancel"
        cancel-color="red"
        @change="onChange"
      />
    </div>
    <div>
      <ColorPicker :is-gradient="true" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ColorPicker from 'color-gradient-picker-vue3';
import 'color-gradient-picker-vue3/dist/style.css';

const color = ref({
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1,
});

const onChange = (color) => {
  console.log(color);
};
</script>

<!--
 * @Author: June
 * @Description: Preview
 * @Date: 2023-09-27 14:20:32
 * @LastEditors: June
 * @LastEditTime: 2023-10-01 22:41:19
-->
<template>
  <div class="color-preview-area mb-8px px-16px">
    <div class="w-full flex justify-between">
      <Hex />

      <RGBA />
    </div>
  </div>
</template>

<script name="Preview" lang="ts" setup>
import Hex from './Hex/index.vue'
import RGBA from './RGBA/index.vue'
</script>

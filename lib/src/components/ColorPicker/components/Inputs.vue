<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 11:00:38
 * @LastEditTime: 2024-12-03 20:29:04
 * @LastEditors: June
-->
<template>
  <div class="cpg-inputs-wrap" :style="{ width: `${context.width}px` }">
    <InputItem width="22%" label="HEX" />
    <InputItem width="18%" label="R" />
    <InputItem width="18%" label="G" />
    <InputItem width="18%" label="B" />
    <InputItem width="18%" label="A" />
  </div>
</template>

<script lang="ts" setup>
import InputItem from './InputItem.vue'
import type { IProvide } from '@/interfaces'

const context = inject('context') as IProvide
</script>

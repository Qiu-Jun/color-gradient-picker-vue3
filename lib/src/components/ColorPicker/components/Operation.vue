<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 10:28:59
 * @LastEditTime: 2024-12-03 20:22:19
 * @LastEditors: June
-->
<template>
  <section class="cpg-controls-wrapper">
    <div class="cpg-controls-item">
      <div class="cpg-controls-item-btn" role="button">Solid</div>
      <div class="cpg-controls-item-btn cpg-control-active" role="button">
        Gradient
      </div>
    </div>
    <div class="cpg-controls-item">
      <div class="cpg-controls-item-btn" role="button">
        <SvgIcon ext-class="text-14px " icon="regulate" />
      </div>
      <div class="cpg-controls-item-btn" role="button">
        <SvgIcon ext-class="text-14px " icon="guide" />
      </div>
      <div class="cpg-controls-item-btn cpg-control-active" role="button">
        <SvgIcon ext-class="text-14px text-#568cf5" icon="toggle" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon'
</script>

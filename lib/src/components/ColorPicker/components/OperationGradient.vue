<template>
  <section class="cpg-gradient-controls-wrapper">
    <div class="flex justify-start items-center">
      <div class="cpg-gradient-btn cpg-gradient-btn-active">
        <SvgIcon ext-class="text-14px " icon="linear" />
      </div>
      <div class="cpg-gradient-btn">
        <SvgIcon ext-class="text-14px " icon="radial" />
      </div>
    </div>
    <div class="flex justify-end items-center">
      <div class="cpg-gradient-btn">
        <SvgIcon ext-class="text-14px " icon="deg" />
        <input class="cpg-deg-input" value="22" />
      </div>
      <div class="cpg-gradient-btn">
        <span class="text-12px">STOP</span>
        <input class="cpg-deg-input" value="22" />
      </div>
      <div class="cpg-gradient-btn">
        <SvgIcon ext-class="text-14px " icon="delete" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon'
</script>

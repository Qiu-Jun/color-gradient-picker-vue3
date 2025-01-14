<template>
  <section class="cpg-gradient-controls-wrapper">
    <div class="flex justify-start items-center">
      <div
        class="cpg-gradient-btn"
        :class="{
          'cpg-gradient-btn-active': gradientType === GradientType.linear,
        }"
        @click="handleChangeType(GradientType.linear)"
      >
        <i class="text-14px iconfont cpg-linear"></i>
      </div>
      <div
        class="cpg-gradient-btn"
        :class="{
          'cpg-gradient-btn-active': gradientType === GradientType.radial,
        }"
        @click="handleChangeType(GradientType.radial)"
      >
        <i class="text-14px iconfont cpg-radial"></i>
      </div>
    </div>
    <div class="flex justify-end items-center">
      <div
        v-if="gradientType === GradientType.linear"
        class="cpg-gradient-btn relative"
      >
        <i class="text-14px iconfont cpg-deg"></i>
        <input
          class="cpg-deg-input text-right"
          :value="colorState.degrees"
          @change="onSetDegrees"
        />

        <div class="absolute top-4px right-0 font-400 text-12px">°</div>
      </div>
      <!-- <div class="cpg-gradient-btn">
        <span class="text-12px">STOP</span>
        <input class="cpg-deg-input" value="22" />
      </div> -->
      <div class="cpg-gradient-btn" @click="handleDeletePoint">
        <i
          class="text-14px iconfont cpg-delete"
          :class="{ 'text-#ccc cursor-not-allowed': disabledDelete }"
        ></i>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { GradientType } from '@/enums'
import { debounce } from 'lodash-es'
import { createGradientStr } from '@/utils/color'

const {
  colorState,
  gradientType,
  setLinear,
  setRadial,
  setDegrees,
  setValue,
  deletePoint,
} = inject('colorProvider') as any
const disabledDelete = computed(
  () => !colorState.gradientColors || colorState.gradientColors.length <= 2,
)
// 渐变类型
const handleChangeType = debounce(function (type: GradientType) {
  if (type === unref(gradientType)) return
  type === GradientType.linear && setLinear()
  type === GradientType.radial && setRadial()
  colorState.gradientColors &&
    setValue(createGradientStr(colorState.gradientColors, unref(gradientType), colorState))
}, 250)

// 角度设置
const onSetDegrees = (e) => {
  const val = e.target.value
  setDegrees(val)
}

// 位置设置

// 删除点
const handleDeletePoint = debounce(function () {
  if (unref(disabledDelete)) return
  deletePoint()
}, 250)
</script>

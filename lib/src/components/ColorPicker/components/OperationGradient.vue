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
import { DEBOUNCE_DELAY } from '@/constants'
import { COLOR_PROVIDER_KEY } from '@/interfaces'

const {
  colorState,
  gradientType,
  setLinear,
  setRadial,
  setDegrees,
  deletePoint,
} = inject(COLOR_PROVIDER_KEY)!
const disabledDelete = computed(
  () => !colorState.gradientColors || colorState.gradientColors.length <= 2,
)

// 渐变类型
const handleChangeType = debounce(function (type: GradientType) {
  if (type === unref(gradientType)) return
  type === GradientType.linear && setLinear()
  type === GradientType.radial && setRadial()
}, DEBOUNCE_DELAY)

// 角度设置
const onSetDegrees = (e: Event) => {
  const target = e.target as HTMLInputElement
  const val = parseFloat(target.value)
  if (isNaN(val)) return
  setDegrees(val)
}

const handleDeletePoint = debounce(function () {
  if (unref(disabledDelete)) return
  deletePoint()
}, DEBOUNCE_DELAY)
</script>

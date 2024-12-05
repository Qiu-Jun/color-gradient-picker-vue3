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
        <SvgIcon ext-class="text-14px " icon="linear" />
      </div>
      <div
        class="cpg-gradient-btn"
        :class="{
          'cpg-gradient-btn-active': gradientType === GradientType.radial,
        }"
        @click="handleChangeType(GradientType.radial)"
      >
        <SvgIcon ext-class="text-14px " icon="radial" />
      </div>
    </div>
    <div class="flex justify-end items-center">
      <div
        v-if="gradientType === GradientType.linear"
        class="cpg-gradient-btn relative"
      >
        <SvgIcon ext-class="text-14px " icon="deg" />
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
        <SvgIcon
          :ext-class="
            disabledDelete
              ? 'text-14px text-#ccc cursor-not-allowed'
              : 'text-14px'
          "
          icon="delete"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon'
import { GradientType } from '@/enums'
import { debounce } from 'lodash-es'
import { useColor } from '@/hooks/useColor'
import { getColors } from '@/utils/format'

const { colorState, gradientType, setLinear, setRadial, setDegrees } =
  useColor()
const colors = computed(() => getColors(colorState.value!))
const disabledDelete = computed(() => !colors || colors.value.length <= 2)
// 渐变类型
// const gradientType = ref<GradientType>(GradientType.linear)
const handleChangeType = debounce(function (type: GradientType) {
  if (type === unref(gradientType)) return
  type === GradientType.linear && setLinear()
  type === GradientType.radial && setRadial()
}, 250)

// 角度设置
const onSetDegrees = (e) => {
  const val = e.target.value
  console.log(val)
  setDegrees(val)
}

// 位置设置

// 删除点
const handleDeletePoint = debounce(function () {
  if (unref(disabledDelete)) return
  console.log('删除')
}, 250)
</script>

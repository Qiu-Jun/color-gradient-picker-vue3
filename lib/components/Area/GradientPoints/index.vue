<!--
 * @Author: June
 * @Description: Area GradientPoints
 * @Date: 2023-09-27 19:26:27
 * @LastEditors: June
 * @LastEditTime: 2023-10-06 00:58:57
-->
<template>
  <div
    class="gradient border-box w-full h-14px relative cursor-pointer rounded-10px mb-8px"
    :style="pointsStyle"
    @click="handleAddPoit"
  >
    <div ref="pointsContainerRef" class="wh-full relative">
      <GradientPoint
        v-for="(point, index) in colorPickerState.points"
        :key="point.id"
        :index="index"
        :point="point"
        :positions="pointsContainerBoxInfo"
        :width="pointsContainerBoxInfo?.width"
      />
    </div>
  </div>
</template>

<script name="AreaGradientPoints" lang="ts" setup>
import GradientPoint from './GradientPoint/index.vue'
import {
  generateGradientStyle,
  updateGradientActivePercent,
} from '@l/helpers/index'
import { v4 as uuidv4 } from 'uuid'
import { hsvToRgb } from '@l/helpers'
import type { IColorState, IPoitItem } from '@l/types'
import { cloneDeep } from 'lodash-es'

const colorPickerState = inject('colorPickerState') as IColorState
const updateColor = inject('updateColor') as any
const pointsContainerRef = ref<HTMLElement | null>(null)
const pointsContainerBoxInfo = ref<DOMRect | null>(null)
const pointsStyle = computed(() => {
  const style = generateGradientStyle(colorPickerState.points!, 'linear', 90)
  return { background: style }
})

const handleAddPoit = (event) => {
  const { x = 0, width = 0 } = pointsContainerBoxInfo.value || {}
  const left = updateGradientActivePercent(event.pageX - x, width)
  // saturation, value 基本是固定的
  const { hue, saturation, value } = colorPickerState
  const points = cloneDeep(colorPickerState.points)
  // @ts-ignore
  const rgba = hsvToRgb(hue, saturation, value, 1)
  const newPoint = {
    id: uuidv4(),
    ...rgba,
    left,
  } as IPoitItem
  points?.push(newPoint)
  colorPickerState.activePointIndex = points!.findIndex(
    (i: IPoitItem) => i.id === newPoint.id,
  )
  updateColor(
    {
      points,
    },
    'points',
  )
}

watchEffect(() => {
  if (pointsContainerRef.value && !pointsContainerBoxInfo.value?.width) {
    pointsContainerBoxInfo.value =
      pointsContainerRef.value?.getBoundingClientRect() || null
  }
})
</script>

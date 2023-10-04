<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-28 10:50:02
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 22:28:08
-->
<template>
  <div
    :class="`picker-pointer${activeClassName}`"
    :style="pointStyle"
    @mousedown.stop="mouseEvents"
    @dblclick.stop="removePoint"
    @click.stop="() => (colorPickerState.activePointIndex = props.index)"
  >
    <span :class="`child-point${activeClassName}`" />
  </div>
</template>

<script name="AreaGradientPoint" lang="ts" setup>
import { useMouseEvents } from '@l/hooks/index'
import { updateGradientActivePercent } from '@l/helpers/index'
import type { IColorState, IPoitItem } from '@l/types'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  point: {
    type: Object as PropType<IPoitItem>,
    required: true,
  },
  width: {
    type: Number,
    default: 0,
  },
  positions: {
    type: Object as PropType<DOMRect | null>,
  },
})

const colorPickerState = inject('colorPickerState') as IColorState
const updateColor = inject('updateColor') as any
const activeClassName = computed(() =>
  colorPickerState.activePointIndex === props.index ? ' active' : '',
)

const pointStyle = computed(() => {
  return { left: `${props.point.left * ((props.width - 14) / 100)}px` }
})

const mouseDownHandler = (event) => {
  const startX = event.pageX
  const startY = event.pageY
  const offsetX = startX - (props.positions!.x || 0)
  colorPickerState.activePointIndex = props.index
  return {
    startX,
    startY,
    offsetX,
  }
}
const updateGradientLeft = (left: number) => {
  //@ts-ignore
  colorPickerState.points[props.index].left = left
  // 更新point麻烦，触发更新
  updateColor({ type: colorPickerState.type }, 'type')
}
const changeObjectPositions = (event, { startX, offsetX }) => {
  const moveX = event.pageX - startX
  offsetX += moveX
  const left = updateGradientActivePercent(offsetX, props.width)
  return {
    positions: {
      offsetX,
      startX: event.pageX,
    },
    left,
  }
}
const mouseMoveHandler = (event, { startX, offsetX }) => {
  const { positions, left } = changeObjectPositions(event, {
    startX,
    offsetX,
  })
  updateGradientLeft(left)
  return positions
}
const mouseUpHandler = (event, { startX, offsetX }) => {
  const { positions, left } = changeObjectPositions(event, {
    startX,
    offsetX,
  })

  updateGradientLeft(left)

  return positions
}
const mouseEvents = useMouseEvents(
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler,
)

const removePoint = () => {
  let points = cloneDeep(colorPickerState.points)
  if (points!.length <= 2) return // 至少2个点
  const index = props.index

  points = points?.filter((i: IPoitItem) => i.id !== props.point.id)
  colorPickerState.activePointIndex = index === 0 ? 1 : index - 1
  updateColor({ points }, 'points')
}
</script>

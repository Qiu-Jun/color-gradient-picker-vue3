<!--
 * @Author: June
 * @Description: Area Picker
 * @Date: 2023-09-27 19:28:05
 * @LastEditors: June
 * @LastEditTime: 2023-10-06 02:13:19
-->
<template>
  <div
    ref="pickerAreaRef"
    class="picker-area w-full mb-16px relative rounded-8px"
    :style="pickerStyle"
    @mousedown="mouseEvents"
  >
    <div class="picker-area-overlay1 wh-full">
      <div class="picker-area-overlay2 wh-full rounded-8px">
        <div class="picker-pointer" :style="pointerStyle" />
      </div>
    </div>
  </div>
</template>

<script name="AreaPicker" lang="ts" setup>
import { changePicker, getRgbByHue } from '@l/helpers/index'
import { useMouseEvents } from '@l/hooks'
import type { IColorState } from '@l/types'

const pickerAreaRef = ref<HTMLElement | null>(null)
const pickerBoxInfo = ref<DOMRect | null>(null)
const colorPickerState = inject('colorPickerState') as IColorState
const updateColor = inject('updateColor') as any

const pointerStyle = computed(() => {
  const { width = 0, height = 0 } = pickerBoxInfo.value || {}
  const {
    saturation = 100,
    value = 100,
    isGradient,
    activePointIndex,
  } = colorPickerState

  const offsetLeft = (((saturation * width) / 100) | 0) - 6
  const offsetTop = ((height - (value * height) / 100) | 0) - 6
  const points = colorPickerState.points!
  const activePoint = points[activePointIndex || 0]
  const red = isGradient ? activePoint?.red : colorPickerState.red
  const green = isGradient ? activePoint?.green : colorPickerState.green
  const blue = isGradient ? activePoint?.blue : colorPickerState.blue
  return {
    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    left: `${offsetLeft}px`,
    top: `${offsetTop}px`,
  }
})

const pickerStyle = computed(() => {
  const {
    isGradient,
    red,
    green,
    blue,
    activePointIndex = 0,
    points = [],
  } = colorPickerState
  if (isGradient) {
    const activePoint = points[activePointIndex]
    return {
      backgroundColor: `rgb(${activePoint.red}, ${activePoint.green}, ${activePoint.blue})`,
    }
  } else {
    return {
      backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    }
  }
})

const mouseDownHandler = (event) => {
  if (!pickerBoxInfo.value) return
  const { x: elementX, y: elementY } = pickerBoxInfo.value
  const { width = 0, height = 0 } = pickerBoxInfo.value || {}
  const startX = event.pageX
  const startY = event.pageY
  const positionX = startX - elementX
  const positionY = startY - elementY
  const color = changePicker(
    positionX,
    positionY,
    height,
    width,
    colorPickerState.hue!,
    colorPickerState.alpha!,
  )
  updateColor(color)
  return {
    startX,
    startY,
    positionX,
    positionY,
  }
}
const changeObjectPositions = (
  event,
  { startX, startY, positionX, positionY },
) => {
  const moveX = event.pageX - startX
  const moveY = event.pageY - startY
  const { width = 0, height = 0 } = pickerBoxInfo.value || {}
  positionX += moveX
  positionY += moveY
  const color = changePicker(
    positionX,
    positionY,
    height,
    width,
    colorPickerState.hue!,
    colorPickerState.alpha,
  )
  return {
    positions: {
      positionX,
      positionY,
      startX: event.pageX,
      startY: event.pageY,
    },
    color,
  }
}

const mouseMoveHandler = (event, { startX, startY, positionX, positionY }) => {
  const { positions, color } = changeObjectPositions(event, {
    startX,
    startY,
    positionX,
    positionY,
  })
  updateColor(color)
  return positions
}

const mouseUpHandler = (event, { startX, startY, positionX, positionY }) => {
  const { positions, color } = changeObjectPositions(event, {
    startX,
    startY,
    positionX,
    positionY,
  })
  updateColor(color)
  return positions
}

const mouseEvents = useMouseEvents(
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler,
)

watchEffect(() => {
  const pickerAreaEl = pickerAreaRef.value
  if (pickerAreaEl && !pickerBoxInfo.value?.width) {
    pickerBoxInfo.value = pickerAreaEl.getBoundingClientRect() || null
  }
})
</script>

<style lang="scss" scoped>
.picker-area {
  height: 160px;
  &:hover {
    cursor: default;
  }

  .picker-area-overlay1 {
    background: linear-gradient(
      to right,
      white 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 3px;
    .picker-area-overlay2 {
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%);
    }
  }
}
</style>

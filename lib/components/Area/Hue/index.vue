<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 19:27:26
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 10:56:14
-->
<template>
  <div
    class="relative w-full overflow-hidden rounded-10px mb-8px bg-[red] cursor-pointer"
    @mousedown="mouseEvents"
  >
    <div ref="hueRef" class="hue-area relative">
      <div class="picker-pointer" :style="pointerStyle" />
    </div>
  </div>
</template>

<script name="AreaHue" lang="ts" setup>
import { useMouseEvents } from '@l/hooks'
import { getHue } from '@l/helpers'
import type { IColorState } from '@l/types'

const hueRef = ref<HTMLElement | null>(null)
const hueBoxInfo = ref<DOMRect | null>(null)
const colorPickerState = inject('colorPickerState') as IColorState
const updateColor = inject('updateColor') as any
const offsetLeft = computed(() => {
  const width = hueBoxInfo.value?.width || 0
  const hue = colorPickerState.hue || 0
  return ((hue * (width - 14)) / 360) | 0
})

const pointerStyle = computed(() => {
  return {
    left: `${offsetLeft.value}px`,
  }
})

const mouseDownHandler = (event) => {
  // event.currentTarget.getBoundingClientRect().x
  const elementX = hueBoxInfo.value?.x || 0
  const startX = event.pageX
  const width = hueBoxInfo.value?.width || 0
  const positionX = startX - elementX

  const color = getHue(
    positionX,
    width,
    colorPickerState.saturation!,
    colorPickerState.value!,
    colorPickerState.alpha,
  )
  updateColor(color)

  return {
    startX,
    positionX,
  }
}

const changeObjectPositions = (event, { startX, positionX }) => {
  const moveX = event.pageX - startX
  const width = hueBoxInfo.value?.width || 0
  positionX += moveX

  // update value and saturation
  const offsetX = positionX > width ? width : positionX <= 0 ? 0 : positionX
  const color = getHue(
    offsetX,
    width,
    colorPickerState.saturation!,
    colorPickerState.value!,
    colorPickerState.alpha,
  )

  return {
    positions: {
      positionX,
      startX: event.pageX,
    },
    color,
  }
}

const mouseMoveHandler = (event, { startX, positionX }) => {
  const { positions, color } = changeObjectPositions(event, {
    startX,
    positionX,
  })

  updateColor(color)

  return positions
}

const mouseUpHandler = (event, { startX, positionX }) => {
  const { positions, color } = changeObjectPositions(event, {
    startX,
    positionX,
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
  if (hueRef.value && !hueBoxInfo.value?.width) {
    hueBoxInfo.value = hueRef.value?.getBoundingClientRect() || null
  }
})
</script>

<style lang="scss" scoped>
.hue-area {
  height: 14px;
  background: -webkit-linear-gradient(
    left,
    #ff0000,
    #ff0080,
    #ff00ff,
    #8000ff,
    #0000ff,
    #0080ff,
    #00ffff,
    #00ff80,
    #00ff00,
    #80ff00,
    #ffff00,
    #ff8000,
    #ff0000
  );
  background: -o-linear-gradient(
    left,
    #ff0000,
    #ff8000,
    #ffff00,
    #80ff00,
    #00ff00,
    #00ff80,
    #00ffff,
    #0080ff,
    #0000ff,
    #8000ff,
    #ff00ff,
    #ff0080,
    #ff0000
  );
  background: -ms-linear-gradient(
    left,
    #ff0000,
    #ff8000,
    #ffff00,
    #80ff00,
    #00ff00,
    #00ff80,
    #00ffff,
    #0080ff,
    #0000ff,
    #8000ff,
    #ff00ff,
    #ff0080,
    #ff0000
  );
  background: -moz-linear-gradient(
    left,
    #ff0000,
    #ff8000,
    #ffff00,
    #80ff00,
    #00ff00,
    #00ff80,
    #00ffff,
    #0080ff,
    #0000ff,
    #8000ff,
    #ff00ff,
    #ff0080,
    #ff0000
  );
  background: linear-gradient(
    to right,
    #ff0000,
    #ff8000,
    #ffff00,
    #80ff00,
    #00ff00,
    #00ff80,
    #00ffff,
    #0080ff,
    #0000ff,
    #8000ff,
    #ff00ff,
    #ff0080,
    #ff0000
  );
}
</style>

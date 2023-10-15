<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 12:54:30
 * @LastEditors: June
 * @LastEditTime: 2023-10-15 16:24:57
-->
<template>
  <div
    class="picker-color-ui border-box m-8px bg-[#fff] flex flex-col slelect-none"
  >
    <Suspense>
      <template #default>
        <!-- 渐变 -->
        <Gradient v-if="props.isGradient" />

        <!-- 纯色 -->
        <Solid v-else />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>

    <div v-if="showBtn" class="btns flex justify-end items-center select-none">
      <div
        v-if="showCancel"
        class="btn"
        :style="{
          color: props.cancelColor,
          backgroundColor: props.cancelBg,
        }"
        @click="onClose"
      >
        {{ props.cancelText }}
      </div>
      <div
        class="btn"
        :style="{
          color: props.confirmColor,
          backgroundColor: props.confirmBg,
        }"
        @click="onConfirm"
      >
        {{ props.confirmText }}
      </div>
    </div>
  </div>
</template>

<script name="ColorPicker" lang="ts" setup>
import { cloneDeep, throttle } from 'lodash-es'
import { generateSolidStyle, generateGradientStyle } from '@l/helpers'
import { v4 as uuidv4 } from 'uuid'
import type { IColor, IColorState } from '@l/types'
import { PropType } from 'vue'

interface IProps {
  isGradient: boolean
  showBtn: boolean
  color: any
  cancelText?: string
  cancelColor?: string
  cancelBg?: string
  confirmText?: string
  confirmColor?: string
  confirmBg?: string
}
const Gradient = defineAsyncComponent(
  () => import('./components/Gradient/index.vue'),
)
const Solid = defineAsyncComponent(() => import('./components/Solid/index.vue'))
const emits = defineEmits(['change'])
const props: IProps = defineProps({
  isGradient: {
    type: Boolean,
    default: false,
  },
  showBtn: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Object as PropType<any>,
    default: (_this) => {
      if (_this.isGradient) {
        return {
          type: 'linear',
          degree: 0,
          points: [
            {
              id: uuidv4(),
              left: 0,
              red: 0,
              green: 0,
              blue: 0,
              alpha: 1,
            },
            {
              id: uuidv4(),
              left: 100,
              red: 255,
              green: 0,
              blue: 0,
              alpha: 1,
            },
          ],
        }
      } else {
        return { red: 255, green: 0, blue: 0, alpha: 1 }
      }
    },
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },

  cancelColor: {
    type: String,
    default: '#333',
  },
  cancelBg: {
    type: String,
    default: '#fff',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  confirmColor: {
    type: String,
    defualt: '#333',
  },
  confirmBg: {
    type: String,
    defualt: '#fff',
  },
})

const pointLen = props.isGradient ? props.color?.points?.length || 0 : 0
const lastPoint = pointLen ? pointLen - 1 : 0
console.log(lastPoint)
console.log(props.color.points)
const colorPickerState = reactive<IColorState>({
  isGradient: props.isGradient, // 是否是渐变
  red: props.isGradient ? props.color.points[lastPoint].red : props.color.red,
  green: props.isGradient
    ? props.color.points[lastPoint].green
    : props.color.green,
  blue: props.isGradient
    ? props.color.points[lastPoint].blue
    : props.color.blue,
  alpha: props.isGradient
    ? props.color.points[lastPoint].alpha
    : props.color.alpha,
  hue: 0,
  saturation: 100, // 饱和
  value: 100,
  style: '',
  type: props.isGradient ? props.color.type : 'linear',
  degree: props.isGradient ? props.color.degree : 0,
  activePointIndex: lastPoint, // 当前渐变点的下标
  points: props.isGradient ? cloneDeep(props.color.points) : [], // 渐变的点
})

const updateColor = throttle(
  function (
    {
      red,
      green,
      blue,
      alpha,
      hue,
      saturation,
      value,
      points,
      type,
      degree,
    }: IColor,
    key: string,
  ): void {
    const params: IColor = {
      red,
      green,
      blue,
      alpha,
      hue,
      saturation,
      value,
      points,
      type,
      degree,
    }
    props.isGradient ? updateGradient(params, key) : updateSolid(params, key)
  },
  props.showBtn ? 100 : 150,
)

// 更新渐变 rgba在对应点更新
function updateGradient(color: IColor, key?: string) {
  const {
    red = 0,
    green = 0,
    blue = 0,
    alpha = 0,
    hue,
    saturation,
    value,
    points,
    type,
    degree,
  } = color
  // @ts-ignore
  const activePoint = colorPickerState.points[colorPickerState.activePointIndex]
  if (key) {
    if (key === 'points' || key === 'type' || key === 'degree') {
      // @ts-ignore
      colorPickerState[key] = color[key]
    } else {
      activePoint[key] = color[key]
    }
  } else {
    // 渐变不更新rgb,更新点的rgb
    activePoint.red = red
    activePoint.green = green
    activePoint.blue = blue
    colorPickerState.alpha = alpha
    points && (colorPickerState.points = points)
    type && (colorPickerState.type = type)
    degree && (colorPickerState.degree = degree)
    saturation && (colorPickerState.saturation = saturation)
    value && (colorPickerState.value = value)
    hue && (colorPickerState.hue = hue)
  }

  // if (curPoint) {
  //   colorPickerState.activePoint =
  //     colorPickerState.points[colorPickerState.activePointIndex]
  // }
  const style = generateGradientStyle(
    colorPickerState.points!,
    colorPickerState.type!,
    colorPickerState.degree!,
  )
  colorPickerState.style = style
  !props.showBtn &&
    emits('change', {
      style: colorPickerState.style,
      gradient: {
        type: colorPickerState.type,
        degree: colorPickerState.degree,
        points: colorPickerState.points,
      },
    })
}

function updateSolid(color: IColor, key?: string) {
  const { red = 0, green = 0, blue = 0, alpha, hue, saturation, value } = color
  if (key) {
    colorPickerState[key] = color[key]
  } else {
    colorPickerState.red = red
    colorPickerState.green = green
    colorPickerState.blue = blue
    alpha && (colorPickerState.alpha = alpha)
    saturation && (colorPickerState.saturation = saturation)
    value && (colorPickerState.value = value)
    hue && (colorPickerState.hue = hue)
  }
  const style = generateSolidStyle(
    colorPickerState.red,
    colorPickerState.green,
    colorPickerState.blue,
    colorPickerState.alpha,
  )
  colorPickerState.style = style
  !props.showBtn &&
    emits('change', {
      style: style,
      color: {
        red: colorPickerState.red,
        green: colorPickerState.green,
        blue: colorPickerState.blue,
        hue: colorPickerState.hue,
        alpha: colorPickerState.alpha,
      },
    })
}

const onClose = (cb) => {
  cb && typeof cb === 'function' && cb()
}

const onConfirm = (cb) => {
  const {
    isGradient,
    style,
    type,
    degree,
    points,
    red,
    green,
    blue,
    alpha,
    hue,
  } = colorPickerState

  if (isGradient) {
    emits('change', {
      style,
      gradient: {
        type,
        degree,
        points,
      },
    })
  } else {
    emits('change', {
      style,
      color: {
        red,
        green,
        blue,
        hue,
        alpha,
      },
    })
  }
  cb && typeof cb === 'function' && cb()
}

provide('colorPickerState', colorPickerState)
provide('updateColor', updateColor)

defineExpose({
  onClose,
  onConfirm,
})
</script>

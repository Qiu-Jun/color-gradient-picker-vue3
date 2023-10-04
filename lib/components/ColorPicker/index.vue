<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-09-27 12:54:30
 * @LastEditors: June
 * @LastEditTime: 2023-10-04 11:29:28
-->
<template>
  <div
    class="picker-color-ui border-box m-8px bg-[#fff] flex flex-col slelect-none"
  >
    <!-- 渐变 -->
    <Gradient v-if="props.isGradient" />

    <!-- 纯色 -->
    <Solid v-else />

    <div v-if="showBtn" class="btns flex justify-end items-center select-none">
      <div
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
import Solid from './components/Solid/index.vue'
import Gradient from './components/Gradient/index.vue'
import { cloneDeep, throttle } from 'lodash-es'
import { generateSolidStyle, generateGradientStyle } from '@l/helpers'
import { v4 as uuidv4 } from 'uuid'
import type { IColor, IGradient, IColorState } from '@l/types'
import { PropType } from 'vue'

interface IProps {
  isGradient: boolean
  showBtn: boolean
  color?: IColor
  gradient?: IGradient
  cancelText?: string
  cancelColor?: string
  cancelBg?: string
  confirmText?: string
  confirmColor?: string
  confirmBg?: string
}

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
  color: {
    type: Object as PropType<IColor>,
    default: () => ({ red: 255, green: 0, blue: 0, alpha: 1 }),
  },
  gradient: {
    type: Object as PropType<IGradient>,
    default: () => ({
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
    }),
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

const colorPickerState = reactive<IColorState>({
  isGradient: props.isGradient, // 是否是渐变
  red: (props.isGradient ? props.gradient?.points[1].red : props.color?.red)!,
  green: (props.isGradient
    ? props.gradient?.points[1].green
    : props.color?.green)!,
  blue: (props.isGradient
    ? props.gradient?.points[1].blue
    : props.color?.blue)!,
  alpha: (props.isGradient
    ? props.gradient?.points[0].alpha
    : props.color?.alpha)!,
  hue: 0,
  saturation: 100,
  value: 100,
  style: '',
  type: 'linear',
  degree: 0,
  activePointIndex: 1, // 因为默认颜色取了默认的1
  activePoint: cloneDeep(props.gradient?.points[0]),
  points: cloneDeep(props.gradient?.points),
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

function updateGradient(color: IColor, key?: string) {
  const {
    red = 0,
    green = 0,
    blue = 0,
    alpha,
    hue,
    saturation,
    value,
    points,
    type,
    degree,
  } = color
  if (key) {
    colorPickerState[key] = color[key]
  } else {
    colorPickerState.red = red
    colorPickerState.green = green
    colorPickerState.blue = blue
    points && (colorPickerState.points = points)
    type && (colorPickerState.type = type)
    degree && (colorPickerState.degree = degree)
    alpha && (colorPickerState.alpha = alpha)
    saturation && (colorPickerState.saturation = saturation)
    value && (colorPickerState.value = value)
    hue && (colorPickerState.hue = hue)
  }
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

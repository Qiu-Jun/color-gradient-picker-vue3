<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 10:28:59
 * @LastEditTime: 2024-12-13 17:17:19
 * @LastEditors: June
-->
<template>
  <section class="cpg-controls-wrapper">
    <div class="cpg-controls-item">
      <div
        class="cpg-controls-item-btn cpg-cursor-pointer"
        :class="{ 'cpg-control-active': !isGradient }"
        @click="handleSetIsGradient(Modes.solid)"
      >
        Solid
      </div>
      <div
        v-if="!colorState.hideGradient"
        class="cpg-controls-item-btn cpg-cursor-pointer"
        :class="{ 'cpg-control-active': isGradient }"
        @click="handleSetIsGradient(Modes.gradient)"
      >
        Gradient
      </div>
    </div>
    <div class="cpg-controls-item">
      <!-- <div
        class="cpg-controls-item-btn cpg-cursor-pointer"
        :class="{ 'cpg-control-active': showAdvancedControl }"
      >
        <SvgIcon
          ext-class="text-14px "
          icon="regulate"
          @click="toggleShowAdvancedControl"
        />
      </div> -->
      <div class="cpg-controls-item-btn cpg-cursor-pointer">
        <span
          :class="
            showInputTypes
              ? 'text-14px iconfont cpg-xise text-#568cf5'
              : 'iconfont cpg-xise text-14px'
          "
          icon=""
          @click="handleXise"
        />
      </div>
      <div
        class="cpg-controls-item-btn cpg-cursor-pointer"
        :class="{ 'cpg-control-active': showInputTypes }"
      >
        <span
          :class="
            showInputTypes
              ? 'text-14px iconfont cpg-exchage text-#568cf5'
              : 'iconfont cpg-exchage text-14px'
          "
          icon=""
          @click="toggleShowInputType"
        />

        <div
          class="cpg-controls-inputType"
          :class="{ 'cpg-controls-hideInputType': !showInputTypes }"
        >
          <div
            v-for="type in inputTypes"
            :key="type"
            class="cpg-control-inputType-item"
            :class="{
              'cpg-control-inputType-item-active':
                colorState.inputType === type,
            }"
            @click="handleSetInputType(type)"
          >
            {{ type }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { inputTypes } from '@/constants'
import { InputType, Modes } from '@/enums'
import { config } from '@/constants'
import html2canvas from 'html2canvas'
import type { IMode } from '@/interfaces'

const { defaultColor, defaultGradient } = config
const { colorState, isGradient, setInputType, setMode, setValue } = inject(
  'colorProvider',
) as any

// input type
const showInputTypes = ref(false)
const toggleShowInputType = debounce(function () {
  showInputTypes.value = !showInputTypes.value
}, 250)
const handleSetInputType = debounce(function (type: InputType) {
  setInputType(type)
  toggleShowInputType()
}, 180)

// 吸色
const coverUp = ref(false)
const handleXise = debounce(function () {
  // @ts-ignore
  if (!window?.EyeDropper) {
    return
  }
  const root = document.getElementById('app')
  console.log(root, 'xxxxsss')
  html2canvas(root!).then((canvas: any) => {
    const blankCanvas = document.createElement('canvas')
    const ctx = blankCanvas.getContext('2d', { willReadFrequently: true })

    if (root && ctx) {
      blankCanvas.width = root.offsetWidth * 2
      blankCanvas.height = root.offsetHeight * 2
      ctx.drawImage(canvas, 0, 0)
    }
  })
}, 250)

// toggleShowAdvancedControl
// const showAdvancedControl = ref(false)
// const toggleShowAdvancedControl = debounce(function () {
//   showAdvancedControl.value = !showAdvancedControl.value
//   setShowAdvance(showAdvancedControl.value)
// }, 250)

const handleSetIsGradient = debounce(function (mode: IMode) {
  if (colorState.mode === mode) return
  setMode(mode)
  setValue(mode === Modes.gradient ? defaultGradient : defaultColor)
}, 250)
</script>

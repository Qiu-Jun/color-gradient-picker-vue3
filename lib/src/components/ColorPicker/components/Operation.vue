<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-03 10:28:59
 * @LastEditTime: 2024-12-05 15:41:47
 * @LastEditors: June
-->
<template>
  <section class="cpg-controls-wrapper">
    <div class="cpg-controls-item">
      <div
        class="cpg-controls-item-btn"
        :class="{ 'cpg-control-active': !colorState.isGradient }"
        role="button"
        @click="handleSetIsGradient(false)"
      >
        Solid
      </div>
      <div
        class="cpg-controls-item-btn"
        :class="{ 'cpg-control-active': colorState.isGradient }"
        role="button"
        @click="handleSetIsGradient(true)"
      >
        Gradient
      </div>
    </div>
    <div class="cpg-controls-item">
      <!-- <div
        class="cpg-controls-item-btn"
        :class="{ 'cpg-control-active': showAdvancedControl }"
        role="button"
      >
        <SvgIcon
          ext-class="text-14px "
          icon="regulate"
          @click="toggleShowAdvancedControl"
        />
      </div> -->
      <!-- <div class="cpg-controls-item-btn" role="button">
        <SvgIcon ext-class="text-14px " icon="guide" />
      </div> -->
      <div
        class="cpg-controls-item-btn"
        :class="{ 'cpg-control-active': showInputTypes }"
        role="button"
      >
        <SvgIcon
          :ext-class="showInputTypes ? 'text-14px text-#568cf5' : 'text-14px'"
          icon="toggle"
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
import SvgIcon from '@/components/SvgIcon'
import { useColor } from '@/hooks/useColor'
import { debounce } from 'lodash-es'
import { inputTypes } from '@/constants'
import { InputType } from '@/enums'

const { colorState, setIsGradient, setInputType, setShowAdvance } = useColor()

// input type
const showInputTypes = ref(false)
const toggleShowInputType = debounce(function () {
  showInputTypes.value = !showInputTypes.value
}, 250)
const handleSetInputType = debounce(function (type: InputType) {
  setInputType(type)
  toggleShowInputType()
}, 250)

// toggleShowAdvancedControl
const showAdvancedControl = ref(false)
const toggleShowAdvancedControl = debounce(function () {
  showAdvancedControl.value = !showAdvancedControl.value
  setShowAdvance(showAdvancedControl.value)
}, 250)

const handleSetIsGradient = debounce(function (val: boolean) {
  setIsGradient(val)
}, 250)
</script>

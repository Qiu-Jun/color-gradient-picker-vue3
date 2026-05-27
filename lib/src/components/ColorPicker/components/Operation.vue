<!--
 * @Author: June
 * @Description: 操作栏组件
 * @Date: 2024-12-03 10:28:59
 * @LastEditTime: 2024-12-13 17:17:19
 * @LastEditors: June
-->
<template>
  <section class="cpg-controls-wrapper">
    <!-- 选择渐变模式 -->
    <div class="cpg-controls-item">
      <div
        class="cpg-controls-item-btn cpg-cursor-pointer"
        :class="{ 'cpg-control-active': !isGradient }"
        @click="handleSetIsGradient(Modes.solid)"
      >
        {{ t('solid') }}
      </div>
      <div
        v-if="!colorState.hideGradient"
        class="cpg-controls-item-btn cpg-cursor-pointer"
        :class="{ 'cpg-control-active': isGradient }"
        @click="handleSetIsGradient(Modes.gradient)"
      >
        {{ t('gradient') }}
      </div>
    </div>

    <!-- 右侧菜单 -->
    <div class="cpg-controls-item">
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
import { inputTypes, config, DEBOUNCE_DELAY } from '@/constants'
import { InputType, Modes } from '@/enums'
import type { IMode } from '@/interfaces'
import { COLOR_PROVIDER_KEY } from '@/interfaces'
import { t } from '@/utils/i18n'

const { defaultColor, defaultGradient } = config
const { colorState, isGradient, setInputType, setMode, setValue } = inject(
  COLOR_PROVIDER_KEY,
)!

const showInputTypes = ref(false)
const toggleShowInputType = debounce(function () {
  showInputTypes.value = !showInputTypes.value
}, DEBOUNCE_DELAY)
const handleSetInputType = debounce(function (type: InputType) {
  setInputType(type)
  toggleShowInputType()
}, 180)

const handleSetIsGradient = debounce(function (mode: IMode) {
  if (colorState.mode === mode) return
  setMode(mode)
  setValue(mode === Modes.gradient ? defaultGradient : defaultColor)
}, DEBOUNCE_DELAY)
</script>

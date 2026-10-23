<template>
  <div class="cpg-inputItem-wrap" :style="{ width }">
    <input
      type="number"
      class="cpg-input"
      min="0"
      max="100"
      step="any"
      :value="displayPosition"
      @input="onSetPosition"
      @change="onSetPosition"
      @blur="onPositionBlur"
    />
    <div class="cpg-input-label">%</div>
  </div>
</template>

<script lang="ts" setup>
import { COLOR_PROVIDER_KEY } from '@/interfaces'
import { formatInputValues } from '@/utils/format'

const { colorState, handleGradient } = inject(COLOR_PROVIDER_KEY)!

const width = computed(() => (colorState.hideOpacity ? '18%' : '14%'))

const positionDraft = ref<string | null>(null)

const selectedPosition = computed(() => {
  const colors = colorState.gradientColors
  const idx = colorState.gradientColorsIdx || 0
  return colors?.[idx]?.left ?? 0
})

const displayPosition = computed(
  () => positionDraft.value ?? selectedPosition.value,
)

watch(
  () => colorState.gradientColorsIdx,
  () => {
    positionDraft.value = null
  },
)

const applyPosition = (val: number) => {
  const left = formatInputValues(val, 0, 100)
  const colors = colorState.gradientColors || []
  const colorValue = colors[colorState.gradientColorsIdx || 0]
  if (!colorValue?.value) return

  handleGradient(colorValue.value, left)
}

const onSetPosition = (e: Event) => {
  const target = e.target as HTMLInputElement
  positionDraft.value = target.value
  const val = parseFloat(target.value)
  if (isNaN(val)) return
  applyPosition(val)
}

const onPositionBlur = () => {
  positionDraft.value = null
}
</script>

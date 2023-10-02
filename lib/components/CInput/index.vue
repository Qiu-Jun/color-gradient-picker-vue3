<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-23 22:20:33
 * @LastEditors: June
 * @LastEditTime: 2023-10-02 14:39:46
-->
<template>
  <div class="flex flex-shrink-0 items-center flex-col" :class="props.classes">
    <div class="flex items-center relative w-full rounded-6px text-[#28314d]">
      <input
        v-model.trim="value"
        class="w-full outline-0 text-[#1f2667] text-center font-bold text-12px"
        :maxlength="maxLen"
        :type="props.type"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </div>
    <div class="text-12px lining-15px font-bold mt-6px mb-0 text-[#1f2667]">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts" setup name="Input">
interface Iprops {
  value: string | number;
  label: string;
  classes: string;
  maxLen?: string | number;
  type?: string;
}

const props = withDefaults(defineProps<Iprops>(), {
  value: '',
  label: '',
  maxLen: '3',
  type: 'text',
  classes: '',
});

const emits = defineEmits(['input', 'blur', 'focus', 'update:value']);

const value = computed<string | number>({
  get: () => props.value,
  set: (val) => {
    emits('update:value', val);
  },
});

// input
const onInput = (e: InputEvent) => {
  emits('input', e);
};
// blur
const onBlur = () => {
  emits('blur');
};
// focus
const onFocus = () => {
  emits('focus');
};
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 18:25:35
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 18:05:59
-->
<template>
    <Input
        :value="state.hexValue"
        label="hex"
        :on-focus="() => (state.inProgress = true)"
        :on-blur="() => (state.inProgress = false)"
        :in-progress="state.inProgress"
        classes="hex"
        @input="changeHex"
    />
</template>

<script setup name="Preview">
import { reactive, computed, watch } from 'vue';
import Input from '@/lib/components/Input/index.vue';
import { rgbToHex, hexToRgb } from '@/lib/helpers';

const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});

const state = reactive({
    inProgress: false,
    hexValue: rgbToHex(props.red, props.green, props.blue),
});

const hex = computed(() => rgbToHex(props.red, props.green, props.blue));

const setHex = () => {
    if (hex.value.length === 6 && state.inProgress) {
        state.hexValue = hex.value;
    }
};

const changeHex = (event) => {
    const color = hexToRgb(event.target.value);
    if (color) {
        props.updateColor(color);
    }
};

watch(
    () => [state.inProgress, props.red, props.green, props.blue],
    () => setHex(),
);
</script>

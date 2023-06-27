<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 18:25:35
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 15:27:22
-->
<template>
    <Input
        :value="state.hexValue"
        label="hex"
        classes="hex"
        @input="changeHex"
    />
</template>

<script lang="ts" setup name="Preview">
import { reactive, computed, watch } from 'vue';
import Input from '@c/Input/index.vue';
import { rgbToHex, hexToRgb } from '@l/helpers';

interface Iprops {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    updateColor: (any) => void;
}

// 这里的any后面处理
const props = withDefaults(defineProps<Iprops>(), {
    red: 0,
    green: 0,
    blue: 0,
    updateColor: (any) => false,
});

const state = reactive({
    hexValue: rgbToHex(props.red, props.green, props.blue),
});

const hex = computed(() => rgbToHex(props.red, props.green, props.blue));

const setHex = () => {
    if (hex.value.length === 6) {
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
    () => [props.red, props.green, props.blue],
    () => {
        setHex();
    },
);
</script>

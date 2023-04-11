<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 18:41:58
 * @LastEditors: June
 * @LastEditTime: 2023-04-11 12:01:51
-->
<template>
    <div>
        <Input
            :value="state.inputValue"
            :type="props.type"
            :label="props.label"
            :on-focus="() => (state.inProgress = true)"
            :on-blur="onBlur"
            :in-progress="state.inProgress"
            classes="rgb"
            @input="onChangeHandler"
        />
    </div>
</template>

<script setup name="RGBItem">
import { reactive, watch, getCurrentInstance } from 'vue';
import Input from '@c/components/Input/index.vue';

const instance = getCurrentInstance();
const props = defineProps({
    value: [String, Number],
    type: String,
    label: String,
    onChange: Function,
});

const state = reactive({
    inputValue: props.value,
    inProgress: false,
});

const setValue = () => {
    if (props.value !== +state.inputValue && state.inputValue !== '') {
        state.inputValue = props.value;
    }
};

const onChangeHandler = (event) => {
    const value = +event.target.value;
    if (Number.isNaN(value) || value.length > 3 || value < 0 || value > 255) {
        state.inputValue = props.value;
        instance?.proxy?.$forceUpdate();
        return;
    }
    state.inputValue = event.target.value;
    props.onChange(value);
};

const onBlur = () => {
    if (!state.inputValue && !state.inputValue !== 0) {
        state.inputValue = props.value;
    }
    state.inProgress = false;
};

watch(
    () => props.value,
    () => setValue(),
);
</script>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 18:24:48
 * @LastEditors: June
 * @LastEditTime: 2023-03-23 23:26:56
-->
<template>
    <RGBItem
        :value="props.red"
        type="number"
        label="R"
        :on-change="(value) => changeValue('red', value)"
    />
    <RGBItem
        :value="props.green"
        type="number"
        label="G"
        :on-change="(value) => changeValue('green', value)"
    />
    <RGBItem
        :value="props.blue"
        type="number"
        label="B"
        :on-change="(value) => changeValue('blue', value)"
    />
    <RGBItem
        :value="parseInt(props.alpha * 100, 10)"
        type="number"
        label="Alpha"
        :on-change="(value) => changeValue('alpha', value)"
    />
</template>

<script setup name="RGB">
import RGBItem from './RGBItem/index.vue';
import { rgbToHsv } from '@c/helpers/index';

const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});

const changeValue = (field, value) => {
    if (field === 'alpha') {
        props.updateColor({ alpha: value / 100 });
        return;
    }
    const color = rgbToHsv({
        red: props.red,
        green: props.green,
        blue: props.blue,
        [field]: value,
    });
    props.updateColor({ ...color, [field]: value });
};
</script>

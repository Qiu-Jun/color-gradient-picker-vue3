<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 19:57:51
 * @LastEditors: June
 * @LastEditTime: 2023-03-19 20:00:31
-->
<template>
    <div class="preview-area">
        <div class="preview-box" :style="style" />
    </div>
</template>

<script setup name="PickerPreView">
import { computed } from 'vue';
import { generateSolidStyle, generateGradientStyle } from '@/lib/helpers/index';

const props = defineProps({
    isGradient: Boolean,
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    points: Array,
    gradientDegree: Number,
    gradientType: String,
});

const style = computed(() => {
    let style = '';
    if (props.isGradient) {
        style = generateGradientStyle(
            props.points,
            props.gradientType,
            props.gradientDegree,
        );

        return { background: style };
    }

    style = generateSolidStyle(props.red, props.green, props.blue, props.alpha);

    return { backgroundColor: style };
});
</script>

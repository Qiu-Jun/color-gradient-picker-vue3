<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 19:57:51
 * @LastEditors: June
 * @LastEditTime: 2023-05-08 00:01:10
-->
<template>
    <div class="preview-area">
        <div class="preview-box" :style="style" />
    </div>
</template>

<script lang="ts" setup name="PickerPreView">
import { computed } from 'vue';
import { generateSolidStyle, generateGradientStyle } from '@l/helpers/index';

// 和gradient 一致  后面再处理
type Ipoit = {
    left: number;
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};

interface Iprops {
    isGradient: boolean;
    red: number;
    green: number;
    blue: number;
    alpha: number;
    points: any;
    gradientDegree: number;
    gradientType: string;
}

const props = withDefaults(defineProps<Iprops>(), {
    isGradient: false,
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
    points: () => [
        {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
        },
    ],
    gradientType: '',
    gradientDegree: 0,
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

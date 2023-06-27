<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-18 00:57:49
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 16:06:45
-->
<template>
    <div class="ui-color-picker">
        <!-- 渐变picker -->
        <Gradient
            v-if="props.isGradient"
            :points="props.gradient.points"
            :type="props.gradient.type"
            :degree="props.gradient.degree"
        />

        <!-- 非渐变Picker -->
        <Solid
            v-else
            :red="props.color.red"
            :green="props.color.green"
            :blue="props.color.blue"
            :alpha="props.color.alpha"
            :hue="props.color.hue"
            :saturation="props.color.saturation"
            :value="props.color.value"
        />

        <div class="btns">
            <div class="btn" @click="handleCancel">取消</div>
            <div class="btn" @click="handleConfirm">确认</div>
        </div>
    </div>
</template>

<script lang="ts" name="ColorPicker" setup>
import Solid from './Solid/index.vue';
import Gradient from './Gradient/index.vue';
import type { Iattrs } from '@l/types';

interface IPoitItem {
    alpha?: number | string;
    blue?: number | string;
    green?: number | string;
    left?: number | string;
    red?: number | string;
}

interface Iprops {
    isGradient?: boolean;
    color?: any;
    gradient?: {
        type: string;
        degree: number;
        points: [
            {
                left: number;
                red: number;
                green: number;
                blue: number;
                alpha: number;
            },
            {
                left: number;
                red: number;
                green: number;
                blue: number;
                alpha: number;
            },
        ];
    };
    onChange?: any;
    onStartChange?: any;
    onEndChange?: any;
}

const emits = defineEmits(['on-change']);
const props = withDefaults(defineProps<Iprops>(), {
    isGradient: false,
    color: () => ({
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
        hue: 0,
        saturation: 100,
        value: 100,
    }),
    gradient: () => ({
        type: 'linear',
        degree: 0,
        points: [
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
    }),
});

const color: Ref<IPoitItem | Iattrs> = ref({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
});

provide('provideData', {
    onChange: (attrs: Iattrs) => {
        color.value = { ...attrs };
    },
    onStartChange: (attrs: Iattrs) => {
        color.value = { ...attrs };
    },
    onEndChange: (attrs: Iattrs) => {
        color.value = { ...attrs };
    },
});

const handleCancel = () => {};

const handleConfirm = () => {
    emits('on-change', { ...color.value });
};
</script>

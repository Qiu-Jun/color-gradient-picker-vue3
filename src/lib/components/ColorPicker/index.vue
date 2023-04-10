<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-18 00:57:49
 * @LastEditors: June
 * @LastEditTime: 2023-04-08 22:35:41
-->
<template>
    <div class="ui-color-picker">
        <Gradient
            v-if="props.isGradient"
            :points="props.gradient.points"
            :type="props.gradient.type"
            :degree="props.gradient.degree"
            :on-change="props.onChange"
            :on-start-change="props.onStartChange"
            :on-end-change="props.onEndChange"
        />

        <Solid
            v-else
            :red="props.color.red"
            :green="props.color.green"
            :blue="props.color.blue"
            :alpha="props.color.alpha"
            :hue="props.color.hue"
            :saturation="props.color.saturation"
            :value="props.color.value"
            :on-change="props.onChange"
            :on-start-change="props.onStartChange"
            :on-end-change="props.onEndChange"
        />
    </div>
</template>

<script lang="ts" setup name="ColorPicker">
import Solid from './Solid/index.vue';
import Gradient from './Gradient/index.vue';
const props = defineProps({
    isGradient: {
        type: Boolean,
        default: false,
    },
    color: {
        type: Object,
        default: () => ({
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
            hue: 0,
            saturation: 100,
            value: 100,
        }),
    },

    gradient: {
        type: Object,
        default: () => ({
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
    },

    onChange: {
        type: Function,
        default: () => false,
    },
    onStartChange: {
        type: Function,
        default: () => false,
    },
    onEndChange: {
        type: Function,
        default: () => false,
    },
});
</script>

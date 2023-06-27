<!--
 * @Descripttion: Area
 * @Author: June
 * @Date: 2023-03-19 19:23:05
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 22:06:56
-->
<template>
    <div class="picker-area">
        <Picker
            :red="red"
            :green="green"
            :blue="blue"
            :hue="hue"
            :saturation="saturation"
            :value="value"
            :update-color="updateColor"
        />

        <GradientPoints
            v-if="isGradient"
            :type="type"
            :degree="degree"
            :points="points"
            :active-point-index="activePointIndex"
            :change-active-point-index="changeActivePointIndex"
            :update-gradient-left="updateGradientLeft"
            :add-point="addPoint"
            :remove-point="removePoint"
        />

        <div class="preview">
            <Preview
                :red="red"
                :green="green"
                :blue="blue"
                :alpha="alpha"
                :is-gradient="isGradient"
                :points="points"
                :gradient-degree="degree"
                :gradient-type="type"
            />

            <div class="color-hue-alpha">
                <Hue
                    :hue="hue"
                    :saturation="saturation"
                    :value="value"
                    :update-color="updateColor"
                />
                <Alpha
                    :alpha="alpha"
                    :red="red"
                    :green="green"
                    :blue="blue"
                    :update-color="updateColor"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="ColorPicker">
import Picker from './Picker/index.vue';
import Preview from './Preview/index.vue';
import Hue from './Hue/index.vue';
import Alpha from './Alpha/index.vue';
import GradientPoints from './GradientPoints/index.vue';

defineProps({
    isGradient: Boolean,
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function,
    points: Array,
    degree: Number,
    type: String,
    activePointIndex: Number,
    changeGradientControl: Function,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function,
});
</script>

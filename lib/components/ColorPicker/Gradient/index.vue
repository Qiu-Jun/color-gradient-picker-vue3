<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 20:10:11
 * @LastEditors: June
 * @LastEditTime: 2023-04-11 12:01:30
-->
<template>
    <GradientControls
        :type="state.gradientType"
        :degree="state.gradientDegree"
        :change-gradient-control="changeGradientControl"
    />

    <Area
        :red="state.colorRed"
        :green="state.colorGreen"
        :blue="state.colorBlue"
        :alpha="state.colorAlpha"
        :hue="state.colorHue"
        :saturation="state.colorSaturation"
        :value="state.colorValue"
        :update-color="updateColor"
        :is-gradient="true"
        :type="state.gradientType"
        :degree="state.gradientDegree"
        :points="state.gradientPoints"
        :active-point-index="state.activePointIndex"
        :change-gradient-control="changeGradientControl"
        :change-active-point-index="changeActivePointIndex"
        :update-gradient-left="updateGradientLeft"
        :add-point="addPoint"
        :remove-point="removePoint"
    />

    <Preview
        :red="state.colorRed"
        :green="state.colorGreen"
        :blue="state.colorBlue"
        :alpha="state.colorAlpha"
        :update-color="updateColor"
    />
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import GradientControls from './GradientControls/index.vue';
import Preview from '../Preview/index.vue';
import Area from '../Area/index.vue';
import {
    getRightValue,
    rgbToHsv,
    generateGradientStyle,
} from '@c/helpers/index';

const props = defineProps({
    type: {
        type: String,
        default: 'linear',
    },
    degree: {
        type: Number,
        default: 0,
    },
    points: {
        type: Array,
        default: () => {
            return [
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
            ];
        },
    },
    onStartChange: Function,
    onChange: Function,
    onEndChange: Function,
});

const state = reactive({
    activePointIndex: 0,
    gradientPoints: props.points,
    activePoint: props.points[0],
    colorRed: props.points[0].red,
    colorGreen: props.points[0].green,
    colorBlue: props.points[0].blue,
    colorAlpha: props.points[0].alpha,
    colorHue: 0,
    colorSaturation: 100,
    colorValue: 100,
    gradientType: props.type,
    gradientDegree: props.degree,
    actions: {
        onStartChange: props.onStartChange,
        onChange: props.onChange,
        onEndChange: props.onEndChange,
    },
});

const removePoint = (index = state.activePointIndex) => {
    if (state.gradientPoints.length <= 2) {
        return;
    }

    state.gradientPoints.splice(index, 1);

    if (index > 0) {
        state.activePointIndex = index - 1;
    }

    props.onChange &&
        props.onChange({
            points: state.gradientPoints,
            type: state.gradientType,
            degree: state.gradientDegree,
            style: generateGradientStyle(
                state.gradientPoints,
                state.gradientType,
                state.gradientDegree,
            ),
        });
};

const keyUpHandler = (event) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
        removePoint(state.activePointIndex);
    }
};

const changeActivePointIndex = (index) => {
    state.activePointIndex = index;
    state.activePoint = state.gradientPoints[index];
    const { red, green, blue, alpha } = state.activePoint;
    state.colorRed = red;
    state.colorGreen = green;
    state.colorBlue = blue;
    state.colorAlpha = alpha;

    const { hue, saturation, value } = rgbToHsv({ red, green, blue });

    state.colorHue = hue;
    state.colorSaturation = saturation;
    state.colorValue = value;
};

const changeGradientControl = ({ type, degree }) => {
    type = getRightValue(type, state.gradientType);
    degree = getRightValue(degree, state.gradientDegree);

    state.gradientType = type;
    state.gradientDegree = degree;

    props.onChange({
        points: state.gradientPoints,
        type: state.gradientType,
        degree: state.gradientDegree,
        style: generateGradientStyle(
            state.gradientPoints,
            state.gradientType,
            state.gradientDegree,
        ),
    });
};

const updateColor = (
    { red, green, blue, alpha, hue, saturation, value },
    actionName = 'onChange',
) => {
    red = getRightValue(red, state.colorRed);
    green = getRightValue(green, state.colorGreen);
    blue = getRightValue(blue, state.colorBlue);
    alpha = getRightValue(alpha, state.colorAlpha);
    hue = getRightValue(hue, state.colorHue);
    saturation = getRightValue(saturation, state.colorSaturation);
    value = getRightValue(value, state.colorValue);

    const localGradientPoints = state.gradientPoints.slice();

    localGradientPoints[state.activePointIndex] = {
        ...localGradientPoints[state.activePointIndex],
        red,
        green,
        blue,
        alpha,
    };

    state.colorRed = red;
    state.colorGreen = green;
    state.colorBlue = blue;
    state.colorAlpha = alpha;
    state.colorHue = hue;
    state.colorSaturation = saturation;
    state.colorValue = value;
    state.gradientPoints = localGradientPoints;

    const action = state.actions[actionName];

    action &&
        action({
            points: localGradientPoints,
            type: state.gradientType,
            degree: state.gradientDegree,
            style: generateGradientStyle(
                localGradientPoints,
                state.gradientType,
                state.gradientDegree,
            ),
        });
};

const updateGradientLeft = (left, index, actionName = 'onChange') => {
    state.gradientPoints[index].left = left;

    const action = state.actions[actionName];

    action &&
        action({
            points: state.gradientPoints,
            type: state.gradientType,
            degree: state.gradientDegree,
            style: generateGradientStyle(
                state.gradientPoints,
                state.gradientType,
                state.gradientDegree,
            ),
        });
};

const addPoint = (left) => {
    state.gradientPoints.push({
        ...state.gradientPoints[state.activePointIndex],
        left,
    });

    state.activePointIndex = state.gradientPoints.length - 1;

    props.onChange &&
        props.onChange({
            points: state.gradientPoints,
            type: state.gradientType,
            degree: state.gradientDegree,
            style: generateGradientStyle(
                state.gradientPoints,
                state.gradientType,
                state.gradientDegree,
            ),
        });
};

onMounted(() => {
    const { hue, saturation, value } = rgbToHsv({
        red: state.colorRed,
        green: state.colorGreen,
        blue: state.colorBlue,
    });

    state.colorHue = hue;
    state.colorSaturation = saturation;
    state.colorValue = value;
    document.addEventListener('keyup', keyUpHandler);
});

onBeforeUnmount(() => {
    document.removeEventListener('keyup', keyUpHandler);
});
</script>

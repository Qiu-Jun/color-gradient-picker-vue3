<template>
    <Area
        :red="state.colorRed"
        :green="state.colorGreen"
        :blue="state.colorBlue"
        :alpha="state.colorAlpha"
        :hue="state.colorHue"
        :saturation="state.colorSaturation"
        :value="state.colorValue"
        :update-color="updateColor"
        :is-gradient="false"
    />

    <Preview
        :red="state.colorRed"
        :green="state.colorGreen"
        :blue="state.colorBlue"
        :alpha="state.colorAlpha"
        :update-color="updateColor"
    />
</template>

<script lang="ts" setup name="Solid">
import { reactive, onMounted, computed, watch } from 'vue';
import Area from '../Area/index.vue';
import Preview from '../Preview/index.vue';
import { rgbToHsv, getRightValue, generateSolidStyle } from '@l/helpers/index';
import type { IProvideData } from '@l/types';

interface Iprops {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    hue: number;
    saturation: number;
    value: number;
}

const props = withDefaults(defineProps<Iprops>(), {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
    hue: 0,
    saturation: 0,
    value: 0,
});

const provideData = inject('provideData') as IProvideData;

const state = reactive({
    colorRed: props.red,
    colorGreen: props.green,
    colorBlue: props.blue,
    colorAlpha: props.alpha,
    colorHue: 0,
    colorSaturation: 100,
    colorValue: 100,
});
const actionsMap = {
    onStartChange: provideData.onStartChange,
    onChange: provideData.onChange,
    onEndChange: provideData.onEndChange,
};

const hsv = computed(() => {
    if (
        props.hue === undefined ||
        props.saturation === undefined ||
        props.value === undefined
    ) {
        return rgbToHsv({
            red: props.red,
            green: props.green,
            blue: props.blue,
        });
    }

    return {
        hue: props.hue,
        saturation: props.saturation,
        value: props.value,
    };
});

const color = computed(() => {
    return {
        red: props.red,
        green: props.green,
        blue: props.blue,
        alpha: props.alpha,
    };
});

// 是否.value
watch(
    () => hsv.value,
    (newVal) => {
        const { hue, saturation, value } = newVal;
        state.colorHue = hue;
        state.colorSaturation = saturation;
        state.colorValue = value;
    },
);

watch(
    () => color.value,
    (newVal) => {
        const { red, green, blue, alpha } = newVal;
        state.colorRed = red;
        state.colorGreen = green;
        state.colorBlue = blue;
        state.colorAlpha = alpha;
    },
);

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
    state.colorRed = red;
    state.colorGreen = green;
    state.colorBlue = blue;
    state.colorAlpha = alpha;
    state.colorHue = hue;
    state.colorSaturation = saturation;
    state.colorValue = value;

    const action = actionsMap[actionName];

    action &&
        action({
            red,
            green,
            blue,
            alpha,
            hue,
            saturation,
            value,
            style: generateSolidStyle(red, green, blue, alpha),
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
});
</script>

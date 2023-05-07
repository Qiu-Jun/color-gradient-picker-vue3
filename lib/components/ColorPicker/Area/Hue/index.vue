<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 19:38:04
 * @LastEditors: June
 * @LastEditTime: 2023-05-08 00:00:37
-->
<template>
    <div class="hue" @mousedown="state.mouseEvents">
        <div ref="hueRef" class="hue-area">
            <div class="picker-pointer" :style="pointerStyle" />
        </div>
    </div>
</template>

<script lang="ts" setup name="Hue">
import { ref, reactive, onMounted, computed } from 'vue';
import { getHue } from '@l/helpers';
import { useMouseEvents } from '@l/hooks';

const props: any = defineProps({
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function,
});

const hueRef = ref<HTMLElement | null>(null);

const state = reactive<{ width: number; mouseEvents: any }>({
    width: 0,
    mouseEvents: () => false,
});

const offsetLeft = computed(() => (((props.hue * state.width) / 360) | 0) - 6);

const pointerStyle = computed(() => {
    return {
        left: `${offsetLeft.value}px`,
    };
});

const mouseDownHandler = (event) => {
    const elementX = event.currentTarget.getBoundingClientRect().x;
    const startX = event.pageX;
    const positionX = startX - elementX;
    const color = getHue(positionX, state.width, props.saturation, props.value);

    props.updateColor(color, 'onStartChange');

    return {
        startX,
        positionX,
    };
};

const changeObjectPositions = (event, { startX, positionX }) => {
    const moveX = event.pageX - startX;
    positionX += moveX;

    // update value and saturation
    const offsetX =
        positionX > state.width ? state.width : positionX <= 0 ? 0 : positionX;
    const color = getHue(offsetX, state.width, props.saturation, props.value);

    return {
        positions: {
            positionX,
            startX: event.pageX,
        },
        color,
    };
};

const mouseMoveHandler = (event, { startX, positionX }) => {
    const { positions, color } = changeObjectPositions(event, {
        startX,
        positionX,
    });

    props.updateColor(color, 'onChange');

    return positions;
};

const mouseUpHandler = (event, { startX, positionX }) => {
    const { positions, color } = changeObjectPositions(event, {
        startX,
        positionX,
    });

    props.updateColor(color, 'onEndChange');

    return positions;
};

onMounted(() => {
    hueRef.value && (state.width = hueRef.value.clientWidth);
    state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
    );
});
</script>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 19:47:22
 * @LastEditors: June
 * @LastEditTime: 2023-04-28 11:30:48
-->
<template>
    <div
        ref="pickerAreaRef"
        class="picking-area"
        :style="pickerStyle"
        @mousedown="state.mouseEvents"
    >
        <div class="picking-area-overlay1">
            <div class="picking-area-overlay2">
                <div class="picker-pointer" :style="pointerStyle" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="Picker">
import { ref, reactive, onMounted, computed } from 'vue';
import { getRgbByHue, changePicker } from '../../../../helpers/index';
import { useMouseEvents } from '../../../../hooks/index';

const props: any = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function,
});

const pickerAreaRef = ref<HTMLElement | null>(null);

const state: any = reactive({
    width: 0,
    height: 0,
    mouseEvents: () => false,
});

const offsetLeft = computed(
    () => (((props.saturation * state.width) / 100) | 0) - 6,
);

const offsetTop = computed(
    () => ((state.height - (props.value * state.height) / 100) | 0) - 6,
);

const pointerStyle = computed(() => {
    return {
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        left: `${offsetLeft.value}px`,
        top: `${offsetTop.value}px`,
    };
});

const pickerStyle = computed(() => {
    const { red, green, blue } = getRgbByHue(props.hue);

    return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
});

const mouseDownHandler = (event) => {
    const _pickerAreaRef = pickerAreaRef?.value;
    if (!_pickerAreaRef) return;
    const { x: elementX, y: elementY } = _pickerAreaRef.getBoundingClientRect();
    const startX = event.pageX;
    const startY = event.pageY;
    const positionX = startX - elementX;
    const positionY = startY - elementY;
    const color = changePicker(
        positionX,
        positionY,
        state.height,
        state.width,
        props.hue,
    );

    props.updateColor(color, 'onStartChange');
    return {
        startX,
        startY,
        positionX,
        positionY,
    };
};

const changeObjectPositions = (
    event,
    { startX, startY, positionX, positionY },
) => {
    const moveX = event.pageX - startX;
    const moveY = event.pageY - startY;
    positionX += moveX;
    positionY += moveY;

    const color = changePicker(
        positionX,
        positionY,
        state.height,
        state.width,
        props.hue,
    );

    return {
        positions: {
            positionX,
            positionY,
            startX: event.pageX,
            startY: event.pageY,
        },
        color,
    };
};

const mouseMoveHandler = (event, { startX, startY, positionX, positionY }) => {
    const { positions, color } = changeObjectPositions(event, {
        startX,
        startY,
        positionX,
        positionY,
    });

    props.updateColor(color, 'onChange');

    return positions;
};

const mouseUpHandler = (event, { startX, startY, positionX, positionY }) => {
    const { positions, color } = changeObjectPositions(event, {
        startX,
        startY,
        positionX,
        positionY,
    });

    props.updateColor(color, 'onEndChange');

    return positions;
};

onMounted(() => {
    const _pickerAreaRef = pickerAreaRef?.value;

    if (_pickerAreaRef) {
        state.width = _pickerAreaRef.clientWidth;
        state.height = _pickerAreaRef.clientHeight;
    }

    state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
    );
});
</script>

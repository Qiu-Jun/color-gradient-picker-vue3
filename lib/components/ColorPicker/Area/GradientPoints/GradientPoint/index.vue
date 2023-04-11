<template>
    <div
        :class="`picker-pointer${activeClassName}`"
        :style="pointStyle"
        @mousedown="state.mouseEvents"
        @dblclick="() => removePoint(index)"
        @click.stop
    >
        <span :class="`child-point${activeClassName}`" />
    </div>
</template>

<script setup name="GradientPoint">
import { onMounted, reactive, computed } from 'vue';
import { useMouseEvents } from '@c/hooks/index';
import { updateGradientActivePercent } from '@c/helpers/index';

const props = defineProps({
    point: Object,
    activePointIndex: Number,
    index: Number,
    width: Number,
    positions: Object,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    removePoint: Function,
});

// 得处理
const state = reactive({
    mouseEvents: () => false,
});

const activeClassName = computed(() =>
    props.activePointIndex === props.index ? ' active' : '',
);

const pointStyle = computed(() => {
    return { left: `${props.point.left * (props.width / 100) - 6}px` };
});

const mouseDownHandler = (event) => {
    props.changeActivePointIndex(props.index);

    const startX = event.pageX;
    const startY = event.pageY;
    const offsetX = startX - props.positions.x;

    props.updateGradientLeft(props.point.left, props.index, 'onStartChange');

    return {
        startX,
        startY,
        offsetX,
    };
};

const changeObjectPositions = (event, { startX, offsetX }) => {
    const moveX = event.pageX - startX;
    offsetX += moveX;
    // update point percent
    const left = updateGradientActivePercent(offsetX, props.width);

    return {
        positions: {
            offsetX,
            startX: event.pageX,
        },
        left,
    };
};
const mouseMoveHandler = (event, { startX, offsetX }) => {
    const { positions, left } = changeObjectPositions(event, {
        startX,
        offsetX,
    });

    props.updateGradientLeft(left, props.index, 'onChange');

    return positions;
};

const mouseUpHandler = (event, { startX, offsetX }) => {
    const { positions, left } = changeObjectPositions(event, {
        startX,
        offsetX,
    });

    props.updateGradientLeft(left, props.index, 'onEndChange');

    return positions;
};

onMounted(() => {
    state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
    );
});
</script>

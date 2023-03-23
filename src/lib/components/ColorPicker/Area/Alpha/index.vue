<template>
    <div class="alpha" @mousedown="state.mouseEvents">
        <div class="gradient" :style="style" />
        <div class="alpha-area">
            <div ref="alphaMaskRef" class="alpha-mask">
                <div class="picker-pointer" :style="pointerStyle" />
            </div>
        </div>
    </div>
</template>

<script setup name="alpha">
import { ref, reactive, onMounted, computed } from 'vue';
import { getAlpha } from '@/lib/helpers/index';
import { useMouseEvents } from '@/lib/hooks/index';

const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});
const alphaMaskRef = ref(null);
const state = reactive({
    width: 0,
    mouseEvents: () => false,
});

const offsetLeft = computed(() => {
    return ((props.alpha * state.width) | 0) - 6;
});
const pointerStyle = computed(() => {
    return { left: `${offsetLeft.value}px` };
});
const style = computed(() => {
    return {
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${props.red}, ${props.green}, ${props.blue}))`,
    };
});

const mouseDownHandler = (event) => {
    const elementX = event.currentTarget.getBoundingClientRect().x;
    const startX = event.pageX;
    const positionX = startX - elementX;

    props.updateColor(
        { alpha: getAlpha(positionX, state.width) },
        'onStartChange',
    );

    return {
        startX,
        positionX,
    };
};

const changeObjectPositions = (event, { startX, positionX }) => {
    const moveX = event.pageX - startX;
    positionX += moveX;

    const alpha = getAlpha(positionX, state.width);

    return {
        positions: {
            positionX,
            startX: event.pageX,
        },
        alpha,
    };
};

const mouseMoveHandler = (event, { startX, positionX }) => {
    const { positions, alpha } = changeObjectPositions(event, {
        startX,
        positionX,
    });

    props.updateColor({ alpha }, 'onChange');

    return positions;
};

const mouseUpHandler = (event, { startX, positionX }) => {
    const { positions, alpha } = changeObjectPositions(event, {
        startX,
        positionX,
    });

    props.updateColor({ alpha }, 'onEndChange');

    return positions;
};

onMounted(() => {
    const _alphaMaskRef = alphaMaskRef.value;
    if (_alphaMaskRef) {
        state.width = _alphaMaskRef.clientWidth;
    }

    state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
    );
});
</script>

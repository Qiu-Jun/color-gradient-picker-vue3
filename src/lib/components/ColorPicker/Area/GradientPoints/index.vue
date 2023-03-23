<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 19:01:24
 * @LastEditors: June
 * @LastEditTime: 2023-03-23 22:53:51
-->
<template>
    <div class="gradient" :style="pointsStyle" @click="pointsContainerClick">
        <div ref="pointsContainerRef" class="gradient-slider-container">
            <GradientPoint
                v-for="(point, index) in props.points"
                :key="index"
                :active-point-index="props.activePointIndex"
                :index="index"
                :point="point"
                :width="state.width"
                :positions="state.positions"
                :change-active-point-index="props.changeActivePointIndex"
                :update-gradient-left="updateGradientLeft"
                :remove-point="props.removePoint"
            />
        </div>
    </div>
</template>

<script setup name="GradientPoints">
import { ref, reactive, onMounted, computed } from 'vue';
import GradientPoint from './GradientPoint';
import {
    generateGradientStyle,
    updateGradientActivePercent,
} from '@/lib/helpers/index';

const props = defineProps({
    points: Array,
    activePointIndex: Number,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function,
});

const pointsContainerRef = ref(null);

const state = reactive({
    width: 0,
    positions: { x: 0, y: 0 },
});

const pointsStyle = computed(() => {
    const style = generateGradientStyle(props.points, 'linear', 90);

    return { background: style };
});

const pointsContainerClick = (event) => {
    const left = updateGradientActivePercent(
        event.pageX - state.positions.x,
        state.width,
    );

    props.addPoint(left);
};

onMounted(() => {
    const pointer = pointsContainerRef.value;
    if (pointer) {
        state.width = pointer.clientWidth;
        const pointerPos = pointer.getBoundingClientRect();
        state.positions = { x: pointerPos.x, y: pointerPos.y };
    }
});
</script>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-19 20:10:16
 * @LastEditors: June
 * @LastEditTime: 2023-03-23 22:18:41
-->
<template>
    <div class="gradient-controls">
        <div class="gradient-type">
            <div
                :class="`gradient-type-item liner-gradient ${
                    props.type === 'linear' ? 'active' : ''
                }`"
                @click="() => changeGradientControl({ type: 'linear' })"
            />
            <div
                :class="`gradient-type-item radial-gradient ${
                    props.type === 'radial' ? 'active' : ''
                }`"
                @click="() => changeGradientControl({ type: 'radial' })"
            />
        </div>
        <div v-if="props.type === 'linear'" class="gradient-degrees-options">
            <div
                class="gradient-degrees"
                @mousedown="mouseEvents"
                @click="onClickGradientDegree"
            >
                <div class="gradient-degree-center" :style="degreesStyle">
                    <div class="gradient-degree-pointer" />
                </div>
            </div>
            <div class="gradient-degree-value">
                <p>{{ props.degree }}&#176;</p>
            </div>
        </div>
    </div>
</template>

<script setup name="GradientControls">
import { reactive, onMounted, computed } from 'vue';
import { useMouseEvents } from '@/lib/hooks/index';
import { calculateDegree } from '@/lib/helpers/index';

const props = defineProps({
    type: String,
    degree: Number,
    changeGradientControl: {
        type: Function,
        default: () => false,
    },
});

const state = reactive({
    disableClick: false,
    mouseEvents: () => false,
});

const degreesStyle = computed(() => {
    return { transform: `rotate(${props.degree}deg)` };
});

const mouseDownHandler = (event) => {
    const pointer = event.target;
    const pointerBox = pointer.getBoundingClientRect();
    const centerY = pointerBox.top + parseInt(8 - window.pageYOffset, 10);
    const centerX = pointerBox.left + parseInt(8 - window.pageXOffset, 10);

    return {
        centerY,
        centerX,
    };
};
const mouseMoveHandler = (event, { centerX, centerY }) => {
    state.disableClick = true;

    const newDegree = calculateDegree(
        event.clientX,
        event.clientY,
        centerX,
        centerY,
    );

    props.changeGradientControl({ degree: parseInt(newDegree, 10) });
};

const mouseUpHandler = (event) => {
    const targetClasses = event.target.classList;

    if (
        targetClasses.contains('gradient-degrees') ||
        targetClasses.contains('icon-rotate')
    ) {
        return;
    }

    state.disableClick = false;
};

const onClickGradientDegree = () => {
    if (state.disableClick) {
        state.disableClick = false;
        return;
    }

    let gradientDegree = props.degree + 45;

    if (gradientDegree >= 360) {
        gradientDegree = 0;
    }

    props.changeGradientControl({ degree: parseInt(gradientDegree, 10) });
};

onMounted(() => {
    state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
    );
});
</script>

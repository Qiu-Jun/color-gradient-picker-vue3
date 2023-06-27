<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 11:49:39
-->
<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <div>
            <ColorPicker :color="color" @on-change="onChange" />
        </div>
        <div>
            <ColorPicker
                :is-gradient="true"
                :on-start-change="(color: Iattrs) => onChange1(color, 'start')"
                :on-change="(color: Iattrs) => onChange1(color, 'change')"
                :on-end-change="(color: Iattrs) => onChange1(color, 'end')"
                @on-change="onChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import ColorPicker from '../components/ColorPicker/index.vue';
import '../index.scss';
interface IPoitItem {
    alpha?: number | string;
    blue?: number | string;
    green?: number | string;
    left?: number | string;
    red?: number | string;
}

interface Iattrs {
    degree: number;
    points: [IPoitItem];
    style: string;
    type: string;
}

const color: Ref<IPoitItem | Iattrs> = ref({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
});

const onChange = (e) => {
    console.log(e);
};

const onChange1 = (attrs: Iattrs, name: string) => {
    color.value = { ...attrs };
    console.log(attrs);
};
</script>

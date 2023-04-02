<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 18:23:07
-->
<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <div>
            <ColorPicker
                :color="color"
                :on-start-change="(color: Iattrs) => onChange(color, 'start')"
                :on-change="(color: Iattrs) => onChange(color, 'change')"
                :on-end-change="(color: Iattrs) => onChange(color, 'end')"
            />
        </div>
        <div>
            <ColorPicker
                :is-gradient="true"
                :on-start-change="(color: Iattrs) => onChange(color, 'start')"
                :on-change="(color: Iattrs) => onChange(color, 'change')"
                :on-end-change="(color: Iattrs) => onChange(color, 'end')"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { ColorPicker } from './lib/index';

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

const onChange = (attrs: Iattrs, name: string) => {
    color.value = { ...attrs };
};
</script>

<style src="@/lib/index.scss" lang="scss" />

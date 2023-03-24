<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-03-24 02:29:10
-->
<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <div>
            <ColorPicker
                :color="color"
                :on-start-change="(color) => onChange(color, 'start')"
                :on-change="(color) => onChange(color, 'change')"
                :on-end-change="(color) => onChange(color, 'end')"
            />
        </div>
        <div>
            <ColorPicker
                :is-gradient="true"
                :on-start-change="(color) => onChange(color, 'start')"
                :on-change="(color) => onChange(color, 'change')"
                :on-end-change="(color) => onChange(color, 'end')"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ColorPicker } from './lib/index';

const color = ref({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
});

const onChange = (attrs, name) => {
    color.value = { ...attrs };
};
</script>

<style src="@/lib/index.scss" lang="scss" />

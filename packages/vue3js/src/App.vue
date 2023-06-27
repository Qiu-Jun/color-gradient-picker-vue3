<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 12:42:11
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
import ColorPicker from 'color-gradient-picker-vue3';
import 'color-gradient-picker-vue3/dist/style.css';

const color = ref({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
});

const onChange = (attrs, name) => {
    color.value = { ...attrs };
    console.log(color.value);
};
</script>

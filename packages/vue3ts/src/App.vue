<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 22:53:42
-->
<template>
    <div id="app" :style="{ display: 'flex', textAlign: 'center' }">
        <div>
            <ColorPicker
                :color="color"
                @on-change="onChange"
                @on-cancel="onCancel"
            />
        </div>
        <div>
            <ColorPicker
                :is-gradient="true"
                @on-change="onChange"
                @on-cancel="onCancel"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ColorPicker from 'color-gradient-picker-vue3';
import 'color-gradient-picker-vue3/dist/style.css';

const color = ref({
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
});

const onCancel = () => {
    console.log('取消');
};

const onChange = (attrs) => {
    color.value = { ...attrs };
};
</script>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-17 23:48:15
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 22:53:14
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
import ColorPicker from '../components/ColorPicker/index.vue';
import '../index.scss';

const color = {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
};

const onCancel = () => {
    console.log('取消');
};

const onChange = (e) => {
    console.log(e);
};
</script>

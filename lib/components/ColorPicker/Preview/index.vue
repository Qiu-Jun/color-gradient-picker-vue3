<!--
 * @Author: June
 * @Description: 
 * @Date: 2023-04-08 22:26:19
 * @LastEditors: June
 * @LastEditTime: 2023-04-27 12:22:10
-->
<template>
    <div class="color-preview-area">
        <div class="input-group">
            <Hex
                :red="props.red"
                :green="props.green"
                :blue="props.blue"
                :update-color="props.updateColor"
            />
            <RGB
                :red="props.red"
                :green="props.green"
                :blue="props.blue"
                :alpha="props.alpha"
                :update-color="props.updateColor"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Hex from './Hex/index.vue';
import RGB from './RGB/index.vue';

interface Iprops {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    updateColor: (data: any) => void;
}

const props = withDefaults(defineProps<Iprops>(), {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0,
    updateColor: (data: any) => false,
});
</script>

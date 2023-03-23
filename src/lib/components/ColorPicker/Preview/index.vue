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

<script setup>
import Hex from './Hex/index.vue';
import RGB from './RGB/index.vue';
const props = defineProps({
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function,
});
</script>

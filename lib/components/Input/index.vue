<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-23 22:20:33
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 15:05:22
-->
<template>
    <div :class="`input-field ${props.classes}`">
        <div class="input-container">
            <input
                v-model="value"
                :class="`${props.type}-input input`"
                @focus="props.onFocus"
                @blur="props.onBlur"
                @input="onInput"
            />
        </div>
        <div class="label">
            {{ label }}
        </div>
    </div>
</template>

<script lang="ts" setup name="Input">
import { computed, watch } from 'vue';

interface Iprops {
    value: string | number;
    label: string;
    type?: string;
    classes: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const props = withDefaults(defineProps<Iprops>(), {
    value: '',
    label: '',
    type: 'text',
    classes: '',
    onFocus: (): void => {},
    onBlur: (): void => {},
});

const emits = defineEmits(['input', 'update:value']);

const value = computed({
    get: () => props.value,
    set: (val) => emits('update:value', val),
});

const onInput = (e: InputEvent) => {
    emits('input', e);
};
</script>

<style lang="scss" scoped>
.input-field {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    flex-direction: column;

    .label {
        font-size: 12px;
        line-height: 15px;
        font-weight: 600;
        margin-top: 6px;
        margin-bottom: 0;
        color: #1f2667;
    }

    .input-container {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        border-radius: 6px;
        color: #28314d;

        .input {
            width: 100%;
            outline: 0;
            color: #1f2667;
            border-radius: inherit;
            border: 1px solid #bbbfc5;
            height: 24px;
            font-size: 12px;
            font-weight: 600;
            padding: 0 6px;
        }
    }
}
</style>

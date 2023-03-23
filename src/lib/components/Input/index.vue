<!--
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-23 22:20:33
 * @LastEditors: June
 * @LastEditTime: 2023-03-24 00:57:53
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

<script setup name="Input">
import { computed } from 'vue';

const props = defineProps({
    value: {
        type: [String, Number],
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    classes: {
        type: String,
        default: '',
    },
    onFocus: {
        type: Function,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        default: () => {},
    },
    onBlur: {
        type: Function,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        default: () => {},
    },
});

const emits = defineEmits(['input', 'update:value']);

const value = computed({
    get: () => props.value,
    set: (val) => emits('update:value', val),
});

const onInput = (e) => {
    emits('input', e);
};

// watch(
//     () => [props.colorValue, value.value],
//     (val) => {
//         console.log(val);
//     },
// );
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

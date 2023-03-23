<template>
    <Teleport :to="props.appendTo" :disabled="!props.appendTo">
        <Transition name="ie-dialog" appear>
            <div
                v-if="props.modelValue"
                ref="dialogRef"
                class="ie-dialog-wrapper"
                :style="style"
                :class="{
                    'append-to-body': props.appendTo === 'body',
                    'is-middle': props.isMiddle,
                    'is-pointer-events-none': props.isPointerEventsNone,
                }"
            >
                <div
                    v-if="props.hasMask"
                    class="ie-dialog-mask"
                    @click="onMaskClick"
                ></div>

                <div
                    ref="model"
                    class="ie-dialog"
                    :style="{ width: props.width }"
                >
                    <!-- header -->
                    <div v-if="!props.hideHeader" class="ie-dialog--header">
                        <div class="ie-dialog--title">
                            {{ props.title }}
                        </div>

                        <button
                            v-if="!props.hideCloseButton"
                            class="ie-dialog--close-btn"
                            @click="onClickClose"
                        >
                            <svg viewBox="0 0 320 512">
                                <path
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- body -->
                    <div class="ie-dialog--body">
                        <slot />
                    </div>

                    <!-- footer -->
                    <div class="ie-dialog--footer">
                        <button
                            class="ie-dialog--cancel-btn"
                            @click="onClickClose"
                        >
                            取消
                        </button>
                        <button
                            class="ie-dialog--confirm-btn"
                            @click="onClickConfirm"
                        >
                            确认
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import {
    ref,
    watch,
    PropType,
    StyleValue,
    computed,
    RendererElement,
    onMounted,
} from 'vue';
const props = defineProps({
    appendTo: {
        type: [String, Object, null, undefined] as PropType<
            string | RendererElement | null | undefined
        >,
        default: 'body',
    },
    modelValue: Boolean,
    title: {
        type: String,
        default: '编辑图片',
    },
    class: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '400px',
    },
    zIndex: {
        type: Number,
        default: 1,
    },
    padding: {
        type: String,
        default: '15px',
    },
    top: {
        type: String,
        default: '0px',
    },
    isMiddle: {
        type: Boolean,
        default: true,
    },
    hideHeader: {
        type: Boolean,
        default: false,
    },
    hasMask: {
        type: Boolean,
        default: true,
    },
    hideCloseButton: {
        type: Boolean,
        default: false,
    },
    canClickMaskClose: {
        type: Boolean,
        default: false,
    },
    isPointerEventsNone: Boolean, // 包裹部分是否支持指针穿透
    beforeClose: Function as PropType<(cb: (ok: boolean) => void) => void>,
});
const emits = defineEmits(['update:modelValue', 'open', 'close', 'onConfirm']);
const visible = ref(props.modelValue);
const close = () => {
    if (typeof props.beforeClose === 'function') {
        props.beforeClose((ok) => {
            if (ok) visible.value = false;
        });
    } else {
        visible.value = false;
    }
};
const show = () => (visible.value = true);
const onClickClose = () => {
    close();
};
const onClickConfirm = () => {
    emits('onConfirm');
};
const onMaskClick = () => {
    if (props.canClickMaskClose) {
        close();
    }
};
const style = computed<StyleValue>(() => {
    const o: StyleValue = {
        zIndex: props.zIndex as number,
    };
    if (props.padding) {
        o['--dialog-padding'] = props.padding;
    }
    if (props.top) {
        o['--dialog-top'] = props.top;
    }
    return o;
});
watch(visible, (v) => {
    if (v !== props.modelValue) {
        emits('update:modelValue', v);
    }

    if (v) {
        emits('open');
    } else {
        emits('close');
    }
});

watch(
    () => props.modelValue,
    (v) => {
        visible.value = v;
    },
);

onMounted(() => {
    if (visible.value) {
        emits('open');
    }
});

defineExpose({ close, show });
</script>

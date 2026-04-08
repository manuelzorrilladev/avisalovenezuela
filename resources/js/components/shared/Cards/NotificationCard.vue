<script setup lang="ts">
import { CheckCircle2Icon, XIcon } from 'lucide-vue-next';
import { ref, watch, onUnmounted, nextTick } from 'vue';

const props = defineProps({
    duration: { type: Number, default: 5000 },
    show: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const isVisible = ref(false);
const percentage = ref(100);
let timer: any = null;
let progressTimer: any = null;

const clearTimers = () => {
    if (timer) clearTimeout(timer);
    if (progressTimer) clearInterval(progressTimer);
};

const startToast = () => {
    clearTimers();
    percentage.value = 100;
    
    isVisible.value = true;

    const interval = 10;
    const step = (interval / props.duration) * 100;

    progressTimer = setInterval(() => {
        percentage.value -= step;
    }, interval);

    timer = setTimeout(() => {
        closeToast();
    }, props.duration);
};

const closeToast = () => {
    isVisible.value = false;
    setTimeout(() => {
        clearTimers();
        emit('close');
    }, 300);
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        nextTick(() => startToast());
    } else {
        isVisible.value = false;
        clearTimers();
    }
}, { immediate: true });

onUnmounted(() => clearTimers());
</script>

<template>
    <Transition
        enter-active-class="transform transition duration-300 ease-custom"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-4 opacity-0"
    >
        <div
            v-if="isVisible"
            class="fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col overflow-hidden rounded-lg border border-primary/20 bg-white shadow-2xl"
        >
            <div class="flex items-start gap-3 p-4">
                <CheckCircle2Icon class="h-6 w-6 shrink-0 text-primary" />
                
                <div class="flex-1 min-w-0">
                    <h2 class="font-brand text-sm font-bold text-gray-900">
                        <slot name="title">¡Éxito!</slot>
                    </h2>
                    <p class="mt-1 text-xs text-gray-500 italic">
                        <slot name="description"></slot>
                    </p>
                </div>

                <button @click="closeToast" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <XIcon class="h-4 w-4" />
                </button>
            </div>

            <div class="h-1.5 w-full bg-gray-100">
                <div
                    class="h-full bg-primary transition-all ease-linear"
                    :style="{ 
                        width: `${percentage}%`,
                        transitionDuration: '10ms' 
                    }"
                ></div>
            </div>
        </div>
    </Transition>
</template>


<style scoped>
/* Curva de entrada más elegante tipo "spring" */
.ease-custom {
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
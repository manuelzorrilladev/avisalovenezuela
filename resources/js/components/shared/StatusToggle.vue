<script setup lang="ts">
import { computed } from 'vue';

// --- PROPS Y EMITS ---
const props = withDefaults(
    defineProps<{
        modelValue: 'todos' | 'asignados';
    }>(),
    {
        modelValue: 'todos',
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: 'todos' | 'asignados'): void;
}>();

// Estado booleano interno para animación/posicionamiento
const isAsignados = computed({
    get: () => props.modelValue === 'asignados',
    set: (val: boolean) => {
        emit('update:modelValue', val ? 'asignados' : 'todos');
    },
});

const toggle = () => {
    isAsignados.value = !isAsignados.value;
};
</script>

<template>
    <div class="inline-flex items-center gap-3 select-none">
        <span
            @click="emit('update:modelValue', 'todos')"
            class="text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200"
            :class="!isAsignados ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'"
        >
            Todos
        </span>

        <button
            type="button"
            role="switch"
            :aria-checked="isAsignados"
            @click="toggle"
            class="relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border border-primary/30 bg-secondary-background/80 p-0.5 shadow-inner backdrop-blur-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
            <span
                class="pointer-events-none inline-block size-5.5 rounded-full bg-primary shadow-md transform ring-0 transition duration-200 ease-in-out"
                :class="isAsignados ? 'translate-x-6' : 'translate-x-0'"
            />
        </button>

        <span
            @click="emit('update:modelValue', 'asignados')"
            class="text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200"
            :class="isAsignados ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'"
        >
            Asignados
        </span>
    </div>
</template>
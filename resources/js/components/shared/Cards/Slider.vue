<script setup lang="ts">
import { ref } from 'vue';

const { items } = defineProps(['items']);
const counter = ref(0);
</script>

<template>
    <section class="flex flex-col md:flex-row justify-around p-4 gap-8 md:gap-0">
        <div
            class="flex h-72 md:h-110 w-72 md:w-110 items-center justify-center overflow-hidden border border-primary rounded bg-muted-foreground"
        >
            <img
                :src="`/storage/${items[counter].path}`"
                alt=""
                class="w-full"
            />
        </div>
        <div class="flex md:flex-col md:h-110 justify-between ">
            <button v-for="(value,key) in items" :key="key" @click="counter = Number(key)" class="w-10 md:w-20 h-10 md:h-20 overflow-hidden  border-primary rounded bg-muted-foreground cursor-pointer duration-200" :class="counter == key?'border-2':'border-[0.5px]'" >
                <img
                    :src="`/storage/${value.path}`"
                    alt=""
                    class="w-full"
                />
            </button>
        </div>
    </section>
</template>

<style scoped></style>

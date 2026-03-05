<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import type { PublicationCardType } from '@/types/publication';

defineProps<{
    publication?: PublicationCardType,
    isLoading:boolean,
    keepTag?:boolean
}>()


</script>

<template>
      <div v-if="isLoading" class="w-96 h-fit overflow-hidden rounded-lg bg-secondary-background shadow-lg shadow-primary/30 border animate-pulse">
        <div class="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>

        <div class="p-2 mb-2">
            <div class="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
            <div class="h-3 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div class="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
    </div>
     <Link :href="`/anuncio/${publication?.slug}`" v-else class="w-11/12 md:w-100 hover:scale-105 duration-200 h-fit overflow-hidden rounded-lg  bg-secondary-background shadow-lg shadow-primary/30 border">
        <div class="w-full   h-48 flex items-center overflow-hidden">
            <img :src="`/storage/${publication?.images[0].path}`" alt="" class="w-full">
        </div>

        <header class="p-2 mb-2">
            <p v-if="keepTag" class="text-xs ">En: {{ publication?.category.name }}</p>
            <h2 class="text-lg font-brand">{{publication?.name}}</h2>
            <p class="text-xs font-light pb-2">{{publication?.description}}</p>
            <Link :href="`/anuncio/${publication?.id}`" class="bg-primary dark:bg-black  hover:bg-white dark:hover:bg-white  text-black dark:text-primary px-3 py-2 rounded-lg text-sm flex items-center gap-1 hover:gap-2 w-fit border border-primary  dark:border-black duration-200 hover:font-semibold">
                Ver más
                <ArrowRight class=""/>
            </Link>
        
        </header>
    </Link >
</template>

<style scoped>

</style>


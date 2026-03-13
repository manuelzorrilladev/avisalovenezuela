<script setup lang="ts">
import { Deferred } from '@inertiajs/vue3';
import { useWindowScroll } from '@vueuse/core';
import { reactive } from 'vue';
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
import SidebarCard from '@/components/shared/Cards/SidebarCard.vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { PublicationCardType } from '@/types/publication';
const { y } = useWindowScroll();

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        publications: PublicationCardType[];
        isEmpty: boolean;
    }>(),
    {
        canRegister: true,
        title: 'Inicio',
        description:
            'Consigue todo aquello que necesitas o publica tus bienes y servicios a un publico masivo en Avisalo',
        url: '/',
        image: '/assets/img/avisalo.png',
    },
);

const filterParams = reactive({
    minPrice: 0,
    maxPrice: 0,
    city: 'All',
    state: 'All',
    condition: 'All',
    search: '',
});


</script>

<template>
    <CustomLayout ref="layoutRef" v-bind="props">
        <main
            class="relative flex w-full flex-col justify-center gap-10 px-4 pt-6 md:flex-row md:px-10"
        >
            <div class="x relative md:w-[28.3%]">
                <SidebarCard
                    v-model="filterParams"
                    :class="
                        y > 63
                            ? 'md:fixed md:top-6 md:w-1/4'
                            : 'md:relative md:w-full'
                    "
                />
            </div>
            <section class="relative w-full pb-10 md:w-3/4">
                <h3 ref="el" class="pb-4 text-center font-brand text-2xl">
                    {{ title }}
                </h3>
                <div
                    class="grid grid-cols-1 place-content-center place-items-center gap-6 lg:grid-cols-2"
                >
                    <Deferred data="publications">
                        <template #fallback>
                            <PublicationCard
                                v-for="item in 6"
                                :key="item"
                                :is-loading="true"
                                :keep-tag="false"
                            />
                        </template>
                        <PublicationCard
                            v-for="item in publications"
                            :key="item.id"
                            :publication="item"
                            :is-loading="false"
                            :keep-tag="false"
                        />
                    </Deferred>
                </div>
                <div
                    v-if="isEmpty"
                    class="flex h-96 items-center justify-center text-xl font-bold text-foreground"
                >
                    <h2>No se encontraron resultados :(</h2>
                </div>
            </section>
        </main>
    </CustomLayout>
</template>

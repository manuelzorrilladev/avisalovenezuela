<script setup lang="ts">
import { Deferred, usePage } from '@inertiajs/vue3';
import { useWindowScroll, useWindowSize } from '@vueuse/core';
import { computed, ref } from 'vue';
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
import SidebarCard from '@/components/shared/Cards/SidebarCard.vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { PublicationCardType } from '@/types/publication';
const { y } = useWindowScroll();
interface FilterType {
    category: string;
    sub_category: string;
}

const { width } = useWindowSize();
const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        publications: PublicationCardType[];
        isEmpty:boolean;
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

const filters = usePage().props.currentFilters as FilterType;
const sectionTitle = computed(() => {
    let title: string = filters.category;
    if (filters['sub_category']) {
        title = `${title} - ${filters['sub_category']}`;
    }
    return title;
});

const layoutRef = ref<InstanceType<typeof CustomLayout> | null>(null);
function changeModal() {
    if (layoutRef.value) {
        layoutRef.value.changeModalState();
    } else {
        console.error('El Layout aún no está listo o no se encontró la ref');
    }
}
</script>

<template>
    <CustomLayout ref="layoutRef" v-bind="props">
        <main
            class="relative flex w-full flex-col justify-center gap-10 px-4 pt-6 md:flex-row md:px-10"
        >
            <div class="x relative md:w-[28.3%]" @click="changeModal">
                <SidebarCard
                    v-if="width > 768"
                    :class="y > 63 ? 'fixed top-6 w-1/4' : 'relative w-full'"
                />
                <SidebarCard v-else />'
                <div class="absolute top-0 z-20 h-full w-full"></div>
            </div>
            <section class="relative w-full pb-10 md:w-3/4">
                <h3 ref="el" class="pb-4 text-center font-brand text-2xl">
                    {{ sectionTitle }}
                </h3>
                <div
                    class="grid grid-cols-1 place-content-center place-items-center gap-6 xl:grid-cols-2"
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
                        <template
                            v-if="publications && publications.length > 0"
                        >
                            <PublicationCard
                                v-for="item in publications"
                                :key="item.id"
                                :publication="item"
                                :is-loading="false"
                                :keep-tag="false"
                            />
                        </template>
                    </Deferred>
                </div>
                <div class="flex items-center justify-center font-bold text-xl text-foreground h-96">
                    <h2>No se encontraron resultados :(</h2>
                
                </div>
            </section>
        </main>
    </CustomLayout>
</template>

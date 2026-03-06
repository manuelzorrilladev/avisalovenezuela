<script setup lang="ts">
import { Deferred, usePage } from '@inertiajs/vue3';
import {  useWindowScroll, useWindowSize } from '@vueuse/core';
import { computed, ref } from 'vue';
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
import SidebarCard from '@/components/shared/Cards/SidebarCard.vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { PublicationCardType } from '@/types/publication';
const {  y } = useWindowScroll()
interface FilterType {
    category:string;
    sub_category:string;
}

const { width } = useWindowSize()
const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        publications: PublicationCardType[];
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

const filters = usePage().props.currentFilters as FilterType
const sectionTitle= computed(()=>{
    let title:string = filters.category
    if(filters['sub_category'] ){
        title = `${title} - ${filters['sub_category']}`
    }
    return title
})

const layoutRef = ref<InstanceType<typeof CustomLayout> | null>(null);
function changeModal(){
    if(layoutRef.value){
        layoutRef.value.changeModalState()

    } else {
        console.error("El Layout aún no está listo o no se encontró la ref");
    }
}


</script>

<template>
    <CustomLayout ref="layoutRef" v-bind="props">
        <main class="relative flex flex-col md:flex-row w-full justify-center gap-10 px-4 md:px-10 pt-6">
            <div class="md:w-[28.3%]">
                <SidebarCard v-if="width > 768" @click="changeModal"  :class="y>63?'fixed top-6 w-1/4':'relative w-full'" />
                <SidebarCard v-else @click="changeModal"   />
            </div>
            <section class="w-full md:w-3/4 relative pb-10">

                <h3 ref="el"  class="font-brand pb-4 text-center text-2xl">{{ sectionTitle }}</h3>
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 place-content-center place-items-center">
                    <Deferred data="publications">
                        <template #fallback>
                            <PublicationCard
                                v-for="item in 9"
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
            </section>
        </main>
    </CustomLayout>

   
</template>

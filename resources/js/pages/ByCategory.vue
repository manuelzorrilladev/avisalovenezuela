<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
import SidebarCard from '@/components/shared/Cards/SidebarCard.vue';
import HeadSEO from '@/components/shared/HeadSEO.vue';
import Navbar from '@/components/shared/Navbar.vue';
import type { PublicationCardType } from '@/types/publication';

// const publications = ref<PublicationCardType[]>([]);

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
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

onMounted(() => {
    // axios
    //     .get('/api/publications/get-all')
    //     .then((response) => {
    //         publications.value = response.data.data;
    //         isLoading.value = false;
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching publications:', error);
    //     });
});
</script>

<template>
    <HeadSEO v-bind="props" />
    <Navbar :can-register="props.canRegister" />
    <main>
        <SidebarCard />
        <section></section>
    </main>
    <!-- {{ data }} -->
    <!-- <main class="mb-20 space-y-12">
        <div>
            <h2 class="mb-4 text-center text-3xl font-bold">
                Publicaciones recientes
            </h2>
            <section
                v-if="isLoading"
                class="grid grid-cols-1 place-content-center place-items-center gap-y-6 md:grid-cols-2 xl:grid-cols-3"
            >
                <PublicationCard
                    v-for="item in 9"
                    :key="item"
                    :is-loading="isLoading"
                />
            </section>
            <section
                v-else
                class="grid grid-cols-1 place-content-center place-items-center gap-y-6 md:grid-cols-2 xl:grid-cols-3"
            >
                <PublicationCard
                    v-for="item in publications"
                    :key="item.id"
                    :publication="item"
                    :is-loading="isLoading"
                />
            </section>
        </div>
      
    </main> -->
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
import HeadSEO from '@/components/shared/HeadSEO.vue';
import Navbar from '@/components/shared/Navbar.vue';
import type { PublicationCardType } from '@/types/publication';

interface QueryProps {
    most_recent?: PublicationCardType[];
}
const publications = ref<QueryProps>({});

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
const isLoading = ref<boolean>(true);

onMounted(() => {
    // setTimeout(() => {
    //     axios
    //         .get('/api/publications/get-all')
    //         .then((response) => {
    //             publications.value = response.data.data;
    //             isLoading.value = false;
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching publications:', error);
    //         });
    // }, 4000);
    axios
        .get('/api/publications/get-all')
        .then((response) => {
            publications.value = response.data.data;
            isLoading.value = false;
        })
        .catch((error) => {
            console.error('Error fetching publications:', error);
        });
});
</script>

<template>
    <HeadSEO v-bind="props" />
    <Navbar :can-register="props.canRegister" />

    <section
        class="relative h-[45vh] overflow-hidden bg-background md:h-[55vh]"
    >
        <div
            class="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-4"
        >
            <h1
                class="w-11/12 text-center font-brand text-xl md:w-10/12 md:text-4xl"
            >
                Todo lo que necesitas, en un solo lugar
            </h1>
            <p class="w-11/12 text-center md:w-1/3">
                Consigue todo aquello que necesitas o publica tus bienes y
                servicios a un publico masivo
            </p>
            <div class="mx-auto w-11/12 max-w-md md:w-1/3">
                <div
                    class="relative overflow-hidden rounded-lg border border-primary bg-card"
                >
                    <div
                        class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
                    >
                        <svg
                            class="text-body h-4 w-4 dark:text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search"
                        class="border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full border bg-muted-foreground p-3 ps-9 text-sm shadow-xs dark:placeholder:text-black"
                        placeholder="Buscar..."
                        required
                    />
                    <button
                        type="button"
                        class="hover:bg-brand-strong focus:ring-brand-medium absolute end-1.5 bottom-1.5 box-border cursor-pointer rounded border border-transparent bg-primary px-3 py-1.5 text-xs leading-5 font-medium text-white shadow-xs focus:ring-4 focus:outline-none"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    </section>

    <main class="mb-20">
        <h2 class="text-center text-3xl font-bold mb-4">Publicaciones recientes</h2>
        <section
            v-if="isLoading"
            class="grid grid-cols-4 place-content-center place-items-center gap-y-6"
        >
            <PublicationCard
                v-for="item in 8"
                :key="item"
                :is-loading="isLoading"
            />
        </section>
        <section
            v-else
            class="grid grid-cols-4 place-content-center place-items-center gap-y-6"
        >
            <PublicationCard
                v-for="item in publications['most_recent']"
                :key="item.id"
                :publication="item"
                :is-loading="isLoading"
            />
        </section>
    </main>
</template>

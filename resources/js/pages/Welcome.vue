<script setup lang="ts">
import { Deferred } from '@inertiajs/vue3';
import {  ref } from 'vue'
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { PublicationCardType } from '@/types/publication';
interface QueryProps {
    most_recent?: PublicationCardType[];
    most_viewed?: PublicationCardType[];
    vehicles?: PublicationCardType[];
    m_service?: PublicationCardType[];
}

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        homeData: QueryProps;
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
                         @click="changeModal"
                            type="button"
                            class="hover:bg-brand-strong focus:ring-brand-medium absolute end-1.5 bottom-1.5 box-border cursor-pointer rounded border border-transparent bg-primary px-3 py-1.5 text-xs leading-5 font-medium text-white shadow-xs focus:ring-4 focus:outline-none"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <main class="mb-20 space-y-12">
            <div>
                <h2 class="mb-4 text-center text-3xl font-bold">
                    Publicaciones recientes
                </h2>
                <Deferred data="homeData">
                    <template #fallback>
                        <section
                            class="grid grid-cols-1 place-content-center place-items-center gap-y-6 md:grid-cols-2 xl:grid-cols-3"
                        >
                            <PublicationCard
                                v-for="item in 9"
                                :key="item"
                                :is-loading="true"
                            />
                        </section>
                    </template>
                    <section
                        class="grid grid-cols-1 place-content-center place-items-center gap-y-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <PublicationCard
                            v-for="item in homeData['most_recent']"
                            :key="item.id"
                            :publication="item"
                            :is-loading="false"
                            :keep-tag="true"
                        />
                    </section>
                </Deferred>
            </div>
            <!-- <div>
                <h2 class="mb-4 text-center text-3xl font-bold">
                    Más populares
                </h2>

                <section
                    class="grid grid-cols-1 place-content-center place-items-center gap-y-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    <PublicationCard
                        v-for="item in homeData['most_viewed']"
                        :key="item.id"
                        :publication="item"
                        :is-loading="false"
                    />
                </section>
            </div> -->
        </main>
    </CustomLayout>
</template>

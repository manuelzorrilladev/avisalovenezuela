<script setup lang="ts">
import { Hand } from 'lucide-vue-next';
import Slider from '@/components/shared/Cards/Slider.vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { Publication } from '@/types/publication';
import { formatDate } from '@/utils';
const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        results: Publication;
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



//

</script>

<template>
    <CustomLayout v-bind="props">
        <main class="flex flex-col-reverse md:flex-row items-center md:items-start justify-center  w-full  gap-4 md:px-6 pt-6">
            <aside
                class="flex h-fit  w-11/12 md:w-1/5 flex-col items-center gap-6 rounded-lg border p-6 text-center shadow-lg shadow-primary/30"
                :class="results.status == 'disponible'? 'min-h-[80vh]' : ''"
            >
                <div class="group relative h-32 w-32">
                    <img
                        src="/assets/img/portrait.png"
                        alt="Avatar del usuario"
                        class="h-full w-full overflow-hidden rounded-full border-4 border-primary/20 object-cover shadow-sm"
                    />
                    <div
                        class="pointer-events-none absolute inset-0 rounded-full shadow-inner"
                    ></div>
                </div>

                <div class="w-full">
                    <h3
                        class="mb-4 border-b border-black pb-2 text-lg font-bold text-primary"
                    >
                        Información del autor 
                    </h3>

                    <ul class="space-y-4 text-left text-sm">
                        <li class="flex flex-col">
                            <span
                                class="text-xs font-semibold text-primary uppercase"
                                >Publicado por</span
                            >
                            <span class="text-base font-medium text-foreground">
                                {{ results.user.name }}
                                {{ results.user.last_name }}
                            </span>
                        </li>

                        <li class="flex flex-col" v-if="results.status == 'disponible'">
                            <span
                                class="text-xs font-semibold text-primary uppercase"
                                >Teléfono</span
                            >
                            <a
                                :href="`tel:${results.user.phone}`"
                                class="font-medium text-foreground hover:underline"
                            >
                                {{ results.user.phone }}
                            </a>
                        </li>

                        <li class="flex flex-col"   >
                            <span
                                class="text-xs font-semibold text-primary uppercase"
                                >Activo desde</span
                            >
                            <span class="font-medium italic">
                                {{ formatDate(results.user.created_at ?? '') }}
                            </span>
                        </li>

                        <li
                            class="mt-4 flex items-center gap-2 border-t border-dashed border-black pt-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span class="text-xs font-bold uppercase">
                                {{ results.user.city }},
                                {{ results.user.state }}
                            </span>
                        </li>
                    </ul>
                </div>

                <button
                    v-if="results.status == 'disponible'"
                    class="w-full cursor-pointer rounded-lg border border-primary bg-primary px-3 py-2 text-center text-sm font-semibold text-black duration-200 hover:bg-white dark:border-black dark:bg-black dark:text-primary dark:hover:bg-white"
                >
                    Contactar ahora
                </button>
            </aside>
         <div class="w-11/12 md:w-4/5">
         <header v-if="results.status != 'disponible' " class=" w-full  rounded-lg border bg-red-500 p-4 shadow-lg shadow-primary/30 mb-4 text-white flex items-center justify-center gap-2">
            <Hand/>
            <h2> ¡Alto! Esta publicación ha sido marcada como desactivada o cerrada por el autor, por lo que ya no está disponible.</h2>
         </header>
            <section
                class="flex w-full flex-col items-center rounded-lg border bg-card p-4 shadow-lg shadow-primary/30 mb-10"
            >

            
                <section class="mb-8 w-full">
                    <Slider
                        :items="results.images"
                        class="overflow-hidden rounded-lg shadow-lg shadow-primary/30 border py-4"
                    />
                </section>

                <section class="w-full space-y-6">
                    <div class="flex flex-col md:flex-row items-start justify-between border-b pb-4">
                        <div>
                            <h1 class="text-3xl font-bold text-foreground">
                                {{ results.name }}
                            </h1>
                            <p class="mt-1 text-sm text-foreground">
                                Publicado 
                                {{ formatDate(results.created_at) }}
                            </p>
                        </div>
                        <div class="text-2xl font-bold text-primary italic">
                            {{ results.category.name }}
                        </div>
                    </div>

                    <div class="flex flex-col gap-8 md:flex-row">
                        <div class="w-full md:w-3/4">
                            <h3 class="mb-2 text-lg font-semibold">
                                Descripción
                            </h3>
                            <p
                                class="leading-relaxed whitespace-pre-line text-foreground"
                            >
                                {{ results.description }}
                            </p>
                        </div>

                        <div class="w-full md:w-1/4">
                            <h3 class="mb-3 text-lg font-semibold">
                                Especificaciones
                            </h3>
                            <div class="grid grid-cols-1 gap-2">
                                <div
                                    v-for="(value, key) in results.specs"
                                    :key="key"
                                    class="rounded-r-md border-l-4 border-primary bg-secondary/30 p-3 transition-all hover:bg-secondary/50"
                                >
                                    <h4
                                        class="text-xs font-bold tracking-wider text-primary uppercase"
                                    >
                                        {{ key }}
                                    </h4>
                                    <p class="text-sm font-medium">
                                        {{ value }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mt-12 w-full border-t pt-8">
                    <h3 class="mb-8 flex items-center gap-2 text-2xl font-bold">
                        Comentarios
                        <span
                            class="rounded-full bg-primary/10 px-2 py-1 text-sm font-normal text-primary"
                        >
                            {{ results.comments.length }}
                        </span>
                    </h3>

                    <div class="space-y-8">
                        <div
                            v-for="comment in results.comments"
                            :key="comment.id"
                            class="group"
                        >
                            <div class="flex gap-4">
                                <img
                                    src="/assets/img/portrait.png"
                                    alt="User"
                                    class="h-8 md:h-12 w-8 md:w-12 rounded-full border-2 border-primary/10 object-cover"
                                />

                                <div class="flex-1">
                                    <div
                                        class="rounded-2xl rounded-tl-none bg-secondary/20 p-4"
                                    >
                                        <div
                                            class="mb-2 flex items-center justify-between"
                                        >
                                            <h4 class="font-bold text-primary">
                                                {{ comment.user.name }}
                                                {{ comment.user.last_name }}
                                            </h4>
                                            <span
                                                class="text-xs text-foreground"
                                                >{{
                                                    formatDate(
                                                        comment.created_at,
                                                    )
                                                }}</span
                                            >
                                        </div>
                                        <p class="text-sm text-foreground/90">
                                            {{ comment.content }}
                                        </p>
                                    </div>

                                    <div
                                        v-if="
                                            comment.replies &&
                                            comment.replies.length > 0
                                        "
                                        class="mt-4 md:ml-8 space-y-4 border-l-2 border-primary/10 pl-6"
                                    >
                                        <div
                                            v-for="reply in comment.replies"
                                            :key="reply.id"
                                            class="flex gap-3"
                                        >
                                            <img
                                                src="/assets/img/portrait.png"
                                                alt="User"
                                                class="h-8 w-8 rounded-full object-cover"
                                            />
                                            <div
                                                class="flex-1 rounded-xl rounded-tl-none bg-secondary/10 p-3 text-sm"
                                            >
                                                <div
                                                    class="mb-1 flex items-center justify-between"
                                                >
                                                    <span
                                                        class="text-xs font-semibold text-primary"
                                                        >{{
                                                            reply.user.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="text-[10px] text-foreground"
                                                        >{{
                                                            formatDate(
                                                                reply.created_at,
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                                <p>{{ reply.content }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
         
         </div>
        </main>
        <section>
            <!-- Related post -->
        </section>
    </CustomLayout>
</template>

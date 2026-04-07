<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import {
    Eye,
    PenIcon,
    Trash,
    CalendarIcon,
    CirclePlus,
} from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import type { PublicationCardType } from '@/types/publication';

const props = withDefaults(
    defineProps<{
        user: string[];
        publications: PublicationCardType[];
    }>(),
    {},
);
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de control',
        href: dashboard().url,
    },
];

function prepareDate(date: string): string {
    return date.slice(0, 10);
}
</script>

<template>
    <Head title="Panel de control" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative flex flex-1 flex-col gap-4 rounded-xl p-4">
            <Link href="/dashboard/publicacion/crear"
                class="group fixed right-6 bottom-4 flex cursor-pointer items-center gap-1 rounded-full bg-primary"
                title="Crear aviso"
            >
                <CirclePlus
                    class="size-12 rounded-full bg-amber-400 p-2 text-white"
                />
            </Link>
            <div class="flex flex-col gap-4">
                <div
                    v-for="item in props.publications"
                    :key="item.id"
                    class="group flex min-h-24 flex-col items-start overflow-hidden rounded-xl border border-primary/50 bg-secondary-background/50 shadow-md transition-all hover:shadow-primary/20 sm:h-24 sm:flex-row sm:items-center"
                >
                    <div class="flex h-full w-full flex-1 items-center">
                        <div
                            class="h-24 w-24 shrink-0 overflow-hidden bg-muted sm:h-full sm:w-32"
                        >
                            <img
                                :src="`/storage/${item.images[0].path}`"
                                alt="Miniatura"
                                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>

                        <div
                            class="flex min-w-0 flex-1 flex-col space-y-1 px-3 sm:px-4"
                        >

                            <h2
                                class="line-clamp-2 font-brand text-sm font-bold text-foreground sm:line-clamp-1 sm:text-base"
                            >
                                {{ item.name }}
                            </h2>
                            <p
                                class="flex items-center gap-1 text-[10px] text-foreground italic opacity-80 sm:text-xs"
                            >
                                <CalendarIcon class="h-3 w-3" />
                                <span class="hidden md:inline"
                                    >Publicado el</span
                                >
                                {{ prepareDate(item.created_at) }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="flex w-full items-center justify-end gap-1 border-t border-primary/10 bg-primary/5 px-4 py-2 sm:w-auto sm:gap-2 sm:border-none sm:bg-transparent sm:px-6 sm:py-0"
                    >
                        <Link
                            :href="`/anuncio/${item.slug}`"
                            class="cursor-pointer rounded-full p-2 text-foreground transition-colors hover:bg-primary/70 hover:text-white"
                            title="Ver anuncio"
                        >
                            <Eye class="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <Link
                            :href="`dashboard/publicacion/${item.id}/editar`"
                            class="cursor-pointer rounded-full p-2 text-foreground transition-colors hover:bg-primary/70 hover:text-white"
                            title="Editar anuncio"
                        >
                            <PenIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <button
                            @click.stop.prevent="
                                console.log('Eliminar clicked!')
                            "
                            class="cursor-pointer rounded-full p-2 text-foreground transition-colors hover:bg-red-500 hover:text-white"
                            title="Desactivar anuncio"
                        >
                            <Trash class="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { Head, Link, router, usePage } from '@inertiajs/vue3';

import {
    Eye,
    EyeClosed,
    PenIcon,
    CalendarIcon,
    CirclePlus,
} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import NotificationCard from '@/components/shared/Cards/NotificationCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import type { PublicationCardType } from '@/types/publication';
const page = usePage();
const props = withDefaults(
    defineProps<{
        user: string[];
        publications: PublicationCardType[];
        messageTitle?:string;
        messageDescription?:string;
    }>(),
    {},
);

const showToast = ref<boolean>(false);
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de control',
        href: dashboard().url,
    },
];

function prepareDate(date: string): string {
    return date.slice(0, 10);
}

const toggleStatus = (id: number) => {
    router.patch(
        `/dashboard/publicacion/${id}/status`,
        {},
        {
            preserveScroll: true,
            onSuccess: () => {},
        },
    );
};
onMounted(() => {
    showToast.value = false
    const flash = page.props.flash as { success?: string } | undefined;
    if (flash && flash.success != null) {
        showToast.value = true
    }
})
</script>

<template>
    <Head title="Panel de control" />

    <NotificationCard
        v-if="showToast"
        :show="showToast"
        @close="showToast = false"
        :duration="4000"
    >
        <template #title>Publicación Actualizada</template>
        <template #description
            >Los cambios se han guardado y la caché ha sido
            invalidada.</template
        >
    </NotificationCard>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative flex flex-1 flex-col gap-4 rounded-xl p-4">
            <Link
                href="/dashboard/publicacion/crear"
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
                    class="group flex min-h-24 flex-col items-start overflow-hidden rounded-xl border transition-all sm:h-24 sm:flex-row sm:items-center"
                    :class="[
                        item.status === 'no disponible'
                            ? 'border-gray-300 bg-gray-50/50 opacity-75 grayscale-[0.5]'
                            : 'border-primary/50 bg-secondary-background/50 shadow-md hover:shadow-primary/20',
                    ]"
                >
                    <div class="flex h-full w-full flex-1 items-center">
                        <div
                            class="relative h-24 w-24 shrink-0 overflow-hidden bg-muted sm:h-full sm:w-32"
                        >
                            <img
                                :src="`/storage/${item.images[0].path}`"
                                alt="Miniatura"
                                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                :class="{
                                    'brightness-75':
                                        item.status === 'no disponible',
                                }"
                            />
                            <div
                                v-if="item.status === 'no disponible'"
                                class="absolute inset-0 flex items-center justify-center bg-black/20"
                            >
                                <span
                                    class="rounded bg-black/60 px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase"
                                    >Pausado</span
                                >
                            </div>
                        </div>

                        <div
                            class="flex min-w-0 flex-1 flex-col space-y-1 px-3 sm:px-4"
                        >
                            <div class="flex items-center gap-2">
                                <h2
                                    class="line-clamp-2 font-brand text-sm font-bold text-foreground sm:line-clamp-1 sm:text-base"
                                >
                                    {{ item.name }}
                                </h2>
                                <span
                                    v-if="item.status === 'no disponible'"
                                    class="hidden rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600 sm:inline-block"
                                >
                                    Fuera de línea
                                </span>
                            </div>

                            <p
                                class="flex items-center gap-1 text-[10px] text-foreground italic opacity-60 sm:text-xs"
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
                        class="flex w-full items-center justify-end gap-1 border-t px-4 py-2 sm:w-auto sm:gap-2 sm:border-none sm:bg-transparent sm:px-6 sm:py-0"
                        :class="
                            item.status === 'no disponible'
                                ? 'border-gray-200'
                                : 'border-primary/10 bg-primary/5'
                        "
                    >
                        <Link
                            :href="`/anuncio/${item.slug}`"
                            class="rounded-full p-2 text-foreground transition-colors hover:bg-primary/70 hover:text-white"
                            title="Ver anuncio"
                        >
                            <Eye class="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <Link
                            :href="`dashboard/publicacion/${item.id}/editar`"
                            class="rounded-full p-2 text-foreground transition-colors hover:bg-primary/70 hover:text-white"
                            title="Editar anuncio"
                        >
                            <PenIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <button
                            @click="toggleStatus(item.id)"
                            class="cursor-pointer rounded-full p-2 text-foreground transition-colors hover:bg-red-500 hover:text-white"
                            :title="
                                item.status == 'disponible'
                                    ? 'Desactivar anuncio'
                                    : 'Activar Anuncio'
                            "
                        >
                            <EyeClosed
                                v-if="item.status == 'disponible'"
                                class="h-4 w-4 sm:h-5 sm:w-5"
                            />
                            <Eye v-else class="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import {
    CalendarIcon,
    CirclePlus,
    EyeIcon,
    ClockIcon,
    CheckCircle2Icon,
    AlertCircleIcon,
} from 'lucide-vue-next';
import { onMounted, ref, watch } from 'vue';
import DescriptionCard from '@/components/shared/Cards/DescriptionCard.vue';
import NotificationCard from '@/components/shared/Cards/NotificationCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import type { PublicationCardType } from '@/types/publication';
// --- TYPES & INTERFACES ---
type StatusKey =
    'por realizar' | 'por aprobacion' | 'aprobada por publicar' | 'publicada';

interface StatusItem {
    color: string;
    text: string;
    icon: any;
}
console.log(router);
// --- PROPS ---
const props = defineProps<{
    user: any; // Ajustado de string[] a any para evitar errores de objeto de usuario
    publications: PublicationCardType[];
}>();

// --- STATE ---
const page = usePage();
const showToast = ref<boolean>(false);
const activeItem = ref<number>(-1);
const pubModal = ref<boolean>(false);
const activePublication = ref<PublicationCardType|undefined>(undefined)

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Panel de control', href: dashboard().url },
];
const activeImageIndex = ref(0);

// Cada vez que cambie el item activo del modal, reiniciamos el carrusel a la primera imagen
watch(
    () => activeItem,
    () => {
        activeImageIndex.value = 0;
    },
);
// --- LOGIC ---
const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-VE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const statusMap: Record<StatusKey, StatusItem> = {
    'por realizar': {
        color: 'bg-red-200 text-red-800 border-red-500/50',
        text: 'Por realizar',
        icon: ClockIcon,
    },
    'por aprobacion': {
        color: 'bg-amber-200 text-amber-800 border-amber-500/50',
        text: 'En revisión',
        icon: AlertCircleIcon,
    },
    'aprobada por publicar': {
        color: 'bg-blue-200 text-blue-800 border-blue-500/50',
        text: 'Por publicar',
        icon: ClockIcon,
    },
    publicada: {
        color: 'bg-green-200 text-green-800 border-green-500/50',
        text: 'Publicada',
        icon: CheckCircle2Icon,
    },
};


function toggleModal(pos: number) {
    activeItem.value = pos;
    pubModal.value = !pubModal.value;
    if(pos>=0){
        const item = props.publications.find((pub)=>{
            return pub
        })
        activePublication.value = item
    }else{
        activePublication.value = undefined
    }

}


onMounted(() => {
    const flash = page.props.flash as { success?: string };
    if (flash?.success) {
        showToast.value = true;
    }
});
</script>

<template>
    <Head title="Panel de control" />

    <NotificationCard
        v-if="showToast"
        :show="showToast"
        @close="showToast = false"
        :duration="4000"
    >
        <template #title>¡Acción Exitosa!</template>
        <template #description
            >La publicación se ha actualizado correctamente en el
            sistema.</template
        >
    </NotificationCard>

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="space-y-8 p-4 md:p-8">
           
            <Transition name="popup">
            <div v-if="pubModal" class="fixed z-99 flex items-center justify-center  inset-0 bg-secondary-background/70 backdrop-blur-sm h-screen">
                <DescriptionCard
                    :publication="activePublication"
                    :activeItem="activeItem"
                    @close="toggleModal(-1)"
                />
            </div>
            </Transition>

            <div
                class="fixed right-4 bottom-4 flex flex-col justify-between gap-4 md:flex-row md:items-center"
            >
                <Link
                    href="/dashboard/publicacion/crear"
                    class="group flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-black shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-white"
                >
                    <CirclePlus class="size-5" />
                    Crear Nuevo Aviso
                </Link>
            </div>

            <div
                v-if="props.publications.length > 0"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                <div
                    v-for="(item, key) in props.publications"
                    :key="item.id"
                    class="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-secondary-background/40 backdrop-blur-sm shadow-lg shadow-primary/10 transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/50"
                >
                    <div class="relative h-48 w-full overflow-hidden bg-muted">
                        <img
                            v-if="item.images && item.images.length > 0"
                            :src="`/storage/${item.images[0].path}`"
                            :alt="item.name"
                            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                            v-else
                            class="flex h-full items-center justify-center text-foreground/20"
                        >
                            <CirclePlus class="size-12" />
                        </div>

                        <div
                            class="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md"
                            :class="
                                statusMap[item.status as unknown as StatusKey]
                                    ?.color || 'bg-gray-500/20'
                            "
                        >
                            <component
                                :is="
                                    statusMap[
                                        item.status as unknown as StatusKey
                                    ]?.icon
                                "
                                class="size-3"
                            />
                            {{
                                statusMap[item.status as unknown as StatusKey]
                                    ?.text
                            }}
                        </div>
                        <div
                            class="absolute top-0 h-1/3 w-full bg-linear-180 from-foreground to-transparent"
                        ></div>
                    </div>

                    <div class="flex flex-1 flex-col p-5">
                        <h2
                            class="mb-2 line-clamp-2 font-brand text-lg font-bold text-foreground transition-colors group-hover:text-primary"
                        >
                            {{ item.name }}
                        </h2>

                        <div
                            class="mb-6 flex items-center gap-2 text-xs text-foreground/50"
                        >
                            <CalendarIcon class="size-3.5" />
                            <span
                                >Publicado el
                                {{ formatDate(item.created_at) }}</span
                            >
                        </div>

                        <div
                            class="mt-auto flex items-center justify-between gap-3 border-t border-primary pt-4"
                        >
                            <button
                                @click="toggleModal(key)"
                                class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-background py-2.5 text-xs font-bold transition-all hover:bg-primary hover:text-black"
                            >
                                <EyeIcon class="size-3.5" />
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-else
                class="flex flex-col items-center justify-center space-y-4 py-20 text-center"
            >
                <div
                    class="rounded-full border border-primary/10 bg-primary/5 p-6"
                >
                    <CirclePlus class="size-12 text-primary/40" />
                </div>
                <div class="max-w-xs">
                    <h3 class="text-xl font-bold text-foreground">
                        No hay avisos aún
                    </h3>
                    <p class="text-sm text-foreground/60">
                        Comienza a crear tu primer aviso para verlo listado
                        aquí.
                    </p>
                </div>
            </div>
        </div>

        <Link
            href="/dashboard/publicacion/crear"
            class="fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-black shadow-2xl shadow-primary/40 transition-transform active:scale-95 md:hidden"
        >
            <CirclePlus class="size-8" />
        </Link>
    </AppLayout>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.popup-enter-from,
.popup-leave-to {
    opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
    transition: opacity 0.3s ease;
}

.popup-enter-active .modal-content {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.popup-leave-active .modal-content {
    transition: all 0.25s ease-in;
}

.popup-enter-from .modal-content {
    transform: scale(0.7) translateY(20px);
    opacity: 0;
}

.popup-leave-to .modal-content {
    transform: scale(0.9);
    opacity: 0;
}
</style>

<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import {
    AlertCircleIcon,
    CalendarIcon,
    CheckCircle2Icon,
    ChevronDownCircle,
    CirclePlus,
    ClockIcon,
    EyeIcon,
} from 'lucide-vue-next';
import { reactive, ref, watch, computed } from 'vue';
import DescriptionCard from '@/components/shared/Cards/DescriptionCard.vue';
import NotificationCard from '@/components/shared/Cards/NotificationCard.vue';
import StatusToggle from '@/components/shared/StatusToggle.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import type { User } from '@/types/auth';
import type { PublicationCardType, Workers } from '@/types/publication';
// --- TYPES & INTERFACES ---
type StatusKey =
    'por realizar' | 'por aprobacion' | 'aprobada por publicar' | 'publicada';

interface StatusItem {
    color: string;
    text: string;
    icon: any;
}
interface PublicationStruct {
    'por realizar': PublicationCardType[];
    'por aprobacion': PublicationCardType[];
    'aprobada por publicar': PublicationCardType[];
    publicada: PublicationCardType[];
}
// --- PROPS ---
const props = defineProps<{
    user: User;
    publications: PublicationStruct;
    workers: Workers[];
    filters: {
        filterMode: 'todos' | 'asignados';
    };
    message?: string;
}>();

// --- STATE ---
const page = usePage();

// Accedemos a las props flash de Inertia
const flash = computed(
    () => page.props.flash as { success?: string; error?: string },
);
const showToast = ref<boolean>(false);

const activeItem = ref<number>(-1);
const pubModal = ref<boolean>(false);
const currentMessage = ref<string>('Accion competada exitosamente!');
const toastError = ref<boolean>(false);
const filterMode = ref<'todos' | 'asignados'>(
    props.filters.filterMode || 'todos',
);
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Panel de control', href: dashboard().url },
];
const activeImageIndex = ref(0);
const activePublication = ref<PublicationCardType | undefined>(undefined);

const activeSection = reactive({
    'por realizar': true,
    'por aprobacion': true,
    'aprobada por publicar': true,
    publicada: true,
});

// Cada vez que cambie el item activo del modal, reiniciamos el carrusel a la primera imagen
watch(
    () => activeItem,
    () => {
        activeImageIndex.value = 0;
    },
);

watch(
    () => page.props.flash,
    () => {
        console.log(flash.value);
        console.log(page.props);

        if (flash.value?.success) {
            currentMessage.value = flash.value?.success;

            showToast.value = true;
        } else if (flash.value?.error) {
            currentMessage.value = flash.value?.error;
            toastError.value = true;
            showToast.value = true;
        }
    },
    { deep: true, immediate: true },
);
watch(filterMode, (newFilter) => {
    router.get(
        '/dashboard/w/',
        { filter: newFilter },
        {
            preserveState: true,
            preserveScroll: true,
            only: ['publications', 'filters'],
        },
    );
});

// --- LOGIC ---
const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-VE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};
const findWorker = (id: number): Workers | undefined => {
    for (let i: number = 0; i < props.workers.length; i++) {
        const item = props.workers[i];
        if (item.id == id) {
            return item;
        }
    }
    return undefined;
};
const updateStatus = (id: number, newStatus: string) => {
    router.patch(
        `/dashboard/publicacion/${id}/status`,
        {
            status: newStatus,
        },
        {
            preserveScroll: true,
        },
    );
};

const updateWorker = (id: number) => {
    router.patch(
        `/dashboard/publicacion/${id}/asignar`,
        {
            worker_id: props.user.id,
        },
        {
            preserveScroll: true,
        },
    );
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

function toggleModal(pos: number, type?: string) {
    activeItem.value = pos;
    pubModal.value = !pubModal.value;
    if (pos >= 0) {
        const item = props.publications[type as keyof PublicationStruct][pos];
        activePublication.value = item;
    } else {
        activePublication.value = undefined;
    }
}
</script>

<template>
    <Head title="Panel de control" />

    <NotificationCard
        v-if="showToast"
        :show="showToast"
        :is-error="toastError"
        @close="((showToast = false), (toastError = false))"
        :duration="4000"
    >
        <template #title>{{
            toastError ? '¡Hubo un error!' : '¡Acción Exitosa!'
        }}</template>
        <template #description>{{ currentMessage }}</template>
    </NotificationCard>

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="space-y-8 p-4 md:p-8">
            <header class="flex justify-between">
                <h2 v-if="filterMode == 'todos'" class="font- text-xl">
                    Todas las publicaciones 
                </h2>
                <h2 v-else class="font- text-xl">
                    Publicaciones asignadas     
                </h2>
                <div>
                    <StatusToggle v-model="filterMode" />
                </div>
            </header>
            <Transition name="popup">
                <div
                    v-if="pubModal"
                    class="fixed inset-0 z-99 flex h-screen items-center justify-center bg-secondary-background/70 backdrop-blur-sm"
                >
                    <div class="modal-content">
                        <DescriptionCard
                            :publication="activePublication"
                            :activeItem="activeItem"
                            @close="toggleModal(-1)"
                            :in-charge="findWorker(activePublication?.worker_id || 0)"
                            :user="props.user"
                        />
                    </div>
                </div>
            </Transition>

            <div v-if="props.publications" class="space-y-12">
                <div
                    v-for="(items, statusKey) in props.publications"
                    :key="statusKey"
                >
                    <div
                        @click="
                            activeSection[statusKey] = !activeSection[statusKey]
                        "
                        class="flex justify-between"
                    >
                        <div class="flex items-center gap-3">
                            <h2
                                class="font-brand text-xl tracking-wider text-foreground uppercase"
                            >
                                {{
                                    statusMap[statusKey as StatusKey]?.text ||
                                    statusKey
                                }}
                            </h2>
                            <span
                                class="flex h-full items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary"
                            >
                                {{ items.length }}
                            </span>
                            <ChevronDownCircle
                                class="size-5 cursor-pointer font-bold text-primary duration-300"
                                :class="
                                    activeSection[statusKey]
                                        ? 'rotate-180'
                                        : 'rotate-0'
                                "
                            />
                        </div>
                    </div>
                    <hr class="my-2 border border-black dark:border-primary" />
                    <Transition name="dropdown">
                        <div
                            v-if="activeSection[statusKey]"
                            class="grid grid-cols-1 gap-6 overflow-y-hidden sm:grid-cols-2 lg:grid-cols-3 "
                        >
                            <div
                                v-for="(result, position) in items"
                                :key="result.id"
                                class="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/20 bg-secondary-background/40 shadow-lg shadow-primary/10 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/30"
                            >
                                <div
                                    class="relative h-48 w-full overflow-hidden bg-muted"
                                >
                                    <img
                                        v-if="
                                            result.images &&
                                            result.images.length > 0
                                        "
                                        :src="`/storage/${result.images[0].path}`"
                                        :alt="result.name"
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
                                            statusMap[
                                                result.status as unknown as StatusKey
                                            ]?.color || 'bg-gray-500/20'
                                        "
                                    >
                                        <component
                                            :is="
                                                statusMap[
                                                    result.status as unknown as StatusKey
                                                ]?.icon
                                            "
                                            class="size-3"
                                        />
                                        {{
                                            statusMap[
                                                result.status as unknown as StatusKey
                                            ]?.text || result.status
                                        }}
                                    </div>
                                    <div
                                        class="absolute top-0 h-1/3 w-full bg-linear-180 from-foreground/10 to-transparent"
                                    ></div>
                                </div>

                                <div class="flex flex-1 flex-col space-y-4 p-5">
                                    <div class="space-y-1">
                                        <h3
                                            class="line-clamp-2 font-brand text-base font-bold text-foreground transition-colors group-hover:text-primary  h-12"
                                        >
                                            {{ result.name }}
                                        </h3>
                                        <div
                                            class="flex items-center gap-2 text-[11px] text-foreground/50"
                                        >
                                            <CalendarIcon class="size-3.5" />
                                            <span
                                                >Publicado el
                                                {{
                                                    formatDate(
                                                        result.created_at,
                                                    )
                                                }}</span
                                            >
                                        </div>
                                    </div>

                                    <div
                                        class="space-y-3 rounded-xl border border-primary/5 bg-background/50 p-3 text-xs"
                                    >
                                        <div class="flex flex-col gap-1">
                                            <label
                                                class="text-[10px] font-bold tracking-wider text-primary uppercase"
                                                >Estado de la publicación</label
                                            >
                                            <select
                                                :value="result.status"
                                                v-if="
                                                    findWorker(result.worker_id)
                                                        ?.id == user.id
                                                "
                                                @change="
                                                    updateStatus(
                                                        result.id,
                                                        (
                                                            $event.target as HTMLSelectElement
                                                        ).value,
                                                    )
                                                "
                                                class="w-full rounded-lg border border-primary/20 bg-background px-2 py-1.5 text-xs text-foreground transition-all focus:border-primary focus:outline-hidden"
                                            >
                                                <option value="por realizar">
                                                    Por realizar
                                                </option>
                                                <option value="por aprobacion">
                                                    En revisión
                                                </option>
                                                <option
                                                    value="aprobada por publicar"
                                                >
                                                    Por publicar
                                                </option>
                                                <option value="publicada">
                                                    Publicada
                                                </option>
                                            </select>
                                            <div
                                                v-else
                                                class="w-full rounded-lg px-2 py-1.5 text-xs text-foreground"
                                            >
                                                {{
                                                    statusMap[
                                                        result.status as unknown as StatusKey
                                                    ]?.text
                                                }}
                                            </div>
                                        </div>

                                        <div class="flex flex-col gap-1">
                                            <h2
                                                class="text-[10px] font-bold tracking-wider text-primary uppercase"
                                            >
                                                Diseñador asignado
                                            </h2>
                                            <p class="text-lg font-bold">
                                                {{
                                                    findWorker(result.worker_id)
                                                        ?.name || 'Sin asignar'
                                                }}
                                            </p>
                                        </div>
                                        <div class="border-t border-primary/10">
                                            <button
                                                @click="updateWorker(result.id)"
                                                :disabled="
                                                    findWorker(
                                                        result.worker_id,
                                                    ) != undefined
                                                "
                                                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary/30 bg-background py-2 text-xs font-bold transition-all hover:bg-primary hover:text-black disabled:cursor-not-allowed disabled:text-black/70 disabled:hover:bg-muted"
                                            >
                                                {{
                                                    findWorker(
                                                        result.worker_id,
                                                    ) == undefined
                                                        ? 'Asignar'
                                                        : 'Ya asignado'
                                                }}
                                            </button>
                                        </div>
                                        <div class="border-t border-primary/10">
                                            <button
                                                @click="
                                                    toggleModal(
                                                        position,
                                                        statusKey,
                                                    )
                                                "
                                                class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-background py-2 text-xs font-bold transition-all hover:bg-primary hover:text-black"
                                            >
                                                <EyeIcon class="size-3.5" />
                                                Ver detalles completos
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
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
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
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

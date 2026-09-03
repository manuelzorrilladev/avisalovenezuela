<script setup lang="ts">
import {
    XIcon,
    MapPinIcon,
    CalendarIcon,
    TagIcon,
    ClockIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    AlertCircleIcon,
    CheckCircle2Icon,
    FileDownIcon,
} from 'lucide-vue-next';

import { ref, watch } from 'vue';
import type { User } from '@/types';
import type { PublicationCardType, Workers } from '@/types/publication';
// --- PROPS Y EMITS ---
const props = defineProps<{
    publication?: PublicationCardType;
    activeItem: number;
    inCharge?: Workers;
    user?: User;
    haveAccess: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

// --- LOGIC ---
// Extraemos de forma reactiva la publicación activa actual

const activeImageIndex = ref(0);

// Cada vez que cambie el item activo del modal, reiniciamos el carrusel a la primera imagen
watch(
    () => props.activeItem,
    () => {
        activeImageIndex.value = 0;
    },
);

const nextImage = () => {
    if (!props.publication?.images) return;
    if (activeImageIndex.value < props.publication.images.length - 1) {
        activeImageIndex.value++;
    } else {
        activeImageIndex.value = 0;
    }
};
const url = `dashboard/publicacion/${props.publication?.id}`;

const fullPublicationUrl = `https://avisalovenezuela.com/${url}`;

const rawText = `¡Hola! Tengo una publicación activa en Avisalo y quisiera verificar el estatus del aviso, por favor. El link a mi publicación es: ${fullPublicationUrl}`;

const message = `https://wa.me/AVÍSALO?text=${encodeURIComponent(rawText)}`;
const prevImage = () => {
    if (!props.publication?.images) return;
    if (activeImageIndex.value > 0) {
        activeImageIndex.value--;
    } else {
        activeImageIndex.value = props.publication.images.length - 1;
    }
};

// Formateador de fechas coherente
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-VE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

// Mapeo estricto de estados basado en tu diseño previo
const statusMap: Record<string, { color: string; text: string; icon: any }> = {
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
</script>

<template>
    <div
        v-if="props.publication"
        class="relative flex max-h-[90vh] w-11/12 max-w-4xl flex-col overflow-hidden rounded-2xl border border-primary/20 bg-secondary-background text-foreground shadow-2xl md:max-h-[85vh]"
    >

        <button
            @click="emit('close')"
            class="group absolute top-4 right-4 z-50 rounded-full border border-primary/20 bg-background/60 p-2 transition-all duration-200 hover:bg-primary hover:text-black"
            title="Cerrar ventana"
        >
            <XIcon class="size-5 transition-transform group-hover:rotate-90" />
        </button>

        <div class="grid w-full grid-cols-1 overflow-y-auto md:grid-cols-12">
            <div
                class="relative flex min-h-75 flex-col justify-center border-b border-primary/10 bg-black/40 md:col-span-5 md:min-h-full md:border-r md:border-b-0"
            >
                <div
                    class="group relative flex h-full min-h-70 w-full items-center justify-center overflow-hidden"
                >
                    <img
                        v-if="
                            props.publication.images &&
                            props.publication.images.length > 0
                        "
                        :src="`/storage/${props.publication.images[activeImageIndex].path}`"
                        :alt="props.publication.name"
                        class="h-full max-h-95 w-full object-cover transition-transform duration-300 md:max-h-full"
                    />
                    <div
                        v-else
                        class="flex flex-col items-center justify-center gap-2 p-8 text-foreground/30"
                    >
                        <TagIcon class="size-12 opacity-40" />
                        <span class="text-xs italic"
                            >Sin imágenes disponibles</span
                        >
                    </div>

                    <template
                        v-if="
                            props.publication.images &&
                            props.publication.images.length > 1
                        "
                    >
                        <button
                            @click="prevImage"
                            class="absolute left-3 rounded-lg border border-primary/20 bg-background/80 p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-primary hover:text-black"
                        >
                            <ChevronLeftIcon class="size-5" />
                        </button>
                        <button
                            @click="nextImage"
                            class="absolute right-3 rounded-lg border border-primary/20 bg-background/80 p-1.5 opacity-0 transition-all group-hover:opacity-100 hover:bg-primary hover:text-black"
                        >
                            <ChevronRightIcon class="size-5" />
                        </button>
                    </template>
                </div>

                <div
                    v-if="
                        props.publication.images &&
                        props.publication.images.length > 1
                    "
                    class="absolute right-0 bottom-4 left-0 z-10 flex justify-center gap-1.5 px-4"
                >
                    <!-- @click="activeImageIndex = index" -->
                    <button
                        v-for="(img, index) in props.publication.images"
                        :key="img.id"
                        class="h-1.5 rounded-full transition-all duration-300"
                        :class="
                            index === activeImageIndex
                                ? 'w-6 bg-primary'
                                : 'w-1.5 bg-white/40 hover:bg-white/70'
                        "
                    ></button>
                </div>
            </div>

            <div
                class="flex flex-col justify-between space-y-6 p-6 md:col-span-7 md:p-8"
            >
                <div class="space-y-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <span
                            class="inline-flex items-center gap-1 rounded-md border-amber-500/50 bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-800"
                        >
                            <TagIcon class="size-3" />
                            {{ props.publication.category?.name || 'Aviso' }}
                        </span>

                        <span
                            class="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium"
                            :class="
                                statusMap[props.publication.status]?.color ||
                                'border-gray-500/30 bg-gray-500/10 text-gray-400'
                            "
                        >
                            <component
                                :is="statusMap[props.publication.status]?.icon"
                                class="size-3"
                            />
                            {{
                                statusMap[props.publication.status]?.text ||
                                props.publication.status
                            }}
                        </span>
                    </div>

                    <h2
                        class="font-brand text-2xl leading-snug font-bold tracking-tight text-foreground"
                    >
                        {{ props.publication.name }}
                    </h2>
                </div>

                <div
                    class="space-y-4 rounded-xl border border-primary/5 bg-background/40 p-4 text-sm"
                >
                    <div class="grid grid-cols-2">
                        <div
                            class="flex items-center gap-2.5 text-foreground/80"
                        >
                            <MapPinIcon class="size-4 text-primary" />
                            <div>
                                <p
                                    class="mb-0.5 text-[10px] leading-none font-semibold tracking-wider text-foreground/40 uppercase"
                                >
                                    Ubicación
                                </p>
                                <p class="font-medium">
                                    {{ props.publication.city }},
                                    {{ props.publication.state }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-2.5 text-foreground/80"
                        >
                            <CalendarIcon class="size-4 text-primary" />
                            <div>
                                <p
                                    class="mb-0.5 text-[10px] leading-none font-semibold tracking-wider text-foreground/40 uppercase"
                                >
                                    Fecha Publicación
                                </p>
                                <p class="font-medium">
                                    {{
                                        formatDate(
                                            props.publication.published_at ||
                                                props.publication.created_at,
                                        )
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-if="props.haveAccess" class="">
                        <hr class=" border-foreground/40" />
                        <h5
                            class="text my-3 leading-none font-semibold tracking-wider uppercase"
                        >
                            Diseñador a cargo:
                            {{ inCharge?.name || 'SIN ASIGNAR' }}
                        </h5>
                        <hr class="mb-2 border-foreground/40" />
                        <h3>
                               <strong>Detalles del anunciante</strong> <br />
                    {{ props.publication.user.name }} <br />
                    {{ props.publication.user?.email }} <br />
                    {{ props.publication.user.id_card }} <br />
                    {{ props.publication.user?.phone || 'SIN TELÉFONO ASIGNADO' }}
                
                        </h3>
                    </div>
                </div>
               
                <div class="flex-1 space-y-2">
                    <h3
                        class="text-xs font-bold tracking-wider text-foreground/40 uppercase"
                    >
                        Detalles del anuncio
                    </h3>
                    <div
                        class="max-h-45 overflow-y-auto rounded-xl border border-primary/10 bg-background/40 p-4 text-sm leading-relaxed whitespace-pre-line text-foreground/90"
                    >
                        {{ props.publication.description }}
                    </div>
                </div>
                <div
                    v-if="props.haveAccess && props.user?.role != 1"
                    class="flex justify-end"
                >
                    <a
                        :href="`/dashboard/publicacion/${props.publication.id}/files`"
                        class="group dark:hover: flex cursor-pointer items-center gap-2 rounded-xl border border-primary bg-primary px-3 py-3 text-xs font-bold duration-200 hover:bg-white hover:text-primary dark:hover:bg-amber-400"
                    >
                        <FileDownIcon class="size-6 duration-200" />
                        <p class="text-xs">Descargar imágenes</p>
                    </a>
                </div>
                <div v-else class="flex justify-end">
                    <a
                        :href="message"
                        target="_blank"
                        class="group dark:hover: flex cursor-pointer items-center gap-2 rounded-xl border border-primary bg-primary px-3 py-3 text-xs font-bold duration-200 hover:bg-white hover:fill-primary hover:text-primary dark:hover:bg-amber-400"
                    >
                        <svg
                            class="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z"
                            />
                        </svg>
                        <p class="text-xs">Chequear estatús</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

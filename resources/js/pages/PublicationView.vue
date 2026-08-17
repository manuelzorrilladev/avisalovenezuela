<script setup lang="ts">
import {  Head, Link } from '@inertiajs/vue3';
import { AlertCircleIcon, ArrowLeftCircleIcon, CalendarIcon, CheckCircle2Icon, ClockIcon, MapPinIcon, TagIcon, UserCircle2Icon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import type { User } from '@/types';
import type { Publication, Workers } from '@/types/publication';
type StatusKey =
    'por realizar' | 'por aprobacion' | 'aprobada por publicar' | 'publicada';

interface StatusItem {
    color: string;
    text: string;
    icon: any;
}


const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        user: User;
        worker?:Workers;
        publication: Publication;

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
console.log(props);

const isWorker = computed(()=>{
    return props.user.roles == 1?false:true
})


const activeImageIndex = ref(0)
const inCharge=computed(()=>{
    return props.worker?.name || 'Sin asignar'
})

const nextImage = () => {
    if (!props.publication?.images) return;
    if (activeImageIndex.value < props.publication.images.length - 1) {
        activeImageIndex.value++;
    } else {
        activeImageIndex.value = 0;
    }
};

const prevImage = () => {
    if (!props.publication?.images) return;
    if (activeImageIndex.value > 0) {
        activeImageIndex.value--;
    } else {
        activeImageIndex.value = props.publication.images.length - 1;
    }
};


const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-VE', {
        day: '2-digit',
        month: 'long',
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

//
</script>

<template>
    <AppLayout v-bind="props">
      <Head :title="props.title">


        <meta name="description" :content="props.description">
        <link rel="canonical" :href="props.url">

        <meta property="og:type" content="website">
        <meta property="og:url" :content="props.url">
        <meta property="og:title" :content="props.title">
        <meta property="og:description" :content="props.description">
        <meta property="og:image" :content="props.image">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" :content="props.url">
        <meta name="twitter:title" :content="props.title">
        <meta name="twitter:description" :content="props.description">
        <meta name="twitter:image" :content="props.image">
    </Head>
        <div v-if="publication" class="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
            
            <div class="flex flex-col-reverse md:flex-row w-full b gap-6 md:gap-0 items-center justify-between border-b border-primary/10 pb-4">
                <Link 
                    href="/dashboard" 
                    class="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-secondary-background/60 px-4 py-2 text-xs font-bold text-foreground transition-all hover:border-primary hover:bg-primary hover:text-black w-full md:w-fit"
                >
                    <ArrowLeftCircleIcon class="size-4" />
                    <span>Volver al Dashboard</span>
                </Link>

                <div class="flex items-center justify-end w-full md:w-1/2 gap-2">
                    <span class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 w-full md:w-fit text-center justify-center ">
                        <TagIcon class="size-3.5" />
                        {{ publication.category?.name || 'Aviso' }}
                    </span>

                    <span 
                        class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md w-full md:w-fit  text-center justify-center "  
                        :class="statusMap[publication.status as StatusKey]?.color || 'border-gray-500/30 bg-gray-500/10 text-gray-400'"
                    >
                        <component 
                            :is="statusMap[publication.status as StatusKey]?.icon" 
                            class="size-3.5" 
                        />
                        {{ statusMap[publication.status as StatusKey]?.text || publication.status }}
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
                
                <div class="space-y-4 lg:col-span-7">
                    <div class="group relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-black/40 shadow-xl backdrop-blur-sm">
                        
                        <img
                            v-if="publication.images && publication.images.length > 0"
                            :src="`/storage/${publication.images[activeImageIndex].path}`"
                            :alt="publication.name"
                            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        <div v-else class="flex flex-col items-center justify-center gap-3 p-12 text-foreground/30">
                            <TagIcon class="size-16 opacity-30" />
                            <span class="text-xs font-medium italic">Sin imágenes disponibles</span>
                        </div>

                        <template v-if="publication.images && publication.images.length > 1">
                            <button
                                @click="prevImage"
                                class="absolute left-4 rounded-xl border border-primary/20 bg-background/80 p-2 text-foreground opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-primary hover:text-black"
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeftIcon class="size-6" />
                            </button>
                            <button
                                @click="nextImage"
                                class="absolute right-4 rounded-xl border border-primary/20 bg-background/80 p-2 text-foreground opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-primary hover:text-black"
                                aria-label="Siguiente imagen"
                            >
                                <ChevronRightIcon class="size-6" />
                            </button>
                        </template>
                    </div>

                    <div 
                        v-if="publication.images && publication.images.length > 1" 
                        class="flex items-center gap-3 overflow-x-auto pb-2"
                    >
                        <button
                            v-for="(img, index) in publication.images"
                            :key="img.id"
                            @click="activeImageIndex = index"
                            class="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all"
                            :class="index === activeImageIndex ? 'border-primary scale-95 shadow-md shadow-primary/20' : 'border-transparent opacity-60 hover:opacity-100'"
                        >
                            <img :src="`/storage/${img.path}`" class="h-full w-full object-cover" />
                        </button>
                    </div>
                </div>

                <div class="flex flex-col justify-between space-y-6 lg:col-span-5">
                    
                    <div class="space-y-6">
                        <h1 class="font-brand text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                            {{ publication.name }}
                        </h1>

                        <div class="grid grid-cols-2 gap-4 rounded-2xl border border-primary/10 bg-secondary-background/40 p-4 backdrop-blur-sm">
                            <div class="flex items-center gap-3 text-foreground/80">
                                <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <MapPinIcon class="size-5" />
                                </div>
                                <div>
                                    <p class="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Ubicación</p>
                                    <p class="text-xs font-semibold">{{ publication.city }}, {{ publication.state }}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3 text-foreground/80">
                                <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <CalendarIcon class="size-5" />
                                </div>
                                <div>
                                    <p class="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Publicado el</p>
                                    <p class="text-xs font-semibold">
                                        {{ formatDate(publication.published_at || publication.created_at) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div 
                            v-if="inCharge && isWorker" 
                            class="flex items-center justify-between rounded-2xl border border-primary/10 bg-secondary-background/40 p-4 backdrop-blur-sm"
                        >
                            <div class="flex items-center gap-3">
                                <div  class="flex size-10 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                                    <UserCircle2Icon/>
                                </div>
                                <div>
                                    <p class="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Empleado a cargo</p>
                                    <p class="text-xs font-bold text-foreground">{{ inCharge }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <h3 class="text-xs font-bold uppercase tracking-wider text-foreground/40">
                                Detalles del anuncio
                            </h3>
                            <div class="rounded-2xl border border-primary/10 bg-secondary-background/20 p-5 text-sm leading-relaxed text-foreground/90 whitespace-pre-line shadow-inner">
                                {{ publication.description }}
                            </div>
                        </div>
                    </div>

                    <div v-if="publication.images && publication.images.length > 0" class="pt-4 border-t border-primary/10">
                        <a
                            :href="`/dashboard/publicacion/${publication.id}/files`"
                            target="_blank"
                            class="flex w-full items-center justify-center gap-3 rounded-xl border border-primary bg-primary px-6 py-3.5 text-xs font-bold text-black transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01]"
                        >
                            <FileDownIcon class="size-5" />
                            <span>Descargar imágenes (.zip)</span>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </AppLayout>
</template>
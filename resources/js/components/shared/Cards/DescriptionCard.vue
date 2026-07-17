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
    CheckCircle2Icon
} from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

// --- PROPS Y EMITS ---
const props = defineProps<{
    publications: any[];
    activeItem: number;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

// --- LOGIC ---
// Extraemos de forma reactiva la publicación activa actual
const publication = computed(() => {
    if (props.activeItem !== -1 && props.publications[props.activeItem]) {
        return props.publications[props.activeItem];
    }
    return null;
});

// Manejo del estado del carrusel de imágenes
const activeImageIndex = ref(0);

// Cada vez que cambie el item activo del modal, reiniciamos el carrusel a la primera imagen
watch(() => props.activeItem, () => {
    activeImageIndex.value = 0;
});

const nextImage = () => {
    if (!publication.value?.images) return;
    if (activeImageIndex.value < publication.value.images.length - 1) {
        activeImageIndex.value++;
    } else {
        activeImageIndex.value = 0;
    }
};

const prevImage = () => {
    if (!publication.value?.images) return;
    if (activeImageIndex.value > 0) {
        activeImageIndex.value--;
    } else {
        activeImageIndex.value = publication.value.images.length - 1;
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
        v-if="publication" 
        class="relative flex flex-col w-11/12 max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-secondary-background border border-primary/20 rounded-2xl overflow-hidden shadow-2xl text-foreground"
    >
        <button 
            @click="emit('close')"
            class="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/60 hover:bg-primary hover:text-black border border-primary/20 transition-all duration-200 group"
            title="Cerrar ventana"
        >
            <XIcon class="size-5 transition-transform group-hover:rotate-90" />
        </button>

        <div class="grid grid-cols-1 md:grid-cols-12 overflow-y-auto w-full">
            
            <div class="md:col-span-5 bg-black/40 relative flex flex-col justify-center min-h-75 md:min-h-full border-b md:border-b-0 md:border-r border-primary/10">
                
                <div class="relative w-full h-full min-h-70 flex items-center justify-center overflow-hidden group">
                    <img 
                        v-if="publication.images && publication.images.length > 0"
                        :src="`/storage/${publication.images[activeImageIndex].path}`" 
                        :alt="publication.name"
                        class="w-full h-full object-cover max-h-95 md:max-h-full transition-transform duration-300"
                    />
                    <div v-else class="flex flex-col items-center justify-center text-foreground/30 gap-2 p-8">
                        <TagIcon class="size-12 opacity-40" />
                        <span class="text-xs italic">Sin imágenes disponibles</span>
                    </div>

                    <template v-if="publication.images && publication.images.length > 1">
                        <button 
                            @click="prevImage"
                            class="absolute left-3 p-1.5 rounded-lg bg-background/80 hover:bg-primary hover:text-black border border-primary/20 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeftIcon class="size-5" />
                        </button>
                        <button 
                            @click="nextImage"
                            class="absolute right-3 p-1.5 rounded-lg bg-background/80 hover:bg-primary hover:text-black border border-primary/20 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRightIcon class="size-5" />
                        </button>
                    </template>
                </div>

                <div 
                    v-if="publication.images && publication.images.length > 1" 
                    class="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4 z-10"
                >
                        <!-- @click="activeImageIndex = index" -->
                    <button
                        v-for="(img, index) in publication.images"
                        :key="img.id"
                        class="h-1.5 transition-all duration-300 rounded-full"
                        :class="index === activeImageIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/70'"
                    ></button>
                </div>
            </div>

            <div class="md:col-span-7 p-6 md:p-8 flex flex-col space-y-6 justify-between">
                
                <div class="space-y-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md bg-amber-200 text-amber-800 border-amber-500/50 ">
                            <TagIcon class="size-3" />
                            {{ publication.category?.name || 'Aviso' }}
                        </span>

                        <span 
                            class="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md border"
                            :class="statusMap[publication.status]?.color || 'bg-gray-500/10 border-gray-500/30 text-gray-400'"
                        >
                            <component :is="statusMap[publication.status]?.icon" class="size-3" />
                            {{ statusMap[publication.status]?.text || publication.status }}
                        </span>
                    </div>

                    <h2 class="text-2xl font-brand font-bold tracking-tight text-foreground leading-snug">
                        {{ publication.name }}
                    </h2>
                </div>

                <div class="grid grid-cols-2 gap-4 p-4 rounded-xl bg-background/40 border border-primary/5 text-sm">
                    <div class="flex items-center gap-2.5 text-foreground/80">
                        <MapPinIcon class="size-4 text-primary" />
                        <div>
                            <p class="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold leading-none mb-0.5">Ubicación</p>
                            <p class="font-medium">{{ publication.city }}, {{ publication.state }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2.5 text-foreground/80">
                        <CalendarIcon class="size-4 text-primary" />
                        <div>
                            <p class="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold leading-none mb-0.5">Fecha Publicación</p>
                            <p class="font-medium">{{ formatDate(publication.published_at || publication.created_at) }}</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-2 flex-1">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-foreground/40">Detalles del anuncio</h3>
                    <div class="p-4 rounded-xl border border-primary/10 bg-background/20 max-h-45 overflow-y-auto text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                        {{ publication.description }}
                    </div>
                </div>
 
                
            </div>
        </div>
    </div>
</template>
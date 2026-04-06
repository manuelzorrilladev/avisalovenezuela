<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import {
    CameraIcon,
    TrashIcon,
    StarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-vue-next';
import { computed, reactive, ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { type FullCategory } from '@/types/publication';

interface ImagePreview {
    id: string;
    file: File;
    url: string;
}

const props = defineProps<{
    categories: FullCategory[];
    errors:object
}>();
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de control',
        href: dashboard().url,
    },
    {
        title: 'Crear publicación',
        href: `${dashboard().url}/publicaciones/crear`,
    },
];

const actualCategory = ref('');

const specsStructure: any = reactive({
    vehiculos: {
        marca: '',
        año: '',
        modelo: '',
        kilometraje: '',
        transmision: '',
    },
    inmuebles: { habitaciones: '', baños: '', area: '', estacionamiento: '' },
    empleos: { tipo_empleo: '', experiencia: '', salario: '' },
    servicios: { precio_minimo: '', duracion: '' },
});

const labels: Record<string, string> = {
    marca: 'Marca',
    año: 'Año',
    modelo: 'Modelo',
    kilometraje: 'Kilometraje',
    transmision: 'Transmisión',

    habitaciones: 'Habitaciones',
    baños: 'Baños',
    area: 'Área (m²)',
    estacionamiento: 'Puestos de estacionamiento',

    tipo_empleo: 'Tipo de empleo',
    experiencia: 'Experiencia requerida',
    salario: 'Salario estimado',

    precio_minimo: 'Precio mínimo',
    duracion: 'Duración del servicio',
};

const form = useForm({
    title: '',
    category: 0,
    sub_category: 0,
    item_type: 0,
    description: '',
    price: '',
    state: '',
    city: '',
    condition: 'Usado',
    specs: {},
    images: [] as File[],
});

const availableSubCategories = computed(() => {
    return form.category
        ? props.categories[form.category - 1].sub_categories
        : [];
});

const availableItemTypes = computed(() => {
    if (form.category && form.sub_category && form.category == 1) {
        return (
            props.categories[form.category - 1].sub_categories[
                form.sub_category
            ].tags || []
        );
    }
    return [];
});

const onCategoryChange = () => {
    form.sub_category = 0;
    form.item_type = 0;
    actualCategory.value = props.categories[form.category - 1].slug;
    console.log('changed');
};

const onSubCategoryChange = () => {
    form.item_type = 0;
};

// IMAGES

const previews = ref<ImagePreview[]>([]);

const handleFileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;

    const remainingSlots = 5 - previews.value.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            previews.value.push({
                id: Math.random().toString(36).substr(2, 9),
                file: file,
                url: event.target?.result as string,
            });
            syncImagesWithForm();
        };
        reader.readAsDataURL(file);
    });
};

const removeImage = (index: number) => {
    previews.value.splice(index, 1);
    syncImagesWithForm();
};

const moveImage = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= previews.value.length) return;

    const temp = previews.value[index];
    previews.value[index] = previews.value[newIndex];
    previews.value[newIndex] = temp;
    syncImagesWithForm();
};

const setAsCover = (index: number) => {
    const cover = previews.value.splice(index, 1)[0];
    previews.value.unshift(cover);
    syncImagesWithForm();
};

const syncImagesWithForm = () => {
    form.images = previews.value.map((p) => p.file);
};

// =======================

function fillFormDebug() {
    form.title = 'Titulo de prueba';
    form.category = 2;
    form.sub_category = 4;
    form.item_type = 1;
    form.description = 'asdasd';
    form.price = '54545';
    form.state = 'adasd';
    form.city = 'asdasd';
    form.condition = 'Usado';
}

const submit = () => {
    form.specs = specsStructure[actualCategory.value];
    console.log(form);

    form.post('/publicacion/crear', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            previews.value = [];
        },
    });
};
</script>

<template>
    <Head title="Crear publicación" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-4 md:p-10">
            <form @submit.prevent="submit" class="space-y-6">
                <div
                    class="rounded-xl border border-primary/50 bg-secondary-background/50 p-6 shadow-md shadow-primary/10"
                >
                    <h3
                        @click="fillFormDebug()"
                        class="mb-6 border-b border-primary/20 pb-2 font-brand text-xl font-bold"
                    >
                        Información del Anuncio {{ form }}
                    </h3>

                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-2 md:col-span-2">
                            <label class="text-sm font-semibold italic"
                                >¿Qué estás avisando?</label
                            >
                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="Ej. Vendo Toyota Corolla 2015 en Chacao"
                                class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div
                            class="flex flex-col justify-between gap-2 md:flex-row"
                        >
                            <div class="flex w-full flex-col gap-2 md:w-1/2">
                                <label class="text-sm font-semibold italic"
                                    >Categoría {{ form.category }}
                                </label>
                                <select
                                    v-model="form.category"
                                    @change="onCategoryChange"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 transition-all outline-none focus:border-primary"
                                >
                                    <option value="0" disabled>
                                        Selecciona una opción
                                    </option>
                                    <option
                                        v-for="(subs, cat) in props.categories"
                                        :key="cat"
                                        :value="subs.id"
                                    >
                                        {{ subs.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex w-full flex-col gap-2 md:w-1/2">
                                <label class="text-sm font-semibold italic"
                                    >Subcategoría
                                </label>
                                <select
                                    v-model="form.sub_category"
                                    :disabled="!form.category"
                                    @change="onSubCategoryChange"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 transition-all outline-none focus:border-primary disabled:opacity-50"
                                >
                                    <option value="0" default disabled>
                                        Primero elige una categoría
                                    </option>
                                    <option
                                        v-for="sub in availableSubCategories"
                                        :key="sub.id"
                                        :value="sub.id"
                                    >
                                        {{ sub.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div
                            v-if="availableItemTypes.length > 0"
                            class="flex flex-col gap-2 md:col-span-2"
                        >
                            <label class="text-sm font-semibold italic"
                                >Tipo específico</label
                            >
                            <select
                                v-model="form.item_type"
                                class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 transition-all outline-none focus:border-primary"
                            >
                                <option value="0" disabled>
                                    Selecciona el tipo
                                </option>
                                <option
                                    v-for="type in availableItemTypes"
                                    :key="type.id"
                                    :value="type.id"
                                >
                                    {{ type.name }}
                                </option>
                            </select>
                        </div>

                        <div class=" ">
                            <h3
                                class="font-brand text-xl font-bold text-foreground"
                            >
                                Imágenes (Máx. 5)
                            </h3>
                            <span class="text-xs text-foreground italic"
                                >La primera imagen será la de portada</span
                            >
                        </div>

                        <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
                            <div
                                v-for="(img, index) in previews"
                                :key="img.id"
                                class="group relative aspect-square overflow-hidden rounded-lg border-2"
                                :class="
                                    index === 0
                                        ? 'border-primary'
                                        : 'border-primary/20'
                                "
                            >
                                <img
                                    :src="img.url"
                                    class="h-full w-full object-cover"
                                />

                                <div
                                    v-if="index === 0"
                                    class="absolute top-1 left-1 flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-black"
                                >
                                    <StarIcon class="size-3 fill-black" />
                                    PORTADA
                                </div>

                                <div
                                    class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <div class="flex gap-2">
                                        <button
                                            @click.prevent="
                                                moveImage(index, 'left')
                                            "
                                            v-if="index > 0"
                                            class="rounded-full bg-white/20 p-1 hover:bg-primary hover:text-black"
                                        >
                                            <ChevronLeftIcon class="size-4" />
                                        </button>
                                        <button
                                            @click.prevent="
                                                moveImage(index, 'right')
                                            "
                                            v-if="index < previews.length - 1"
                                            class="rounded-full bg-white/20 p-1 hover:bg-primary hover:text-black"
                                        >
                                            <ChevronRightIcon class="size-4" />
                                        </button>
                                    </div>
                                    <button
                                        @click.prevent="setAsCover(index)"
                                        v-if="index !== 0"
                                        class="text-[10px] font-bold text-white hover:text-primary"
                                    >
                                        PONER DE PORTADA
                                    </button>
                                    <button
                                        @click.prevent="removeImage(index)"
                                        class="mt-1 text-red-400 hover:text-red-500"
                                    >
                                        <TrashIcon class="size-5" />
                                    </button>
                                </div>
                            </div>

                            <label
                                v-if="previews.length < 5"
                                class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background/50 transition-colors hover:bg-primary/10"
                            >
                                <CameraIcon
                                    class="mb-2 size-8 text-primary/60"
                                />
                                <span class="text-[10px] font-bold uppercase"
                                    >Subir Foto</span
                                >
                                <input
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    multiple
                                    @change="handleFileSelect"
                                />
                            </label>
                        </div>

                        <!--  -->

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-semibold italic"
                                    >Estado (Ubicación)</label
                                >
                                <input
                                    v-model="form.state"
                                    type="text"
                                    placeholder="Ej. Miranda"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-semibold italic"
                                    >Ciudad</label
                                >
                                <input
                                    v-model="form.city"
                                    type="text"
                                    placeholder="Ej. Caracas"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-semibold italic"
                                    >Condición</label
                                >
                                <select
                                    v-model="form.condition"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                >
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Usado">Usado</option>
                                    <option value="N/A">
                                        No aplica / Servicio
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                                class="mb-2 block text-sm font-semibold text-foreground italic"
                                >Descripción</label
                            >
                            <textarea
                                v-model="form.description"
                                rows="3"
                                class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                placeholder="Publica la descripción de tu producto/servicio."
                            ></textarea>
                        </div>

                        <div
                            class="grid grid-cols-3 gap-4"
                            v-if="actualCategory != ''"
                        >
                            <div
                                class="flex flex-col gap-2"
                                v-for="(value, key) in specsStructure[
                                    actualCategory
                                ]"
                                :key="key"
                            >
                                <label class="text-sm font-semibold italic">{{
                                    labels[key]
                                }}</label>
                                <input
                                    v-model="
                                        specsStructure[actualCategory][key]
                                    "
                                    type="text"
                                    placeholder="Ej. Caracas"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        <!-- specsStructure[actualCategory]
                        <div>
                            <label
                                class="mb-2 block text-sm font-semibold text-foreground italic"
                                >Especificaciones Técnicas (Opcional)</label
                            >
                            <textarea
                                v-model="form.specs"
                                rows="3"
                                class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                placeholder="Ej. Motor 2.0, Kilometraje 50.000, 3 Habitaciones..."
                            ></textarea>
                        </div> -->
                    </div>
                </div>

                <div class="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        class="px-6 py-2 font-semibold text-foreground hover:underline"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="w-fit cursor-pointer rounded-lg border border-primary bg-primary px-3 py-2 text-center font-semibold text-black duration-200 hover:bg-white dark:border-black dark:bg-black dark:text-primary dark:hover:bg-white"
                    >
                        {{
                            form.processing
                                ? 'Publicando...'
                                : 'Publicar Anuncio'
                        }}
                    </button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>

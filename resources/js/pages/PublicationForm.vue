<script setup lang="ts">
import { Head, useForm,Link } from '@inertiajs/vue3';
import {
    CameraIcon,
    TrashIcon,
    StarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';
import CityDropdown from '@/components/shared/CityDropdown.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { type Publication, type FullCategory } from '@/types/publication';
interface ImagePreview {
    id: string;
    file?: File;
    url: string;
    isExisting?: boolean;
}

const props = defineProps<{
    categories: FullCategory[];
    results?: Publication;
    isEditing?: boolean;
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
        marca: props.results?.specs.marca ?? '',
        año: props.results?.specs.año ?? '',
        modelo: props.results?.specs.modelo ?? '',
        kilometraje: props.results?.specs.kilometraje ?? '',
        transmision: props.results?.specs.transmision ?? '',
    },
    inmuebles: {
        habitaciones: props.results?.specs.habitaciones ?? '',
        baños: props.results?.specs.baños ?? '',
        area: props.results?.specs.area ?? '',
        estacionamiento: props.results?.specs.estacionamiento ?? '',
    },
    empleos: {
        tipo_empleo: props.results?.specs.tipo_empleo ?? '',
        experiencia: props.results?.specs.experiencia ?? '',
        salario: props.results?.specs.salario ?? '',
    },
    servicios: {
        precio_minimo: props.results?.specs.precio_minimo ?? '',
        duracion: props.results?.specs.duracion ?? '',
    },
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
    title: props.results?.name ?? '',
    category: props.results?.category_id ?? 0,
    sub_category: props.results?.sub_category_id ?? 0,
    item_type: props.results?.tag_id ?? 0,
    description: props.results?.description ?? '',
    state: props.results?.state ?? '',
    city: props.results?.city ?? '',
    condition: props.results?.condition ?? 'Usado',
    specs: props.results?.specs ?? ({} as any),
    images: [] as File[],
    existing_images: [] as string[],
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
    form.images = previews.value
        .filter((p) => p.file)
        .map((p) => p.file as File);

    form.existing_images = previews.value
        .filter((p) => p.isExisting)
        .map((p) => p.url);
};

const getSpecError = (key: string) => {
    return (form.errors as Record<string, string | string[] | undefined>)[
        `specs.${key}`
    ];
};

// =======================

const submit = () => {
    form.specs = specsStructure[actualCategory.value];

    const url = props.isEditing
        ? `/dashboard/publicacion/${props.results?.id}`
        : '/dashboard/publicacion';
   
    form.post(url, {
        forceFormData: true,
        preserveScroll: true,
        _method: props.isEditing ? 'put' : 'post',
        onSuccess: () => {
            if (!props.isEditing) {
                form.reset();
                previews.value = [];
            }
        },
    });
};

onMounted(() => {
    if (props.results) {
        actualCategory.value = props.categories[form.category - 1].slug;

        if (props.results.images && Array.isArray(props.results.images)) {
            props.results.images.map((object) => {
                const itemToPush: ImagePreview = {
                    id: 'object.id',
                    url: `/storage/${object.path}`,
                    isExisting: object.isExisting,
                };

                previews.value.push(itemToPush);
            });
        }
    }
});
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
                        class="mb-6 border-b border-primary/20 pb-2 font-brand text-xl font-bold"
                    >
                        Información del Anuncio 
                    </h3>

                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-2 md:col-span-2">
                            <label class="text-sm font-semibold italic"
                                >¿Qué estás avisando?</label
                            >
                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="Ej. Vendo Toyota Corolla 2015"
                                class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                :class="{
                                    'border-red-500': form.errors.title,
                                }"
                            />
                            <span
                                v-if="form.errors.title"
                                class="text-xs text-red-500"
                                >{{ form.errors.title }}</span
                            >
                        </div>

                        <div
                            class="flex flex-col justify-between gap-2 md:flex-row"
                        >
                            <div class="flex w-full flex-col gap-2 md:w-1/2">
                                <label class="text-sm font-semibold italic"
                                    >Categoría
                                </label>
                                <select
                                    v-model="form.category"
                                    @change="onCategoryChange"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 transition-all outline-none focus:border-primary"
                                    :class="{
                                        'border-red-500': form.errors.category,
                                    }"
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
                                <span
                                    v-if="form.errors.category"
                                    class="text-xs text-red-500"
                                    >{{ form.errors.category }}</span
                                >
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
                                    :class="{
                                        'border-red-500':
                                            form.errors.sub_category,
                                    }"
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
                                <span
                                    v-if="form.errors.sub_category"
                                    class="text-xs text-red-500"
                                    >{{ form.errors.sub_category }}</span
                                >
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
                                :class="{
                                    'border-red-500': form.errors.item_type,
                                }"
                            >
                                <option value="1" disabled>
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
                            <span
                                v-if="form.errors.item_type"
                                class="text-xs text-red-500"
                                >{{ form.errors.item_type }}</span
                            >
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
                                    :class="{
                                        'border-red-500': form.errors.images,
                                    }"
                                />
                            </label>
                            <span
                                v-if="form.errors.images"
                                class="mt-1 block text-xs text-red-500"
                                >{{ form.errors.images }}</span
                            >
                        </div>

                        <!--  -->

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <CityDropdown
                                    type="state"
                                    v-model="form.state"
                                    @update:model-value="form.city = ''"
                                    :class="{
                                        'border-red-500': form.errors.state,
                                    }"
                                />
                                <span
                                    v-if="form.errors.state"
                                    class="text-xs text-red-500"
                                    >{{ form.errors.state }}</span
                                >
                            </div>
                            <div>
                                <CityDropdown
                                    type="city"
                                    v-model="form.city"
                                    :selected-state="form.state"
                                    :class="{
                                        'border-red-500': form.errors.city,
                                    }"
                                />
                                <span
                                    v-if="form.errors.city"
                                    class="text-xs text-red-500"
                                    >{{ form.errors.city }}</span
                                >
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-semibold italic"
                                    >Condición </label
                                >
                                <select
                                    v-model="form.condition"
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                    :class="{
                                        'border-red-500': form.errors.condition,
                                    }"
                                >
                                    <option value="nuevo">Nuevo</option>
                                    <option value="usado">Usado</option>
                                    <option value="N/A">
                                        No aplica / Servicio
                                    </option>
                                </select>
                                <span
                                    v-if="form.errors.condition"
                                    class="text-xs text-red-500"
                                    >{{ form.errors.condition }}</span
                                >
                            </div>
                        </div>

                        <div>
                            <label
                                class="mb-2 block text-sm font-semibold text-foreground italic"
                                >Descripción</label
                            >
                            <textarea
                                v-model="form.description"
                                maxlength="255"
                                rows="3"
                                class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                placeholder="Publica la descripción de tu producto/servicio."
                            ></textarea>
                            <span
                                class="text-xs opacity-40"
                                :class="
                                    form.description.length == 255
                                        ? 'text-red-500'
                                        : ''
                                "
                                >{{ form.description.length }}/255 (Min
                                20)</span
                            >
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
                                    placeholder="..."
                                    class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary"
                                    :class="[
                                        'w-full rounded-lg border bg-background px-4 py-2 transition-all outline-none focus:border-primary',
                                        getSpecError(key as string)
                                            ? 'border-red-500'
                                            : 'border-primary/30',
                                    ]"
                                />
                                <span
                                    v-if="getSpecError(key as string)"
                                    class="text-xs font-medium text-red-500"
                                >
                                    {{ getSpecError(key as string) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-4 pt-4">
                    <Link
                        href="/dashboard"
                        class="px-6 py-2 font-semibold text-foreground hover:underline"
                    >
                        Cancelar
                    </Link>

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

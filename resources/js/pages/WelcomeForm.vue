<script setup lang="ts">
import { Head, useForm, Link } from '@inertiajs/vue3';
import {
    CameraIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BriefcaseIcon,
    ShoppingBagIcon,
    MegaphoneIcon,
    UserIcon,
    MailIcon,
    FileTextIcon,
    KeyIcon,
    TagIcon,
    UsersIcon,
    TvIcon,
    HeartCrackIcon,
} from 'lucide-vue-next';

import { ref, computed } from 'vue';

interface CategoryLabel {
    value: string;
    label: string;
    icon: any;
}

// Estado del Multi-step
const currentStep = ref(1);
const totalSteps = 4;
const categories: CategoryLabel[] = [
    { value: 'alquiler', label: 'Alquiler', icon: KeyIcon },
    { value: 'venta', label: 'Venta', icon: TagIcon },
    { value: 'compra', label: 'Compra', icon: ShoppingBagIcon },
    { value: 'empleo', label: 'Empleo', icon: BriefcaseIcon },
    {
        value: 'busqueda_personal',
        label: 'Búsqueda de Personal',
        icon: UsersIcon,
    },
    { value: 'valla_digital', label: 'Valla Digital', icon: TvIcon },
    { value: 'obituario', label: 'Obituario', icon: HeartCrackIcon },
    { value: 'convocatoria', label: 'Convocatoria', icon: MegaphoneIcon },
];
// Formulario de Inertia adaptado a los nuevos requerimientos
const form = useForm({
    // PASO 1
    category_type: '', // 'vehiculo_propiedad', 'empleo', 'producto_servicio', 'otro'

    // PASO 2
    title: '',
    description: '',
    images: [] as File[],

    // PASO 3
    contact_name: '',
    contact_email: '',
    contact_phone: '',

    // PASO 4
    identity_document: null as File | null,
    payment_receipt: null as File | null,
});

// Previsualizaciones de imágenes para el paso 2 (Máx 4 imágenes, 5MB c/u)
interface ImagePreview {
    id: string;
    file: File;
    url: string;
}
const previews = ref<ImagePreview[]>([]);
const imageError = ref('');

const handleFileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;

    imageError.value = '';
    const remainingSlots = 4 - previews.value.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
            imageError.value = 'Las imágenes no deben superar los 5MB';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            previews.value.push({
                id: Math.random().toString(36).substring(2, 9),
                file: file,
                url: event.target?.result as string,
            });
            form.images = previews.value.map((p) => p.file);
        };
        reader.readAsDataURL(file);
    });
};

const removeImage = (index: number) => {
    previews.value.splice(index, 1);
    form.images = previews.value.map((p) => p.file);
};

// Manejo de Documentos (Paso 4)
const handleIdentityFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        form.identity_document = target.files[0];
    }
};

const handlePaymentFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        form.payment_receipt = target.files[0];
    }
};

// Validaciones por paso para habilitar el botón "Siguiente"
const isStepValid = computed(() => {
    switch (currentStep.value) {
        case 1:
            return form.category_type !== '';
        case 2:
            return (
                form.title.trim().length > 0 &&
                form.title.length <= 60 &&
                form.description.trim().length >= 20
            );
        case 3:
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return (
                form.contact_name.trim().length > 0 &&
                emailRegex.test(form.contact_email) &&
                form.contact_phone.trim().length >= 8
            );
        case 4:
            return (
                form.identity_document !== null && form.payment_receipt !== null
            );
        default:
            return false;
    }
});

// Navegación
const nextStep = () => {
    if (currentStep.value < totalSteps && isStepValid.value) {
        currentStep.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Envío del Formulario
const submit = () => {
    if (!isStepValid.value) return;
    console.log(form);
    form.post('/welcome-form/', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            // Nota: La redirección a la "Thank you page" se maneja idealmente desde el controlador de Laravel,
            // retornando un redirect()->route('gracias')
            form.reset();
            previews.value = [];
            currentStep.value = 1;
        },
    });
};
</script>

<template>
    <Head title="Crear publicación" />

    <div class="file-uploader-mobile-first mx-auto max-w-3xl p-4 md:p-10">
        <div
            class="mb-8 rounded-xl border border-primary/20 bg-secondary-background/30 p-4 shadow-sm shadow-primary/5"
        >
            <div
                class="mb-2 flex items-center justify-between text-sm font-semibold text-foreground italic"
            >
                <span>Progreso del aviso</span>
                <span class="font-brand text-primary"
                    >Paso {{ currentStep }} de {{ totalSteps }}</span
                >
            </div>
            <div
                class="h-2.5 w-full overflow-hidden rounded-full bg-primary/10"
            >
                <div
                    class="h-2.5 bg-primary transition-all duration-300 ease-out"
                    :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                ></div>
            </div>
        </div>

        <form @submit.prevent="submit" class="space-y-6">
            <div
                class="rounded-xl border border-primary/50 bg-secondary-background/50 p-6 shadow-md shadow-primary/10"
            >
                <div v-if="currentStep === 1" class="space-y-6">
                    <div class="border-b border-primary/20 pb-2">
                        <h3 class="font-brand text-xl font-bold">
                            ¿Qué tipo de aviso deseas publicar?
                        </h3>
                        <p class="mt-1 text-xs text-foreground/70 italic">
                            Selecciona una opción para continuar
                        </p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label
                            v-for="category in categories"
                            :key="category.value"
                            class="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-6 text-center transition-all duration-200"
                            :class="
                                form.category_type === category.value
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-primary/20 bg-background/50 text-foreground hover:border-primary/50'
                            "
                        >
                            <input
                                type="radio"
                                v-model="form.category_type"
                                :value="category.value"
                                class="hidden"
                            />
                            <component
                                :is="category.icon"
                                class="mb-3 size-10"
                            />
                            <span class="text-sm font-bold">{{
                                category.label
                            }}</span>
                        </label>
                    </div>
                </div>
                <div v-if="currentStep === 2" class="space-y-6">
                    <div class="border-b border-primary/20 pb-2">
                        <h3 class="font-brand text-xl font-bold">
                            Detalles de tu Anuncio
                        </h3>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold italic"
                            >Título del aviso *</label
                        >
                        <input
                            v-model="form.title"
                            type="text"
                            maxlength="60"
                            placeholder="Ej: Vendo Aveo 2011 o Busco Diseñador Gráfico"
                            class="w-full rounded-lg border border-primary/30 bg-background px-4 py-3 text-base transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            :class="{ 'border-red-500': form.errors.title }"
                        />
                        <div class="flex justify-between text-xs opacity-50">
                            <span>{{ form.errors.title || '' }}</span>
                            <span>{{ form.title.length }}/60</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold italic"
                            >Detalles del aviso *</label
                        >
                        <textarea
                            v-model="form.description"
                            rows="5"
                            placeholder="Cuéntanos los detalles importantes (precio, ubicación, características o requisitos de contacto)"
                            class="w-full rounded-lg border border-primary/30 bg-background px-4 py-3 text-base transition-all outline-none focus:border-primary"
                            :class="{
                                'border-red-500': form.errors.description,
                            }"
                        ></textarea>
                        <div class="flex justify-between text-xs opacity-50">
                            <span
                                :class="
                                    form.description.length < 20 &&
                                    form.description.length > 0
                                        ? 'text-amber-500'
                                        : ''
                                "
                            >
                                Mínimo 20 caracteres (llevas
                                {{ form.description.length }})
                            </span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-semibold italic"
                                >Imágenes de referencia (Opcional)</label
                            >
                            <span
                                class="block text-[11px] text-foreground/70 italic"
                                >Formatos: JPG, PNG. Máximo 4 fotos. Límite 5MB
                                por imagen.</span
                            >
                        </div>

                        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                                <button
                                    @click.prevent="removeImage(index)"
                                    class="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-red-400 transition-colors hover:text-red-500"
                                >
                                    <TrashIcon class="size-4" />
                                </button>
                            </div>

                            <label
                                v-if="previews.length < 4"
                                class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background/50 transition-colors hover:bg-primary/10"
                            >
                                <CameraIcon
                                    class="mb-2 size-8 text-primary/60"
                                />
                                <span
                                    class="text-[10px] font-bold tracking-wider uppercase"
                                    >Subir Foto</span
                                >
                                <input
                                    type="file"
                                    class="hidden"
                                    accept="image/png, image/jpeg, image/jpg"
                                    multiple
                                    @change="handleFileSelect"
                                />
                            </label>
                        </div>
                        <span
                            v-if="imageError"
                            class="block text-xs text-amber-500"
                            >{{ imageError }}</span
                        >
                        <span
                            v-if="form.errors.images"
                            class="block text-xs text-red-500"
                            >{{ form.errors.images }}</span
                        >
                    </div>
                </div>

                <div v-if="currentStep === 3" class="space-y-6">
                    <div class="border-b border-primary/20 pb-2">
                        <h3 class="font-brand text-xl font-bold">
                            Datos de Contacto
                        </h3>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold italic"
                            >Nombre y Apellido *</label
                        >
                        <div class="relative flex items-center">
                            <UserIcon
                                class="absolute left-4 size-5 text-primary/60"
                            />
                            <input
                                v-model="form.contact_name"
                                type="text"
                                placeholder="Ingresa tu nombre completo"
                                class="w-full rounded-lg border border-primary/30 bg-background py-3 pr-4 pl-12 text-base transition-all outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold italic"
                            >Correo Electrónico *</label
                        >
                        <div class="relative flex items-center">
                            <MailIcon
                                class="absolute left-4 size-5 text-primary/60"
                            />
                            <input
                                v-model="form.contact_email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                class="w-full rounded-lg border border-primary/30 bg-background py-3 pr-4 pl-12 text-base transition-all outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold italic"
                            >Teléfono / WhatsApp *</label
                        >
                        <div class="relative flex items-center">
                            <span
                                class="absolute left-4 border-r border-primary/20 pr-2 text-sm font-bold text-primary/80"
                                >+58</span
                            >
                            <input
                                v-model="form.contact_phone"
                                type="tel"
                                placeholder="4121234567"
                                class="w-full rounded-lg border border-primary/30 bg-background py-3 pr-4 pl-16 text-base transition-all outline-none focus:border-primary"
                            />
                        </div>
                        <span class="text-xs text-foreground/70 italic">
                            Te contactaremos por aquí para mostrarte el diseño
                            antes de publicarlo.
                        </span>
                    </div>
                </div>

                <div v-if="currentStep === 4" class="space-y-6">
                    <div class="border-b border-primary/20 pb-2">
                        <h3 class="font-brand text-xl font-bold">
                            Documento de Identidad
                        </h3>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div>
                            <label class="block text-sm font-semibold italic"
                                >Documento de Identidad (Cédula) *</label
                            >
                            <span
                                class="block text-xs text-foreground/70 italic"
                                >Se requiere foto nítida o archivo PDF.</span
                            >
                        </div>

                        <label
                            class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background/50 p-5 transition-colors hover:bg-primary/5"
                        >
                            <FileTextIcon class="mb-2 size-8 text-primary/60" />
                            <span
                                class="max-w-[250px] truncate text-center text-xs font-semibold"
                            >
                                {{
                                    form.identity_document
                                        ? form.identity_document.name
                                        : 'Tomar Foto o Elegir PDF'
                                }}
                            </span>
                            <input
                                type="file"
                                class="hidden"
                                accept="image/*,application/pdf"
                                capture="environment"
                                @change="handleIdentityFile"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col-reverse items-center justify-between gap-4 pt-4 sm:flex-row"
            >
                <button
                    v-if="currentStep > 1"
                    type="button"
                    @click="prevStep"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 px-6 py-3 font-semibold text-foreground transition-colors hover:bg-primary/10 sm:w-auto"
                >
                    <ChevronLeftIcon class="size-5" />
                    Atrás
                </button>
                <Link
                    v-else
                    href="/dashboard"
                    class="w-full px-6 py-3 text-center font-semibold text-foreground/70 hover:underline sm:w-auto"
                >
                    Cancelar
                </Link>

                <button
                    v-if="currentStep < totalSteps"
                    type="button"
                    @click="nextStep"
                    :disabled="!isStepValid"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-8 py-3.5 font-bold text-black transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto dark:border-black dark:bg-black dark:text-primary dark:hover:bg-white"
                >
                    Siguiente
                    <ChevronRightIcon class="size-5" />
                </button>

                <button
                    v-else
                    type="submit"
                    :disabled="!isStepValid || form.processing"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-8 py-3.5 font-bold text-black shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 sm:w-auto dark:border-black dark:bg-black dark:text-primary dark:hover:bg-white"
                >
                    {{
                        form.processing
                            ? 'Procesando...'
                            : '¡Listo, creen mi aviso! 🚀'
                    }}
                </button>
            </div>
        </form>
    </div>
</template>

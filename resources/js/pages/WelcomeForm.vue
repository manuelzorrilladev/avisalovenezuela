<script setup lang="ts">
import type { PageProps } from '@inertiajs/core';
import { Head, useForm, Link, usePage } from '@inertiajs/vue3';
import {
    CameraIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BriefcaseIcon,
    ShoppingBagIcon,
    MegaphoneIcon,
    TagIcon,
    UsersIcon,
    TvIcon,
    HeartCrackIcon,
    Ellipsis,
    HandHeart,
    KeyIcon,
} from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import CityDropdown from '@/components/shared/CityDropdown.vue';
import { useFormStore } from '@/state/formState';

// --- CONSTANTES Y CONFIGURACIONES ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 4;
const TOTAL_STEPS = 3;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDENTITY_REGEX = /^[VEPJ]-\d{6,9}$/;

// --- INTERFACES ---
interface CategoryLabel {
    value: string;
    label: string;
    icon: any;
}

interface ImagePreview {
    id: string;
    file: File;
    url: string;
}

// --- STORES & HOOKS ---
const formStore = useFormStore();
const page = usePage<PageProps>();

const { form, docType, docNumber, errors } = storeToRefs(formStore);

// --- ESTADO REACTIVO ---
const currentStep = ref(1);
const previews = ref<ImagePreview[]>([]);
const imageError = ref('');
const processing = ref(false)

// Extraemos el usuario autenticado de forma segura
const user = computed(() => page.props.auth?.user || null);

const categories: CategoryLabel[] = [
    { value: 'alquiler', label: 'Alquiler', icon: KeyIcon },
    { value: 'venta', label: 'Venta', icon: TagIcon },
    { value: 'compra', label: 'Compra', icon: ShoppingBagIcon },
    { value: 'empleo', label: 'Empleo', icon: BriefcaseIcon },
    { value: 'servicios', label: 'Servicios', icon: HandHeart },
    { value: 'busqueda_personal', label: 'Búsqueda de Personal', icon: UsersIcon },
    { value: 'valla_digital', label: 'Valla Digital', icon: TvIcon },
    { value: 'obituario', label: 'Obituario', icon: HeartCrackIcon },
    { value: 'convocatoria', label: 'Convocatoria', icon: MegaphoneIcon },
    { value: 'otros', label: 'Otros', icon: Ellipsis },
];

// --- MANEJO DE MULTIMEDIA ---
const handleFileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;

    imageError.value = '';
    const remainingSlots = MAX_IMAGES - previews.value.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
            imageError.value = 'Las imágenes no deben superar los 5MB';
            return;
        }

        const previewUrl = URL.createObjectURL(file); // Optimización de rendimiento (No bloquea el hilo principal)
        
        previews.value.push({
            id: crypto.randomUUID().substring(0, 8), // Más rápido y estándar que Math.random()
            file,
            url: previewUrl,
        });
    });

    form.value.images = previews.value.map((p) => p.file);
};

const removeImage = (index: number) => {
    // Liberamos memoria del navegador asociada a la URL eliminada
    URL.revokeObjectURL(previews.value[index].url);
    
    previews.value.splice(index, 1);
    form.value.images = previews.value.map((p) => p.file);
};

// --- VALIDACIONES COMPUTADAS ---
const fullDocumentIdentity = computed(() => {
    if (!docNumber.value) return '';
    return `${docType.value}-${docNumber.value.trim()}`;
});

const isStepValid = computed(() => {
    switch (currentStep.value) {
        case 1:
            return form.value.category_type !== '';
        case 2:
            return (
                form.value.title.trim().length > 0 &&
                form.value.title.length <= 60 &&
                form.value.description.trim().length >= 20
            );
        case 3:
            return (
                form.value.contact_name.trim().length > 0 &&
                EMAIL_REGEX.test(form.value.contact_email) &&
                form.value.contact_phone.trim().length >= 8 &&
                IDENTITY_REGEX.test(form.value.identity_document) &&
                form.value.state !== '' &&
                form.value.city !== ''
            );
        default:
            return false;
    }
});

// --- NAVEGACIÓN ---
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const nextStep = () => {
    if (currentStep.value < TOTAL_STEPS && isStepValid.value) {
        currentStep.value++;
        scrollToTop();
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
        scrollToTop();
    }
};

// --- ENVÍO DEL FORMULARIO ---
const submit = () => {
    if (!isStepValid.value) return;

    // Redirección si el usuario no ha iniciado sesión
    if (!user.value) {
        window.location.href = '/register';
        return;
    }

    formStore.clearErrors();

    const formToSend = useForm({ ...form.value });
    processing.value = true
    formToSend.post('/publicacion', {
        forceFormData: true, // Forzar Multipart/FormData obligatorio para subir archivos binarios (Files)
        preserveScroll: true,
        onError: (backendErrors) => {
            formStore.setErrors(backendErrors); // Sincroniza los fallos de validación de Laravel en Pinia
        },
        onSuccess: () => {
            // Limpieza completa tras envío exitoso
            previews.value.forEach((p) => URL.revokeObjectURL(p.url));
            previews.value = [];
            formStore.resetForm();
            currentStep.value = 1;
            processing.value = false    

        },
    });
};

// --- LIFECYCLE & WATCHERS ---
onMounted(() => {
    if (user.value) {
        form.value.contact_name = user.value.name || '';
        form.value.contact_email = user.value.email || '';
        form.value.contact_phone = user.value.phone || '';
        
        if (user.value.id_card) {
            const [type, number] = user.value.id_card.split('-');
            docType.value = type || 'V';
            docNumber.value = number || '';
            form.value.identity_document = user.value.id_card;
        }
    }
});

watch([docType, docNumber], () => {
    form.value.identity_document = fullDocumentIdentity.value;
});
</script>

<template>
    <Head title="Crear publicación" />

    <div class="file-uploader-mobile-first w-full p-4 md:p-10">
        <h1 class="sr-only">Formulario de Creación de Avisos Publicitarios</h1>

        <div
            class="mb-8 rounded-xl border border-primary/20 bg-secondary-background/30 p-4 shadow-sm shadow-primary/5"
            role="progressbar"
            :aria-valuenow="currentStep"
            aria-valuemin="1"
            :aria-valuemax="TOTAL_STEPS"
            :aria-label="`Progreso del formulario: Paso ${currentStep} de ${TOTAL_STEPS}`"
        >
            <div
                class="mb-2 flex items-center justify-between text-sm font-semibold text-foreground italic"
            >
                <span>Progreso del aviso </span>
                <span class="font-brand text-primary" aria-hidden="true">
                    Paso {{ currentStep }} de {{ TOTAL_STEPS }}
                </span>
            </div>
            <div
                class="h-2.5 w-full overflow-hidden rounded-full bg-primary/10"
            >
                <div
                    class="h-2.5 bg-primary transition-all duration-300 ease-out"
                    :style="{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }"
                ></div>
            </div>
        </div>

        <form @submit.prevent="submit" class="space-y-6" novalidate>
            <div
                class="rounded-xl border border-primary/50 bg-secondary-background/50 p-6 shadow-md shadow-primary/10"
            >
                <div
                    v-if="currentStep === 1"
                    class="space-y-6"
                    role="radiogroup"
                    aria-labelledby="step1-title"
                >
                    <div class="border-b border-primary/20 pb-2">
                        <h2
                            id="step1-title"
                            class="font-brand text-xl font-bold"
                        >
                            ¿Qué tipo de aviso deseas publicar?
                        </h2>
                        <p class="mt-1 text-xs text-foreground/70 italic">
                            Selecciona una opción para continuar
                        </p>
                    </div>

                    <div
                        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
                    >
                        <label
                            v-for="category in categories"
                            :key="category.value"
                            class="flex min-h-35 cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-6 text-center transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:outline-none"
                            :class="
                                form.category_type === category.value
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-primary/20 bg-background/50 text-foreground hover:border-primary/50'
                            "
                            :aria-checked="
                                form.category_type === category.value
                            "
                        >
                            <input
                                type="radio"
                                v-model="form.category_type"
                                :value="category.value"
                                class="sr-only"
                            />
                            <component
                                :is="category.icon"
                                class="mb-3 size-10"
                                aria-hidden="true"
                            />
                            <span class="text-sm font-bold">{{
                                category.label
                            }}</span>
                        </label>
                    </div>
                </div>

                <div v-if="currentStep === 2" class="space-y-6">
                    <div class="border-b border-primary/20 pb-2">
                        <h2 class="font-brand text-xl font-bold">
                            Detalles de tu Anuncio
                        </h2>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="title" class="text-sm font-semibold italic">
                            Título del aviso
                            <span class="text-red-500" aria-hidden="true"
                                >*</span
                            ><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <input
                            id="title"
                            v-model="form.title"
                            type="text"
                            maxlength="60"
                            placeholder="Ej: Vendo Aveo 2011 o Busco Diseñador Gráfico"
                            class="w-full rounded-lg border border-primary/30 bg-background px-4 py-3 text-base transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            :class="{ 'border-red-500': errors.title }"
                            :aria-invalid="!!errors.title"
                            aria-describedby="title-info title-error"
                            required
                        />
                        <div class="flex justify-between text-xs opacity-50">
                            <span
                                id="title-error"
                                role="alert"
                                class="text-red-500"
                                >{{ errors.title || '' }}</span
                            >
                            <span id="title-info" aria-live="polite"
                                >{{ form.title.length }} de 60 caracteres
                                utilizados</span
                            >
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="description"
                            class="text-sm font-semibold italic"
                        >
                            Detalles del aviso
                            <span class="text-red-500" aria-hidden="true"
                                >*</span
                            ><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="5"
                            placeholder="Cuéntanos los detalles importantes (precio, ubicación, características o requisitos de contacto)"
                            class="w-full rounded-lg border border-primary/30 bg-background px-4 py-3 text-base transition-all outline-none focus:border-primary"
                            :class="{ 'border-red-500': errors.description }"
                            :aria-invalid="!!errors.description"
                            aria-describedby="description-info description-error"
                            required
                        ></textarea>
                        <div class="flex justify-between text-xs opacity-50">
                            <span
                                id="description-error"
                                role="alert"
                                class="text-red-500"
                                >{{ errors.description || '' }}</span
                            >
                            <span
                                id="description-info"
                                aria-live="polite"
                                :class="
                                    form.description.length < 20 &&
                                    form.description.length > 0
                                        ? 'font-semibold text-amber-500'
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
                            <span class="block text-sm font-semibold italic"
                                >Imágenes de referencia (Opcional)</span
                            >
                            <span
                                id="images-hint"
                                class="block text-[11px] text-foreground/70 italic"
                            >
                                Formatos: JPG, PNG. Máximo 4 fotos. Límite 5MB
                                por imagen.
                            </span>
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
                                    :alt="`Vista previa de imagen cargada ${index + 1}`"
                                    class="h-full w-full object-cover"
                                />
                                <button
                                    @click.prevent="removeImage(index)"
                                    class="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-red-400 transition-colors hover:text-red-500"
                                    :aria-label="`Eliminar imagen ${index + 1}`"
                                >
                                    <TrashIcon
                                        class="size-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <label
                                v-if="previews.length < 4"
                                for="file-upload"
                                class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background/50 transition-colors focus-within:ring-2 focus-within:ring-primary hover:bg-primary/10"
                            >
                                <CameraIcon
                                    class="mb-2 size-8 text-primary/60"
                                    aria-hidden="true"
                                />
                                <span
                                    class="text-[10px] font-bold tracking-wider uppercase"
                                    >Subir Foto</span
                                >
                                <input
                                    id="file-upload"
                                    type="file"
                                    class="sr-only"
                                    accept="image/png, image/jpeg, image/jpg"
                                    multiple
                                    aria-describedby="images-hint"
                                    @change="handleFileSelect"
                                />
                            </label>
                        </div>
                        <div
                            class="flex flex-col gap-1 text-xs font-semibold"
                            role="alert"
                        >
                            <span
                                v-if="imageError"
                                class="block text-amber-500"
                                >{{ imageError }}</span
                            >
                            <span
                                v-if="errors.images"
                                class="block text-red-500"
                                >{{ errors.images }}</span
                            >
                        </div>
                    </div>
                </div>

                <div v-if="currentStep === 3" class="space-y-6">
                    <div class="border-b border-primary/20 pb-2">
                        <h2 class="font-brand text-xl font-bold">
                            Datos de Contacto
                        </h2>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="contact_name"
                            class="text-sm font-semibold italic"
                        >
                            Nombre y Apellido
                            <span class="text-red-500" aria-hidden="true"
                                >*</span
                            ><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <div class="relative flex items-center">
                            <UserIcon
                                class="absolute left-4 size-5 text-primary/60"
                                aria-hidden="true"
                            />
                            <input
                                id="contact_name"
                                v-model="form.contact_name"
                                type="text"
                                placeholder="Ingresa tu nombre completo"
                                class="w-full rounded-lg border border-primary/30 bg-background py-3 pr-4 pl-12 text-base transition-all outline-none focus:border-primary"
                                :aria-invalid="!!errors.contact_name"
                                required
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="contact_email"
                            class="text-sm font-semibold italic"
                        >
                            Correo Electrónico
                            <span class="text-red-500" aria-hidden="true"
                                >*</span
                            ><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <div class="relative flex items-center">
                            <MailIcon
                                class="absolute left-4 size-5 text-primary/60"
                                aria-hidden="true"
                            />
                            <input
                                id="contact_email"
                                v-model="form.contact_email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                class="w-full rounded-lg border border-primary/30 bg-background py-3 pr-4 pl-12 text-base transition-all outline-none focus:border-primary"
                                :aria-invalid="!!errors.contact_email"
                                required
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="contact_phone"
                            class="text-sm font-semibold italic"
                        >
                            Teléfono / WhatsApp
                            <span class="text-red-500" aria-hidden="true"
                                >*</span
                            ><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <div class="relative flex items-center">
                            <span
                                class="absolute left-4 border-r border-primary/20 pr-2 text-sm font-bold text-primary/80"
                                id="phone-prefix"
                            >
                                +58
                            </span>
                            <input
                                id="contact_phone"
                                v-model="form.contact_phone"
                                type="tel"
                                name="contact_phone"
                                placeholder="4121234567"
                                aria-describedby="phone-prefix phone-hint"
                                class="w-full rounded-lg border border-primary/30 bg-background py-3 pr-4 pl-16 text-base transition-all outline-none focus:border-primary"
                                :aria-invalid="!!errors.contact_phone"
                                required
                            />
                        </div>
                        <span
                            id="phone-hint"
                            class="text-xs text-foreground/70 italic"
                        >
                            Te contactaremos por aquí para mostrarte el diseño
                            antes de publicarlo.
                        </span>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label
                            for="doc-number"
                            class="text-sm font-semibold italic"
                        >
                            Documento de Identidad
                            <span class="text-red-500" aria-hidden="true"
                                >*</span
                            ><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <div
                            class="relative flex items-center gap-0 rounded-lg border border-primary/30 bg-background transition-all focus-within:border-primary"
                        >
                            <label for="doc-type" class="sr-only"
                                >Tipo de documento de identidad</label
                            >
                            <select
                                id="doc-type"
                                v-model="docType"
                                class="h-full cursor-pointer rounded-l-lg border-r border-primary/20 bg-transparent py-3 pr-2 pl-4 text-base font-bold text-primary outline-none"
                            >
                                <option
                                    value="V"
                                    class="bg-background text-foreground"
                                >
                                    V
                                </option>
                                <option
                                    value="E"
                                    class="bg-background text-foreground"
                                >
                                    E
                                </option>
                                <option
                                    value="P"
                                    class="bg-background text-foreground"
                                >
                                    P
                                </option>
                                <option
                                    value="J"
                                    class="bg-background text-foreground"
                                >
                                    J
                                </option>
                            </select>

                            <input
                                id="doc-number"
                                v-model="docNumber"
                                type="text"
                                inputmode="numeric"
                                pattern="[0-65]*"
                                maxlength="9"
                                placeholder="12345678"
                                aria-describedby="doc-hint"
                                class="w-full rounded-r-lg bg-transparent px-4 py-3 text-base transition-all outline-none"
                                @input="
                                    docNumber = (docNumber as string).replace(
                                        /\D/g,
                                        '',
                                    )
                                "
                                required
                            />
                        </div>
                        <span
                            id="doc-hint"
                            class="text-xs text-foreground/70 italic"
                        >
                            Selecciona tu tipo de documento e ingresa solo
                            números (de 6 a 9 dígitos).
                        </span>
                    </div>

                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <CityDropdown
                                type="state"
                                v-model="form.state"
                                @update:model-value="form.city = ''"
                                :class="{ 'border-red-500': errors.state }"
                                :aria-invalid="!!errors.state"
                            />
                            <span
                                v-if="errors.state"
                                role="alert"
                                class="text-xs text-red-500"
                                >{{ errors.state }}</span
                            >
                        </div>
                        <div>
                            <CityDropdown
                                type="city"
                                v-model="form.city"
                                :selected-state="form.state"
                                :class="{ 'border-red-500': errors.city }"
                                :aria-invalid="!!errors.city"
                            />
                            <span
                                v-if="errors.city"
                                role="alert"
                                class="text-xs text-red-500"
                                >{{ errors.city }}</span
                            >
                        </div>
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
                    <ChevronLeftIcon class="size-5" aria-hidden="true" />
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
                    v-if="currentStep < TOTAL_STEPS"
                    type="button"
                    @click="nextStep"
                    :disabled="!isStepValid"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-8 py-3.5 font-bold text-black transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto dark:border-black dark:bg-black dark:text-primary dark:hover:bg-white"
                >
                    Siguiente
                    <ChevronRightIcon class="size-5" aria-hidden="true" />
                </button>

                <button
                    v-else
                    type="submit"
                    :disabled="!isStepValid"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-8 py-3.5 font-bold text-black shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 sm:w-auto dark:border-black dark:bg-black dark:text-primary dark:hover:bg-white"
                >
                    {{
                        processing
                            ? 'Procesando...'
                            : '¡Listo, creen mi aviso! 🚀'
                    }}
                </button>
            </div>
        </form>
    </div>
</template>

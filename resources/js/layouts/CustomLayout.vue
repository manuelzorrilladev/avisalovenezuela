<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { CircleAlertIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import Navbar from '@/components/shared/Navbar.vue';

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
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


const showModal = ref(false);
function changeModalState() {
    console.log('execute state');
    showModal.value = !showModal.value;
}

defineExpose({ changeModalState, showModal });
</script>

<template>
    <Head title="Inicio - Avísalo Venezuela">
        <meta
            name="description"
            content="¿Tienes algo que vender? ¡Avísalo! ¿Buscas algo nuevo? ¡Encuéntralo!"
        />
        <link rel="canonical" href="https://avisalovenezuela.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://avisalovenezuela.com/" />
        <meta property="og:title" content="Avísalo Venezuela" />
        <meta
            property="og:description"
            content="¿Tienes algo que vender? ¡Avísalo! ¿Buscas algo nuevo? ¡Encuéntralo!"
        />
        <meta property="og:image" content="https://avisalovenezuela.com/assets/img/avisalo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://avisalovenezuela.com/" />
        <meta name="twitter:title" content="Avísalo Venezuela" />
        <meta
            name="twitter:description"
            content="¿Tienes algo que vender? ¡Avísalo! ¿Buscas algo nuevo? ¡Encuéntralo!"
        />
        <meta name="twitter:image" content="https://avisalovenezuela.com/assets/img/avisalo.png" />
    </Head>

    <Navbar :can-register="props.canRegister" />

    <Transition name="popup">
        <section
            v-if="showModal"
            class="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
            @click.self="showModal = false"
        >
            <div
                class="modal-content flex w-full max-w-lg flex-col items-center justify-center gap-6 rounded-2xl border bg-white p-10 text-center shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            >
                <div class="rounded-full bg-primary/10 p-4">
                    <CircleAlertIcon
                        class="h-20 w-20 animate-pulse text-primary"
                    />
                </div>

                <div class="space-y-2">
                    <h2
                        class="text-2xl font-extrabold tracking-tight text-primary"
                    >
                        ¡Próximamente!
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400">
                        Esta funcionalidad aún está en desarrollo. <br />
                        Estamos trabajando para mejorar tu experiencia.
                    </p>
                </div>

                <button
                    class="w-full cursor-pointer rounded-xl bg-primary px-8 py-3 text-sm font-bold text-black shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95 sm:w-fit"
                    @click="changeModalState"
                >
                    Entendido, volver
                </button>
            </div>
        </section>
    </Transition>

    <slot></slot>
</template>

<style scoped>
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

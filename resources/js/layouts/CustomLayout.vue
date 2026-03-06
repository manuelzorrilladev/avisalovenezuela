<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import {  CircleAlertIcon } from 'lucide-vue-next';
import {  ref } from 'vue';
import Navbar from '@/components/shared/Navbar.vue';

const props = withDefaults(
    defineProps<{
        canRegister:boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
    }>(),
    {
        canRegister:true,
        title: 'Inicio',
        description:
            'Consigue todo aquello que necesitas o publica tus bienes y servicios a un publico masivo en Avisalo',
        url: '/',
        image: '/assets/img/avisalo.png',
    },
);

const showModal = ref(false)
function changeModalState(){
    console.log("execute state");
    showModal.value = !showModal.value
}

defineExpose({changeModalState,showModal})

</script>

<template>
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

    <Navbar :can-register="props.canRegister" />


    <Transition name="popup">
        <section 
            v-if="showModal" 
            class="bg-gray-900/60 backdrop-blur-sm top-0 left-0 z-50 fixed w-full h-screen flex justify-center items-center p-4"
            @click.self="showModal = false"
        >
            <div class="modal-content w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border dark:border-zinc-800 flex flex-col items-center justify-center gap-6 p-10 text-center">
                
                <div class="bg-primary/10 p-4 rounded-full">
                    <CircleAlertIcon class="w-20 h-20 text-primary animate-pulse"/>
                </div>

                <div class="space-y-2">
                    <h2 class="font-extrabold text-2xl text-primary tracking-tight">
                        ¡Próximamente!
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400">
                        Esta funcionalidad aún está en desarrollo. <br> Estamos trabajando para mejorar tu experiencia.
                    </p>
                </div>

                <button 
                    class="w-full sm:w-fit cursor-pointer rounded-xl bg-primary px-8 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20" 
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

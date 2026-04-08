<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue'
import AppLogo from '@/components/AppLogo.vue';
import CustomLayout from '@/layouts/CustomLayout.vue';




const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        status: number,
    }>(),
    {
        canRegister: true,
        title: 'Error',
        description:
            'Consigue todo aquello que necesitas o publica tus bienes y servicios a un publico masivo en Avisalo',
        url: '/error',
        image: '/assets/img/avisalo.png',
    },
);


const title = computed(() => {
  return {
    403: ['403', 'Acceso Prohibido'],
    404: ['404', 'Página no encontrada'],
    500: ['500', 'Error del servidor'],
    503: ['503', 'Servicio no disponible'],
  }[props.status] || ['Error', 'Error desconocido']
})

const description = computed(() => {
  return {
    403: 'Lo sentimos, no tienes permisos para ver esta publicación o para realizar esta acción.',
    404: 'La página que buscas no existe o ha sido movida.',
    500: 'Vaya, algo salió mal en nuestros servidores.',
    503: 'Estamos en mantenimiento, vuelve pronto.',
  }[props.status] || 'Lo sentimos, hemos tenido un error desconocido y no podemos procesar tu solicitud'
})
</script>

<template>
        <CustomLayout v-bind="props">
            <div
                class="h-[90vh] flex flex-col items-center justify-center  px-6  relative"
            >
                <div class="relative z-10">
                    <h1
                        class="font-brand text-[150px] leading-none text-black dark:text-primary opacity-20 select-none md:text-[200px]"
                    >
                        {{title[0]}} 
                    </h1>
                    <div
                        class="absolute inset-0 flex items-center justify-center"
                    >
                        <p
                            class="mt-10 font-brand text-center text-2xl text-main md:text-4xl"
                        >
                            ¡Ups! {{ props }} {{title[1]}}
                        </p>
                    </div>
                </div>

                <div class="mt-4 max-w-md text-center relative z-10">
                    <p class="mb-8 text-lg text-main">
                        {{ description }} ¡No te preocupes!
                        Aún hay miles de cosas esperando por ti.
                    </p>

                    <Link
                        href="/"
                        class="inline-flex items-center justify-center rounded-lg border border-primary dark:border-black bg-primary dark:bg-black px-8 py-3 text-base font-medium text-black dark:text-primary shadow-lg transition-colors duration-200 hover:bg-white dark:hover:bg-primary dark:hover:text-black"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Volver al inicio
                    </Link>
                </div>

                <div class="w-1/2 absolute z-0 bottom-0 right-0 opacity-20">
                    <AppLogo/>
                </div>
            </div>
        </CustomLayout>
</template>

<style scoped></style>

<script setup lang="ts">
import type { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/vue3';

import { useWindowSize } from '@vueuse/core';
import { Menu, XCircle } from 'lucide-vue-next';
import { computed, ref, type Ref } from 'vue';
import { dashboard, login, register } from '@/routes';
import { useFormStore } from '@/state/formState.js';
import AppLogo from '../AppLogo.vue';
import ThemeChanger from './ThemeChanger.vue';
const { width } = useWindowSize();

const isDesktop: Ref<boolean> = computed(() => width.value >= 1024);

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);
const isActive: Ref<boolean> = ref(false);
const page = usePage<PageProps>();
const auth = computed(() => page.props.auth);
const formStore = useFormStore();


function logout(){
    formStore.resetForm()
}
</script>

<template>
    <nav class="relative">
        <section
            class="flex h-[12vh] items-center justify-between bg-primary md:px-10 dark:bg-black"
        >
            <div class="flex flex-col">
            <Link href="/">
                <AppLogo class="w-48 pl-4 md:pl-0" />
            </Link>
            <h3 class="text-[10px] text-right">J-508176022</h3>
            </div>

            <div class="text-carbon-black-text flex items-center font-semibold">
                <div v-if="isDesktop" class="flex items-center space-x-4">
                    <template v-if="auth.user">
                        <Link
                            :href="dashboard()"
                            class="transition-colors hover:text-white"
                        >
                            Panel de Control
                        </Link>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            @click="logout"
                            class="transition-colors hover:text-white"
                        >
                            Cerrar Sesión
                        </Link>
                    </template>

                    <template v-else>
                        <Link
                            :href="login()"
                            class="rounded-md border border-white px-4 py-2 transition-colors hover:text-white dark:border-primary"
                        >
                            Iniciar Sesión
                        </Link>

                        <Link
                            v-if="canRegister"
                            :href="register()"
                            class="rounded-md bg-white px-4 py-2 text-black shadow-sm transition-all hover:bg-gray-100 dark:text-primary"
                        >
                            Registrarse
                        </Link>
                    </template>
                </div>
                <ThemeChanger class="ml-5" />
                <button class="group cursor-pointer p-3">
                    <Menu
                        @click="isActive = !isActive"
                        class="size-12 duration-300 group-hover:scale-115 md:size-10"
                    />
                </button>
            </div>
        </section>
        <Transition name="slide-bounce">
            <section
                v-if="isActive"
                class="fixed top-0 right-0 z-50 flex h-screen w-80 flex-col bg-primary px-10 py-4 shadow-2xl"
            >
                <div class="flex items-center gap-4">
                    <XCircle
                        @click="isActive = false"
                        class="text-carbon-black-text h-full cursor-pointer pt-2 duration-300 hover:scale-115"
                    />
                    <AppLogo class="w-34" />
                </div>

                <hr class="my-2 border-black" />
             

                 <div v-if="auth.user">
                        <Link
                            :href="dashboard()"
                            class="ml-8 text-black duration-200 hover:text-white"
                        >
                            Panel de Control
                        </Link>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            class="ml-8 text-black duration-200 hover:text-white"
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                 <div v-else>
                        <Link
                            :href="login()"
                            class="ml-8 text-black duration-200 hover:text-white"
                        >
                            Iniciar Sesión
                        </Link>

                        <Link
                            v-if="canRegister"
                            :href="register()"
                            class="ml-8 text-black duration-200 hover:text-white"
                        >
                            Registrarse
                        </Link>
                    </div>
            </section>
        </Transition>
        <Transition name="show">
            <section
                v-if="isActive"
                @click="isActive = !isActive"
                class="fixed top-0 right-0 z-40 flex h-screen w-full flex-col bg-gray-900/60 px-10 py-4 shadow-2xl blur-2xl backdrop-blur-sm"
            ></section>
        </Transition>
    </nav>
</template>

<style scoped>
/* Estado inicial (fuera de la pantalla a la derecha) */
.slide-bounce-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

/* Animación de entrada con efecto rebote */
.slide-bounce-enter-active {
    transition: all 0.3s cubic-bezier(0.34, 0.95, 0.64, 1);
}

/* Estado final (posición original) */
.slide-bounce-enter-to {
    transform: translateX(0);
    opacity: 1;
}

/* Animación de salida (más suave y rápida) */
.slide-bounce-leave-active {
    transition: all 0.3s ease-in;
}

.slide-bounce-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
.show-enter-from {
    opacity: 0;
}
.show-enter-active,
.show-leave-active {
    transition: all 0.2s;
}
.show-enter-to {
    opacity: 1;
}
</style>

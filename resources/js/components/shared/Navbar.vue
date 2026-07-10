<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { useWindowSize } from '@vueuse/core';
import { Menu, XCircle, ChevronDown } from 'lucide-vue-next';
import { computed, ref, type Ref } from 'vue';
import { dashboard, login, register } from '@/routes';
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
const page = usePage();
const auth = computed(() => page.props.auth);
</script>

<template>
    <nav class="relative">
        <section
            class="flex h-[10vh] items-center justify-between bg-primary md:px-10 dark:bg-black"
        >
            <Link href="/">
                <AppLogo class="w-48 pl-4 md:pl-0" />
            </Link>

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
             
            </div>
        </section>
      
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

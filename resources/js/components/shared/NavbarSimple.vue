<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogo from '../AppLogo.vue';

</script>

<template>
    <nav class="relative">
        <section
            class="flex h-[10vh] items-center justify-center bg-primary md:px-10 dark:bg-black"
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
                <button class="group cursor-pointer p-3">
                    <Menu
                        @click="isActive = !isActive"
                        class="size-12 duration-300 group-hover:scale-115 md:size-10"
                    />
                </button>
            </div>
        </section>
        
    </nav>
</template>

<style scoped>

</style>

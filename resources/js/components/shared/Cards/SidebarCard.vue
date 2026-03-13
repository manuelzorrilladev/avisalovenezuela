<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
interface Params {
    minPrice: number;
    maxPrice: number;
    city: string;
    state: string;
    condition: string;
    search: string;
}

const params = defineModel<Params>({
    required: true,
});
</script>

<template>
    <aside
        class="h-auto overflow-y-auto rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-lg shadow-primary/30 lg:h-[80vh] dark:border-gray-800 dark:bg-gray-900"
    >
        <h3
            class="py-2 font-brand text-xl font-bold text-gray-800 dark:text-gray-100"
        >
            Filtros
        </h3>
        <hr class="mb-4 border-gray-200 dark:border-gray-800" />

        <Form @submit.prevent>
            <div class="mb-6">
                <h4
                    class="mb-3 font-brand text-sm text-black dark:text-primary"
                >
                    Rango de Precio
                </h4>
                <div class="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        class="w-full rounded-md border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        v-model="params.minPrice"
                    />
                    <span class="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        class="w-full rounded-md border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        v-model="params.maxPrice"
                    />
                </div>
            </div>

            <div class="mb-6">
                <h4
                    class="mb-3 font-brand text-sm text-black dark:text-primary"
                >
                    Ubicación
                </h4>
                <select
                    class="w-full rounded-md border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    v-model="params.city"
                >
                    <option value="">Todas las ciudades</option>
                    <option value="caracas">Caracas</option>
                    <option value="maracaibo">Maracaibo</option>
                    <option value="valencia">Valencia</option>
                </select>
            </div>

            <div class="mb-6">
                <h4
                    class="mb-3 font-brand text-sm text-black dark:text-primary"
                >
                    Especificaciones
                </h4>

                <div class="mt-2 space-y-2">
                    <label class="group flex cursor-pointer items-center" >
                        <input
                        v-model="params.condition"
                            type="radio"
                            class="rounded border-gray-300 bg-gray-50 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                        />
                        <span
                            class="ml-2 text-sm text-gray-600 transition-colors group-hover:text-primary dark:text-gray-400"
                            >Nuevo</span
                        >
                    </label>
                    <label class="group flex cursor-pointer items-center">
                        <input
                        v-model="params.condition"
                        
                            type="radio"
                            class="rounded border-gray-300 bg-gray-50 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                        />
                        <span
                            class="ml-2 text-sm text-gray-600 transition-colors group-hover:text-primary dark:text-gray-400"
                            >Usado</span
                        >
                    </label>
                </div>
            </div>

            <button
                class="mt-4 w-full rounded-md bg-primary px-4 py-2 font-brand text-white shadow-md transition-all hover:bg-primary/90 active:scale-95"
            >
                Aplicar Filtros
            </button>

            <button
                type="reset"
                class="mt-2 w-full py-2 text-xs text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400"
            >
                Limpiar todos los filtros
            </button>
        </Form>
    </aside>
</template>

<style scoped></style>

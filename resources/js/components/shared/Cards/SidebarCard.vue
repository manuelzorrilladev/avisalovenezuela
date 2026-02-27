<script setup lang="ts">
import { Form } from '@inertiajs/vue3';


</script>

<template>
   <aside class="h-auto lg:h-[80vh] rounded-lg shadow-lg shadow-primary/30 border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 px-4 py-2 overflow-y-auto">
    <h3 class="py-2 font-bold text-gray-800 dark:text-gray-100 font-brand text-xl">Filtros</h3>
    <hr class="border-gray-200 dark:border-gray-800 mb-4">

    <Form>
        <div class="mb-6">
            <h4 class="font-brand text-sm uppercase tracking-wider text-black dark:text-primary mb-3">Rango de Precio</h4>
            <div class="flex items-center gap-2">
                <input 
                    type="number" 
                    placeholder="Min" 
                    class="w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-primary focus:border-primary p-2 "
                >
                <span class="text-gray-500">-</span>
                <input 
                    type="number" 
                    placeholder="Max" 
                    class="w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-primary focus:border-primary p-2"
                >
            </div>
        </div>

        <div class="mb-6">
            <h4 class="font-brand text-sm uppercase tracking-wider text-black dark:text-primary mb-3">Ubicación</h4>
            <select class="w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-primary focus:border-primary p-2">
                <option value="">Todas las ciudades</option>
                <option value="caracas">Caracas</option>
                <option value="maracaibo">Maracaibo</option>
                <option value="valencia">Valencia</option>
            </select>
        </div>

        <div class="mb-6">
            <h4 class="font-brand text-sm uppercase tracking-wider text-black dark:text-primary mb-3">Especificaciones</h4>
            
            <div class="space-y-2 mt-2">
                <label class="flex items-center group cursor-pointer">
                    <input type="checkbox" class="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary bg-gray-50 dark:bg-gray-800">
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">Nuevo</span>
                </label>
                <label class="flex items-center group cursor-pointer">
                    <input type="checkbox" class="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary bg-gray-50 dark:bg-gray-800">
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">Usado</span>
                </label>
            </div>
        </div>

        <button 
            type="submit" 
            class="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white font-brand rounded-md shadow-md transition-all active:scale-95 mt-4"
        >
            Aplicar Filtros
        </button>

        <button 
            type="reset" 
            class="w-full py-2 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors mt-2"
        >
            Limpiar todos los filtros
        </button>
    </Form>
</aside>
</template>

<style scoped>



</style>

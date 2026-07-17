<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import WelcomeForm from './WelcomeForm.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de control',
        href: dashboard().url,
    },
    {
        title: 'Crear publicación',
        href: `${dashboard().url}/publicaciones/crear`,
    },
];

</script>

<template>
    <Head title="Crear publicación" />

    <AppLayout :breadcrumbs="breadcrumbs">
      <WelcomeForm/>
    </AppLayout>
</template>

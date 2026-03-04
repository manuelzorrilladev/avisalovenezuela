<script setup lang="ts">
import { computed } from 'vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { Publication } from '@/types/publication';
import { formatDate } from '@/utils';
const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        results: Publication;
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



</script>

<template>
    <CustomLayout v-bind="props">
        {{ formatDate(results.published_at) }}
    </CustomLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomLayout from '@/layouts/CustomLayout.vue';
import type { PublicationCardType } from '@/types/publication';
import WelcomeForm from './WelcomeForm.vue';
interface QueryProps {
    most_recent?: PublicationCardType[];
    most_viewed?: PublicationCardType[];
    vehicles?: PublicationCardType[];
    m_service?: PublicationCardType[];
}

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        homeData: QueryProps;
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
const layoutRef = ref<InstanceType<typeof CustomLayout> | null>(null);

</script>

<template>
    <CustomLayout ref="layoutRef" v-bind="props">
        <section>
            <WelcomeForm />
        </section>
    </CustomLayout>
</template>

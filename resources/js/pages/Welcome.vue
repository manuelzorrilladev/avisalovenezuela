<script setup lang="ts">
import { Deferred } from '@inertiajs/vue3';
import {  ref } from 'vue'
import PublicationCard from '@/components/shared/Cards/PublicationCard.vue';
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
function changeModal(){
    if(layoutRef.value){
        layoutRef.value.changeModalState()

    } else {
        console.error("El Layout aún no está listo o no se encontró la ref");
    }
}

</script>

<template>
    <CustomLayout ref="layoutRef" v-bind="props">
    

        <WelcomeForm/>
    </CustomLayout>
</template>

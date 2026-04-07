<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { CircleAlertIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { type NavItem } from '@/types';

defineProps<{
    items: NavItem[];
}>();

const { isCurrentUrl } = useCurrentUrl();

const showModal = ref(false)
function changeModalState(item:NavItem){
    if(item.disabled || showModal.value==true){
        console.log("execute state");
        showModal.value = !showModal.value
    }
   
}
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel >Plataforma</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem
                v-for="item in items"
                :key="item.title"
                class="relative rounded-lg border border-primary"
                 @click="changeModalState(item)"
            >
                <div v-if="item.hasMessage" class="absolute top-1 right-3">
                    <p
                        class="relative z-10 h-6 w-6 rounded-full bg-red-500 p-0.5 text-center text-sm text-white"
                    >
                        1
                    </p>
                    <p
                        class="absolute top-0 h-6 w-6 animate-ping rounded-full bg-red-500 text-center text-sm text-white"
                    >
                        1
                    </p>
                </div>
                <SidebarMenuButton
                    
                    as-child
                    :is-active="isCurrentUrl(item.href)"
                    :tooltip="item.title"
                    :disabled="item.disabled"
                    class="duration-200 hover:bg-primary dark:hover:text-black"
                    :class="[
                        isCurrentUrl(item.href)
                            ? 'bg-primary dark:text-black'
                            : 'bg-transparent',
                        item.disabled
                            ? 'pointer-events-none cursor-not-allowed opacity-50'
                            : '',
                    ]"
                >
                    <component
                        :is="item.disabled ? 'span' : Link"
                        :href="item.disabled ? null : item.href"
                       
                    >
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                    </component>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
     <Transition name="popup">
        <section 
            v-if="showModal" 
            class="bg-gray-900/60 backdrop-blur-sm top-0 left-0 z-50 fixed w-full h-screen flex justify-center items-center p-4"
            @click.self="showModal = false"
        >
            <div class="modal-content w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border dark:border-zinc-800 flex flex-col items-center justify-center gap-6 p-10 text-center">
                
                <div class="bg-primary/10 p-4 rounded-full">
                    <CircleAlertIcon class="w-20 h-20 text-primary animate-pulse"/>
                </div>

                <div class="space-y-2">
                    <h2 class="font-extrabold text-2xl text-primary tracking-tight">
                        ¡Próximamente!
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400">
                        Esta funcionalidad aún está en desarrollo. <br> Estamos trabajando para mejorar tu experiencia.
                    </p>
                </div>

                <button 
                    class="w-full sm:w-fit cursor-pointer rounded-xl bg-primary px-8 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20" 
                    @click="changeModalState"
                >
                    Entendido, volver
                </button>
            </div>
        </section>
    </Transition>
</template>

<style scoped>
.popup-enter-from,
.popup-leave-to {
    opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
    transition: opacity 0.3s ease;
}

.popup-enter-active .modal-content {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.popup-leave-active .modal-content {
    transition: all 0.25s ease-in;
}

.popup-enter-from .modal-content {
    transform: scale(0.7) translateY(20px);
    opacity: 0;
}

.popup-leave-to .modal-content {
    transform: scale(0.9);
    opacity: 0;
}

</style>
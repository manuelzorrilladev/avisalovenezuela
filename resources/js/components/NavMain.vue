<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
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
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" class="relative border rounded-lg border-primary">
                <div v-if="item.hasMessage" class="absolute right-3 top-1">
                    <p class=" bg-red-500  rounded-full text-white text-sm w-6 h-6 text-center relative z-10 p-0.5">1</p>
                    <p class="absolute top-0 bg-red-500  rounded-full text-white text-sm w-6 h-6 text-center animate-ping ">1</p>
                </div>
                <SidebarMenuButton
                    as-child
                    :is-active="isCurrentUrl(item.href)"
                    :tooltip="item.title"
                    class="hover:bg-primary dark:hover:text-black duration-200"
                    :class="isCurrentUrl(item.href) ? 'bg-primary dark:bg-primary dark:text-black':'bg-transparent'"
                >
                    <Link :href="item.href">
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>

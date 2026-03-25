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
            <SidebarMenuItem
                v-for="item in items"
                :key="item.title"
                class="relative rounded-lg border border-primary"
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
</template>

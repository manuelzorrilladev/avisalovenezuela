import type { Page, Router, createHeadManager } from '@inertiajs/core';
import type { AppPageProps } from './index'; // Asegúrate de que la ruta relativa sea correcta

// 1. Extender las interfaces de Vite
declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
    }
}

// 2. Extender el Core de Inertia (AQUÍ ESTABA EL CAMBIO CLAVE)
declare module '@inertiajs/core' {
    // Sobrescribimos la interfaz interna que define los Props globales del objeto Page
    type PageProps = AppPageProps
}

// 3. Extender las propiedades globales de Vue para los templates (<template>)
declare module 'vue' {
    interface ComponentCustomProperties {
        $inertia: Router;
        // Al pasarle 'PageProps' (que ya extendimos arriba), usePage() y $page.props tendrán autocompletado estricto
        $page: Page<PageProps>;
        $headManager: ReturnType<typeof createHeadManager>;
    }
}

export {};
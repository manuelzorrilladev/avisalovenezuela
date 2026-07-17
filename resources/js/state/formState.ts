import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { formData } from './../types/publication';


export const useFormStore = defineStore('formStore', () => {
    // Estado inicial limpio
    const initialData = (): formData => ({
        category_type: '',
        title: '',
        description: '',
        images: [],
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        identity_document: '',
        state: '',
        city: '',
    });

    // 2. Intentar cargar datos previos de localStorage (por si viene de un redirect de Login/Register)
    const savedData = localStorage.getItem('avisalo_draft_form');
    const form = ref<formData>(savedData ? JSON.parse(savedData) : initialData());

    // Estados adicionales para controlar los campos separados del documento de identidad en la vista
    const docType = ref('V');
    const docNumber = ref('');

    // 3. Watcher para persistir los datos automáticamente en cada cambio
    watch(
        form,
        (newForm) => {
            // Guardamos el borrador en localStorage (excepto archivos binarios pesados si los hay, 
            // aunque para strings, arrays vacíos y rutas funciona perfecto)
            localStorage.setItem('avisalo_draft_form', JSON.stringify(newForm));
        },
        { deep: true }
    );

    // 4. Sincronizar el documento de identidad unificado (V-12345678) hacia el formulario principal
    watch([docType, docNumber], () => {
        if (docNumber.value) {
            form.value.identity_document = `${docType.value}-${docNumber.value.trim()}`;
        } else {
            form.value.identity_document = '';
        }
    });

    // 5. Acciones (Actions)
    
    // Almacena las imágenes seleccionadas
    const setImages = (uploadedImages: any[]) => {
        form.value.images = uploadedImages;
    };

    // 1. Añadimos un estado para capturar los errores de validación
    const errors = ref<Record<string, string>>({});

    // Acción para actualizar los errores desde Inertia
    const setErrors = (newErrors: Record<string, string>) => {
        errors.value = newErrors;
    };

    // Limpiar errores (por ejemplo, al cambiar de paso o al escribir)
    const clearErrors = () => {
        errors.value = {};
    };

    // Limpia el formulario y el localStorage 
    const resetForm = () => {
        form.value = initialData();
        docType.value = 'V';
        docNumber.value = '';
        localStorage.removeItem('avisalo_draft_form');
    };

    return {
        // Estado
        form,
        docType,
        docNumber,
        errors, 
        setErrors,
        clearErrors,
        
        // Acciones
        setImages,
        resetForm
    };
});
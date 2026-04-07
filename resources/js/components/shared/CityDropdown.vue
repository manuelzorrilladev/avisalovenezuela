<script setup lang="ts">
import { computed } from 'vue';

const { type, selectedState } = defineProps<{ 
    type: 'state' | 'city',
    selectedState?: string 
}>();
defineOptions({
  inheritAttrs: false 
});
const model = defineModel<string>();

const venezuelaData: Record<string, string[]> = {
    "Amazonas": ["Puerto Ayacucho", "San Fernando de Atabapo", "Maroa", "Puerto Páez"],
    "Anzoátegui": ["Barcelona", "Puerto La Cruz", "Lechería", "Guanta", "El Tigre", "Anaco", "Cantaura", "Puerto Píritu"],
    "Apure": ["San Fernando de Apure", "Guasdualito", "Elorza", "Bruzual", "Achaguas"],
    "Aragua": ["Maracay", "Turmero", "La Victoria", "Cagua", "El Limón", "Villa de Cura", "Palo Negro", "Ocumare de la Costa"],
    "Barinas": ["Barinas", "Sabaneta", "Socopó", "Barinitas", "Santa Bárbara"],
    "Bolívar": ["Ciudad Guayana (Puerto Ordaz/San Félix)", "Ciudad Bolívar", "Upata", "Caicara del Orinoco", "Tumeremo", "Santa Elena de Uairén"],
    "Carabobo": ["Valencia", "Puerto Cabello", "Guacara", "Naguanagua", "San Diego", "Mariara", "Bejuma", "Tocuyito"],
    "Cojedes": ["San Carlos", "Tinaquillo", "El Pao", "Tinaco"],
    "Delta Amacuro": ["Tucupita", "Pedernales", "Curiapo"],
    "Distrito Capital": [
        "Caracas - Libertador (Centro)", 
        "Caracas - El Valle", 
        "Caracas - Catia", 
        "Caracas - Caricuao", 
        "Caracas - La Candelaria", 
        "Caracas - El Paraíso",
        "Caracas - San Bernardino",
        "Caracas - Montalbán"
    ],
    "Falcón": ["Coro", "Punto Fijo", "Chichiriviche", "Tucacas", "La Vela de Coro", "Dabajuro"],
    "Guárico": ["San Juan de los Morros", "Valle de la Pascua", "Calabozo", "Altagracia de Orituco", "Zaraza"],
    "Lara": ["Barquisimeto", "Cabudare", "Carora", "Quíbor", "El Tocuyo", "Duaca"],
    "Mérida": ["Mérida", "El Vigía", "Ejido", "Tovar", "Mucuchíes", "Lagunillas"],
    "Miranda": [
        "Chacao (Altamira/Los Palos Grandes)",
        "Baruta (Las Mercedes/Prados del Este)",
        "Sucre (Petare/La Urbina/Sebucán)",
        "El Hatillo",
        "Los Teques", 
        "San Antonio de los Altos", 
        "Guarenas", 
        "Guatire", 
        "Charallave", 
        "Cúa", 
        "Higuerote", 
        "Río Chico"
    ],
    "Monagas": ["Maturín", "Punta de Mata", "Caripe", "Temblador", "Caicara de Maturín"],
    "Nueva Esparta": ["Porlamar", "Pampatar", "La Asunción", "Juan Griego", "Punta de Piedras", "El Valle del Espíritu Santo"],
    "Portuguesa": ["Acarigua", "Araure", "Guanare", "Turén", "Ospino"],
    "Sucre": ["Cumaná", "Carúpano", "Güiria", "Cumanacoa", "Cariaco"],
    "Táchira": ["San Cristóbal", "Táriba", "Rubio", "San Antonio del Táchira", "La Grita", "Ureña", "Palmira"],
    "Trujillo": ["Valera", "Trujillo", "Boconó", "La Puerta", "Pampán"],
    "Vargas (La Guaira)": ["La Guaira", "Catia La Mar", "Maiquetía", "Caraballeda", "Macuto", "Naiguatá"],
    "Yaracuy": ["San Felipe", "Yaritagua", "Nirgua", "Chivacoa"],
    "Zulia": ["Maracaibo", "Cabimas", "Ciudad Ojeda", "San Francisco", "Santa Bárbara del Zulia", "Machiques", "La Concepción"]
};
const states = Object.keys(venezuelaData).sort();

const cities = computed(() => {
    if (type === 'city' && selectedState && venezuelaData[selectedState]) {
        return [...venezuelaData[selectedState]].sort();
    }
    return [];
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm font-semibold italic">
            {{ type === 'state' ? 'Estado (Ubicación)' : 'Ciudad' }}
        </label>

        <select
            v-if="type === 'state'"
            v-bind="$attrs"
            v-model="model"
            class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary transition-all"
        >
            <option value=""  disabled selected>Selecciona la ciudad</option>
            <option v-for="state in states" :key="state" :value="state">
                {{ state }}
            </option>
        </select>

        <select
            v-else
            v-bind="$attrs"
            v-model="model"
            :disabled="!selectedState"
            class="w-full rounded-lg border border-primary/30 bg-background px-4 py-2 outline-none focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <option value=""  selected>
                {{ selectedState ? 'Selecciona una ciudad' : 'Primero elige un estado' }}
            </option>
            <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
            </option>
        </select>
    </div>
</template>
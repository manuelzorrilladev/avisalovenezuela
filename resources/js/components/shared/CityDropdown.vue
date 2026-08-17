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
    "Amazonas": ["Puerto Ayacucho", "San Fernando de Atabapo", "Maroa", "Puerto Páez","Otro"],
    "Anzoátegui": ["Barcelona", "Puerto La Cruz", "Lechería", "Guanta", "El Tigre", "Anaco", "Cantaura", "Puerto Píritu","Otro"],
    "Apure": ["San Fernando de Apure", "Guasdualito", "Elorza", "Bruzual", "Achaguas","Otro"],
    "Aragua": ["Maracay", "Turmero", "La Victoria", "Cagua", "El Limón", "Villa de Cura", "Palo Negro", "Ocumare de la Costa","Otro"],
    "Barinas": ["Barinas", "Sabaneta", "Socopó", "Barinitas", "Santa Bárbara","Otro"],
    "Bolívar": ["Ciudad Guayana (Puerto Ordaz/San Félix)", "Ciudad Bolívar", "Upata", "Caicara del Orinoco", "Tumeremo", "Santa Elena de Uairén","Otro"],
    "Carabobo": ["Valencia", "Puerto Cabello", "Guacara", "Naguanagua", "San Diego", "Mariara", "Bejuma", "Tocuyito","Otro"],
    "Cojedes": ["San Carlos", "Tinaquillo", "El Pao", "Tinaco","Otro"],
    "Delta Amacuro": ["Tucupita", "Pedernales", "Curiapo","Otro"],
    "Distrito Capital": [
        "Caracas - Libertador (Centro)", 
        "Caracas - El Valle", 
        "Caracas - Catia", 
        "Caracas - Caricuao", 
        "Caracas - La Candelaria", 
        "Caracas - El Paraíso",
        "Caracas - San Bernardino",
        "Caracas - Montalbán",
        "Otro"
    ],
    "Falcón": ["Coro", "Punto Fijo", "Chichiriviche", "Tucacas", "La Vela de Coro", "Dabajuro","Otro"],
    "Guárico": ["San Juan de los Morros", "Valle de la Pascua", "Calabozo", "Altagracia de Orituco", "Zaraza","Otro"],
    "La Guaira": ["La Guaira", "Catia La Mar", "Maiquetía", "Caraballeda", "Macuto", "Naiguatá","Otro"],
    "Lara": ["Barquisimeto", "Cabudare", "Carora", "Quíbor", "El Tocuyo", "Duaca","Otro"],
    "Mérida": ["Mérida", "El Vigía", "Ejido", "Tovar", "Mucuchíes", "Lagunillas","Otro"],
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
        "Río Chico",
        "Otro"
    ],
    "Monagas": ["Maturín", "Punta de Mata", "Caripe", "Temblador", "Caicara de Maturín","Otro"],
    "Nueva Esparta": ["Porlamar", "Pampatar", "La Asunción", "Juan Griego", "Punta de Piedras", "El Valle del Espíritu Santo","Otro"],
    "Portuguesa": ["Acarigua", "Araure", "Guanare", "Turén", "Ospino","Otro"],
    "Sucre": ["Cumaná", "Carúpano", "Güiria", "Cumanacoa", "Cariaco","Otro"],
    "Táchira": ["San Cristóbal", "Táriba", "Rubio", "San Antonio del Táchira", "La Grita", "Ureña", "Palmira","Otro"],
    "Trujillo": ["Valera", "Trujillo", "Boconó", "La Puerta", "Pampán","Otro"],
    "Yaracuy": ["San Felipe", "Yaritagua", "Nirgua", "Chivacoa","Otro"],
    "Zulia": ["Maracaibo", "Cabimas", "Ciudad Ojeda", "San Francisco", "Santa Bárbara del Zulia", "Machiques", "La Concepción","Otro"]
};
const states = Object.keys(venezuelaData).sort();

const cities = computed(() => {
    if (type === 'city' && selectedState && venezuelaData[selectedState]) {
        const rawCities = venezuelaData[selectedState];
        
        const filteredCities = rawCities
            .filter(city => city !== 'Otro')
            .sort((a, b) => a.localeCompare(b, 'es'));

        if (rawCities.includes('Otro')) {
            filteredCities.push('Otro');
        }

        return filteredCities;
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
<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Obtener únicamente los IDs de usuarios que tengan el rol igual a 0
        // Usar el query builder DB para evitar posibles conflictos con métodos del modelo User
        $userIds = DB::table('users')->where('role', 'usuario')->pluck('id');
        $worker = DB::table('users')->where('role', 'empleado')->pluck('id');

        if ($userIds->isEmpty()) {
            $this->command->warn('No se encontraron usuarios con roles = 0. Asegúrate de sembrar usuarios antes.');
            return;
        }

        // 2. Definición de contenido realista según el ID de la categoría (1 al 10)
        // Estructura: 'Nombre del anuncio' => 'Descripción del anuncio'
        $classifiedsTemplates = [
            1 => [ // Alquiler
                'Alquilo Apartamento de 2 Hab en Altamira' => 'Cómodo apartamento amoblado, cocina equipada, internet de alta velocidad y puesto de estacionamiento techado. Zona residencial tranquila.',
                'Local Comercial en Alquiler - Av. Bolívar' => 'Excelente local a pie de calle con gran afluencia de peatones. Ideal para tienda, oficina o consultorio. Cuenta con baño privado.',
            ],
            2 => [ // Venta
                'Toyota Corolla 2015 en excelente estado' => 'Único dueño, 90.000 km, mantenimientos al día en concesionario. Aire acondicionado impecable, tapicería de cuero y cauchos nuevos.',
                'Nevera Samsung de 11 Pies Cerca de Estación' => 'Venta por motivo de viaje. Nevera operativa al 100%, sin detalles estéticos graves. Frío húmedo y bajo consumo de energía.',
            ],
            3 => [ // Compra
                'Compro laptop i7 de 10ma generación o superior' => 'Busco laptop para desarrollo de software. Mínimo 16GB de RAM y disco SSD de 512GB. Pago inmediato tras verificación del equipo.',
                'Busco comprar repuestos para extractor industrial' => 'Compro juego de poleas y aspas para extractor de aire de 24 pulgadas. Preferiblemente nuevos o con muy poco uso.',
            ],
            4 => [ // Empleo
                'Desarrollador Full Stack Laravel/Vue 3' => 'Buscamos desarrollador dinámico con experiencia demostrable en backend con Laravel e integración con Vue 3. Trabajo presencial y remoto híbrido.',
                'Asistente Administrativo de Medio Tiempo' => 'Empresa retail solicita asistente para gestión de archivos, atención al cliente y facturación básica. Horario flexible por las mañanas.',
            ],
            5 => [ // Servicios
                'Plomería y Destapes de Cañerías de Emergencia' => 'Servicio técnico garantizado las 24 horas del día. Destapes con guaya eléctrica, reparación de filtraciones e instalación de piezas sanitarias.',
                'Clases Particulares de Programación en Node.js' => 'Aprende a programar desde cero o refuerza tus habilidades. Tutorías personalizadas orientadas a proyectos reales y bases de datos NoSQL/SQL.',
            ],
            6 => [ // Búsqueda de Personal
                'Se solicita Repartidor con Moto Propia' => 'Empresa de delivery busca motorizados para rutas fijas en la ciudad. Ofrecemos salario base más comisiones atractivas por entrega realizada.',
                'Buscamos Personal de Seguridad para Centro Comercial' => 'Se requiere personal masculino con experiencia en vigilancia privada, disponibilidad para turnos rotativos de 12 horas.',
            ],
            7 => [ // Valla Digital
                'Publicidad en Pantalla LED Principal de la Av.' => 'Promociona tu marca en la pantalla de mayor tráfico visual. Segmentos de 10 segundos disponibles en horario estelar.',
            ],
            8 => [ // Obituario
                'En memoria de nuestra querida madre María Pérez' => 'Con profundo dolor, invitamos a sus familiares y allegados al acto de velación que se llevará a cabo en la Funeraria Monumental.',
            ],
            9 => [ // Convocatoria
                'Convocatoria a Asamblea General de Propietarios' => 'Se convoca a todos los copropietarios del Conjunto Residencial a la asamblea ordinaria el sábado a las 10:00 AM para discutir el presupuesto de condominio.',
            ],
            10 => [ // Otros
                'Perro extraviado - Golden Retriever en la Plaza' => 'Responde al nombre de Toby. Lleva collar azul sin placa. Se ofrece gratificación a quien ayude a regresarlo a casa.',
            ]
        ];

        // Ciudades y estados reales de Venezuela para dar realismo a la geolocalización
        $locations = [
            ['state' => 'Miranda', 'city' => 'Chacao'],
            ['state' => 'Distrito Capital', 'city' => 'Caracas'],
            ['state' => 'Carabobo', 'city' => 'Valencia'],
            ['state' => 'Zulia', 'city' => 'Maracaibo'],
            ['state' => 'Lara', 'city' => 'Barquisimeto'],
            ['state' => 'Aragua', 'city' => 'Maracay'],
        ];

        $publications = [];
        $statuses=['por realizar', 'por aprobacion', 'aprobada por publicar','publicada'];
        // 3. Generamos anuncios iterando sobre nuestras categorías definidas
        foreach ($classifiedsTemplates as $categoryId => $templates) {
            foreach ($templates as $name => $description) {
                // Seleccionamos ubicación y usuario al azar
                $location = $locations[array_rand($locations)];
                $userId = $userIds->random();
                $workerId = $worker->random();
                $getRandomNum = random_int(1,2);

                
                // Fecha de creación aleatoria en los últimos 30 días
                $createdAt = Carbon::now()->subDays(rand(1, 30))->subHours(rand(1, 23));
                $publications[] = [
                    'user_id'       => $userId,
                    'category_id'   => $categoryId,
                    'name'          => $name,
                    'slug'          => Str::slug($name) . '-' . rand(100, 999), 
                    'description'   => $description,
                    'status'        => $statuses[array_rand($statuses,1)],
                    'state'         => $location['state'],
                    'city'          => $location['city'],
                    'published_at'  => $createdAt,
                    'created_at'    => $createdAt,
                    'updated_at'    => $createdAt,
                    'worker_id' => $getRandomNum == 1?$workerId:null
                ];
            }
        }

        // 4. Inserción masiva optimizada en la Base de Datos
        Publication::insert($publications);
        
        $this->command->info('¡Se han sembrado ' . count($publications) . ' publicaciones correctamente!');
    }
}
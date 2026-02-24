<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\PublicationView;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PublicationViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $publications = Publication::where('views', '>', 0)->get();
        $userIds = User::pluck('id')->toArray();
        $data = [];
        foreach ($publications as $publication) {
            $totalViews = $publication->views;


            for ($i = 0; $i < $totalViews; $i++) {


                $daysAgo = rand(0, 30);
                $viewDate = Carbon::now()->subDays($daysAgo);

                if ($viewDate->lt($publication->created_at)) {
                    $viewDate = $publication->created_at->addHours(rand(1, 24));
                }

                $data[] = [
                    'publication_id' => $publication->id,
                    'ip' => rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255),
                    'user_agent' => 'Mozilla/5.0 (Fake Agent ' . rand(1, 100) . ')',
                    'viewer_id' => rand(1, 10) > 7 ? $userIds[array_rand($userIds)] : null,
                    'viewed_at' => $viewDate,
                ];
            }
        }

        PublicationView::insert($data);
    }
}

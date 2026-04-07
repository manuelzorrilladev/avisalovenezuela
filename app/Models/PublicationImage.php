<?php

namespace App\Models;

use App\Models\Publication;
use Illuminate\Database\Eloquent\Model;

class PublicationImage extends Model
{

    protected $fillable = [
        'path',
        'is_featured',
        'sort_order',

    ];
    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }
}

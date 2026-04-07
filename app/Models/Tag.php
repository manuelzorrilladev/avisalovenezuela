<?php

namespace App\Models;

use App\Models\Publication;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function subCategories(){
        return $this->belongsTo(subCategory::class);
    }
      public function publications()
    {
        return $this->hasMany(Publication::class);
    }
}

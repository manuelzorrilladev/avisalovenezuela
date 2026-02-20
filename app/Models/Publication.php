<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Comment;
use App\Models\PublicationImage;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Publication extends Model
{
    protected $casts = [
        'specs' => 'array',
    ];


    public function images()
    {
        return $this->hasMany(PublicationImage::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }


    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
    public function subCategories()
    {
        return $this->belongsTo(SubCategory::class);
    }
    public function userRelations()
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        // Cargamos solo los comentarios raíz (donde parent_id es null)
        // y traemos sus respuestas anidadas automáticamente
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }
}

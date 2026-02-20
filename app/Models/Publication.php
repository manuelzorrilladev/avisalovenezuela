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

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
    public function userRelations()
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
 
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }
}

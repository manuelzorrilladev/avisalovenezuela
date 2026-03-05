<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Comment;
use App\Models\PublicationImage;
use App\Models\PublicationView;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Publication extends Model
{
    protected $casts = [
        'specs' => 'array',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($publication) {
            $publication->slug = \Illuminate\Support\Str::slug($publication->name);
        });

     
    }

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

    public function detailedViews(): HasMany
    {
        return $this->hasMany(PublicationView::class);
    }
}

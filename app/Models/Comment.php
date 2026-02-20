<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    protected $fillable = ['publication_id', 'user_id', 'parent_id', 'content'];

    // Relación con el autor
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Obtener las respuestas de este comentario
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Relación inversa para saber a qué comentario responde
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}

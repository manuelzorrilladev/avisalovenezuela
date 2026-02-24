<?php

namespace App\Models;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PublicationView extends Model
{
    public $timestamps = false;

    protected $fillable = ['publication_id', 'ip', 'user_agent', 'viewer_id', 'viewed_at'];

    public function publication(): BelongsTo
    {
        return $this->belongsTo(Publication::class);
    }

    public function viewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'viewer_id');
    }
}

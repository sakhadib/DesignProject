<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContestParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'contest_id',
        'user_id',
    ];

    public function contest()
    {
        return $this->belongsTo(Contest::class)->withCount(['participants', 'problems']);
    }


    public function privateContest()
    {
        return $this->belongsTo(Contest::class)->where('type', 'user-created')->withCount(['participants', 'problems']);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

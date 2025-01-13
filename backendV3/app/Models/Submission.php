<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'problem_id',
        'answer',
        'xp',
        'penalty'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function problem()
    {
        return $this->belongsTo(Problem::class);
    }

    public function assignXP($xp)
    {
        $this->xp = $xp;
        $this->save();
    }

    public function assignPenalty($penalty)
    {
        $this->penalty = $penalty;
        $this->save();
    }
}

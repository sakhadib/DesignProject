<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_time',
        'end_time',
        'status',
        'type',
        'visibility',
        'password',
        'created_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function problems()
    {
        return $this->hasMany(ContestProblem::class)->with('problem:id,title,xp');
    }

    public function fullProblems()
    {
        return $this->hasMany(ContestProblem::class)->with('problem');
    }

    public function participants()
    {
        return $this->hasMany(ContestParticipant::class);
    }


    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    
}

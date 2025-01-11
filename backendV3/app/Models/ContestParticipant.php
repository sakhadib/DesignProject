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

    // //constructor
    // public function __construct($contest_id, $user_id)
    // {
    //     $this->contest_id = $contest_id;
    //     $this->user_id = $user_id;
    // }

    public function contest()
    {
        return $this->belongsTo(Contest::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

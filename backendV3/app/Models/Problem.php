<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'xp',
        'answer',
        'note',
        'status',
        'tags',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class)
                    ->with('user:id,username')
                    ->select(['id', 'user_id', 'problem_id','contest_id', 'xp', 'penalty', 'created_at']);
    }

    public function isPublished()
    {
        return $this->status === 'published';
    }

    public function publish()
    {
        $this->status = 'published';
        $this->save();
    }

    public function approve()
    {
        $this->status = 'approved';
        $this->save();
    }

    public function unpublish()
    {
        $this->status = 'unpublished';
        $this->save();
    }

    public function getTags()
    {
        return json_decode($this->tags);
    }

    public function setTags($tags)
    {
        $this->tags = json_encode($tags);
        $this->save();
    }


    public function gettagsAttribute($value)
    {
        return json_decode($value, true); // Decode to an associative array
    }
}

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
}

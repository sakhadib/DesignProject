<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'blog_id',
        'vote',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    public function scopeUserVote($query, $blog_id)
    {
        return $query->where('user_id', auth()->user()->id)->where('blog_id', $blog_id);
    }

    public function scopeBlogVotes($query, $blog_id)
    {
        return $query->where('blog_id', $blog_id);
    }

    public function scopeBlogVotesCount($query, $blog_id)
    {
        return $query->where('blog_id', $blog_id)->count();
    }

    public function scopeBlogVotesSum($query, $blog_id)
    {
        return $query->where('blog_id', $blog_id)->sum('vote');
    }

    
}

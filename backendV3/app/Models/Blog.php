<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'user_id',
        'category',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function upVotes()
    {
        return $this->votes()->where('vote', true);
    }

    public function downVotes()
    {
        return $this->votes()->where('vote', false);
    }

    public function myVote()
    {
        return $this->votes()->where('user_id', auth()->user()->id);
    }

    public function scopeBlogVotesCount($query)
    {
        return $query->withCount('votes');
    }

    public function scopeBlogVotesSum($query)
    {
        return $query->withSum('votes', 'vote');
    }

    public function scopeBlogVotes($query)
    {
        return $query->with('votes');
    }

    public function scopeBlogComments($query)
    {
        return $query->with('comments');
    }

    public function scopeBlogUserVote($query)
    {
        return $query->with(['votes' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }]);
    }

    public function scopeBlogUserComment($query)
    {
        return $query->with(['comments' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }]);
    }

    public function scopeBlogUserVoteComment($query)
    {
        return $query->with(['votes' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }])->with(['comments' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }]);
    }


    public function scopeBlogUserVoteCommentCount($query)
    {
        return $query->withCount(['votes' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }])->withCount(['comments' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }]);
    }

    public function scopeBlogUserVoteCommentSum($query)
    {
        return $query->withSum(['votes' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }], 'vote')->withCount(['comments' => function ($query) {
            $query->where('user_id', auth()->user()->id);
        }]);
    }

    


}

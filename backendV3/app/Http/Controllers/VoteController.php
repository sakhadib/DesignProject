<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Vote;
use App\Models\User;
use App\Models\Blog;

class VoteController extends Controller
{
    public function createVote(Request $request)
    {
        $request->validate([
            'blog_id' => 'required|integer',
            'vote' => 'required|boolean',
        ]);

        $vote = Vote::userVote($request->blog_id)->first();

        if ($vote) {
            $vote->vote = $request->vote;
            $vote->save();
        } else {
            $vote = new Vote();
            $vote->user_id = auth()->user()->id;
            $vote->blog_id = $request->blog_id;
            $vote->vote = $request->vote;
            $vote->save();
        }

        return response()->json([
            'message' => 'Vote created successfully',
            'vote' => $vote
        ], 201);
    }


    public function deleteVote(Request $request)
    {
        $request->validate([
            'blog_id' => 'required|integer',
        ]);
        
        $blog_id = $request->blog_id;
        $vote = Vote::userVote($blog_id)->first();

        if (!$vote) {
            return response()->json([
                'message' => 'Vote not found'
            ], 404);
        }

        $vote->delete();
        return response()->json([
            'message' => 'Vote deleted successfully'
        ], 200);
    }

    public function getBlogVotes($blog_id)
    {
        $votes = Vote::blogVotes($blog_id)->get();
        
        $temp_vote_array = [];

        foreach ($votes as $vote) {
            $user = User::find($vote->user_id);
            $temp_vote = [
                'user_id' => $user->id,
                'user_name' => $user->username,
                'vote' => $vote->vote
            ];
            array_push($temp_vote_array, $temp_vote);
        }
        
        
        $votes_count = Vote::blogVotesCount($blog_id);
        $votes_sum = Vote::blogVotesSum($blog_id);

        return response()->json([
            'votes' => $temp_vote_array,
            'votes_count' => $votes_count,
            'votes_sum' => $votes_sum
        ], 200);
    }

}

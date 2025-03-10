<?php

namespace App\Http\Controllers;

use App\Models\Contest;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function getRating($user_id)
    {
        $rating = $this->getUserRating($user_id);
        if ($rating == null) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json(['rating' => $rating]);
    }

    public function getMyRating()
    {
        $user_id = auth()->user()->id;
        $rating = $this->getUserRating($user_id);
        if ($rating == null) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json(['rating' => $rating]);
    }

    public function getRatingHistory($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        $ratings = Rating::where('user_id', $user_id)->orderBy('created_at', 'desc')->get();
        return response()->json(['ratings' => $ratings]);
    }

    public function getMyRatingHistory()
    {
        $user_id = auth()->user()->id;
        $ratings = Rating::where('user_id', $user_id)->orderBy('created_at', 'desc')->get();
        return response()->json(['ratings' => $ratings]);
    }

    public function ratingsForContest($contest_id)
    {
        $contest = Contest::find($contest_id);
        if ($contest == null) {
            return response()->json(['error' => 'Contest not found'], 404);
        }
        $ratings = Rating::where('contest_id', $contest_id)
                         ->with('user')
                         ->orderBy('created_at', 'desc')
                         ->get();
        return response()->json(['ratings' => $ratings]);
    }






    // Utils
    private function getUserRating($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return null;
        }
        
        $initial_rating = 1500;
        $rating_delta = Rating::whereNotNull('contest_id')->where('user_id', $user_id)->sum('rating_change');
        return $initial_rating + $rating_delta;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use App\Models\Rating;
use App\Models\Submission;
use Illuminate\Http\Request;

use App\Models\User;

class UserPageController extends Controller
{
    public function getUserDetails($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        return response()->json([
            'user' => $user
        ], 200);
    }

    public function getUserRating($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        $initialRating = 1500;
        $delta = Rating::whereNotNull('contest_id')
                       ->where('user_id', $user_id)
                       ->sum('rating_change');
        $rating = $initialRating + $delta;
        return response()->json([
            'rating' => $rating
        ], 200);
    }

    public function getUserRatingHistory($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        $ratings = Rating::where('user_id', $user_id)
                         ->orderBy('created_at', 'desc')
                         ->get(['id', 'contest_id', 'rating_change', 'created_at']);
        return response()->json([
            'user' => $user,
            'ratings' => $ratings
        ], 200);
    }

    public function dateWiseSubmissionCount($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        $submissions = Submission::where('user_id', $user_id)
                             ->orderBy('created_at', 'desc')
                             ->get(['created_at']);
        $dateWiseSubmissionCount = [];
        foreach ($submissions as $submission) {
            $date = explode(' ', $submission->created_at)[0];
            if (!array_key_exists($date, $dateWiseSubmissionCount)) {
                $dateWiseSubmissionCount[$date] = 0;
            }
            $dateWiseSubmissionCount[$date]++;
        }
        return response()->json([
            'user' => $user,
            'dateWiseSubmissionCount' => $dateWiseSubmissionCount
        ], 200);
    }

    public function lastFiveSubmittedProblems($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        $submissions = Submission::where('user_id', $user_id)
                 ->orderBy('created_at', 'desc')
                 ->get()
                 ->unique('problem_id')
                 ->take(5)
                 ->values()
                 ->map(function ($submission) {
                 return [
                     'problem_id' => $submission->problem_id,
                     'created_at' => $submission->created_at,
                 ];
                 });

        $problems = [];

        foreach ($submissions as $submission) {
            $problem = Problem::where('id', $submission['problem_id'])
                              ->select('id', 'title', 'tags')
                              ->first();
            array_push($problems, $problem);
            
        }
                                 
                             
        return response()->json([
            'user' => $user,
            'problems' => $problems,
        ], 200);
    }

    public function allSolvedProblems($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        $submissions = Submission::where('user_id', $user_id)
                 ->where('xp', '>', 0)
                 ->get()
                 ->unique('problem_id')
                 ->values()
                 ->map(function ($submission) {
                 return [
                     'problem_id' => $submission->problem_id,
                     'created_at' => $submission->created_at,
                 ];
                 });

        $problems = [];

        foreach ($submissions as $submission) {
            $problem = Problem::where('id', $submission['problem_id'])
                              ->select('id', 'title', 'tags')
                              ->first();
            array_push($problems, $problem);
            
        }
                                 
                             
        return response()->json([
            'user' => $user,
            'problems' => $problems,
        ], 200);
    }
}

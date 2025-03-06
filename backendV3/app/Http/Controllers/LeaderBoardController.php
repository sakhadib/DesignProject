<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contest;
use App\Models\ContestParticipant;
use App\Models\Submission;
use App\Models\User;

class LeaderBoardController extends Controller
{
    public function getContestLeaderboard($contest_id)
    {
        $contest = Contest::find($contest_id);
        if(!$contest) {
            return response()->json([
                'message' => 'Contest not found'
            ], 404);
        }

        $user_ids_in_contest = ContestParticipant::where('contest_id', $contest_id)
                                                 ->pluck('user_id')
                                                 ->toArray();
        
        $users = [];
        
        foreach($user_ids_in_contest as $user_id) {
            $user = User::where('id', $user_id)->first(['id', 'username']);
            $submissions = Submission::where('user_id', $user_id)
                                     ->where('contest_id', $contest_id)
                                     ->groupBy(['problem_id', 'penalty'])
                                     ->selectRaw('problem_id, penalty, max(xp) as xp')
                                     ->get();
            $user->submissions = $submissions;
            $users[] = $user;
        }

        return response()->json([
            'participants' => $users
        ], 200);
    }
}

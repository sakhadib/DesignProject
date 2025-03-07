<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contest;
use App\Models\ContestParticipant;
use App\Models\Submission;
use App\Models\User;

class LeaderBoardController extends Controller
{
    /**
     * Summary of getContestLeaderboard
     * @param mixed $contest_id
     * @return mixed|\Illuminate\Http\JsonResponse
     * 
     * The function performs the following steps:
     * 1. Finds the contest by its ID. If not found, returns a 404 response with a 'Contest not found' message.
     * 2. Retrieves the user IDs of all participants in the specified contest.
     * 3. For each user ID, retrieves the user details and their submissions for the specified contest, grouped by problem ID and penalty, and selects the maximum XP for each group.
     * 4. Returns a JSON response with the participants' details, including their user ID, username, and submissions.
     */
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
                                     ->groupBy(['problem_id'])
                                     ->selectRaw('problem_id, max(xp) as xp, min(penalty) as penalty, count(xp) as submission_count')
                                     ->get();
            $user->submissions = $submissions;
            $users[] = $user;
        }

        return response()->json([
            'contest' => $contest,
            'participants' => $users
        ], 200);
    }


    
    /**
     * Calculate the total penalty and XP of a user in a specific contest.
     *
     * @param int $contest_id The ID of the contest.
     * @param int $user_id The ID of the user.
     * @return \Illuminate\Http\JsonResponse JSON response containing user and contest details, including total penalty, total XP, and number of attempted problems.
     *
     * The function performs the following steps:
     * 1. Finds the contest by its ID. If not found, returns a 404 response with a 'Contest not found' message.
     * 2. Finds the user by their ID. If not found, returns a 404 response with a 'User not found' message.
     * 3. Retrieves the user's submissions for the specified contest, grouped by problem ID and penalty, and selects the maximum XP for each group.
     * 4. Calculates the total penalty and total XP from the retrieved submissions.
     * 5. Counts the number of attempted problems.
     * 6. Returns a JSON response with the user ID, username, contest ID, total penalty, total XP, and number of attempted problems.
     */
    public function totalPenaltyOfAnUser($contest_id, $user_id)
    {
        $contest = Contest::find($contest_id);
        if(!$contest) {
            return response()->json([
                'message' => 'Contest not found'
            ], 404);
        }

        $user = User::find($user_id);
        if(!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $submissions = Submission::where('user_id', $user_id)
                                 ->where('contest_id', $contest_id)
                                 ->groupBy(['problem_id'])
                                 ->selectRaw('problem_id, max(xp) as xp, min(penalty) as penalty, count(xp) as submission_count')
                                 ->get();

        $total_penalty = 0;
        $total_xp = 0;
        foreach($submissions as $submission) {
            $total_penalty += $submission->penalty;
            $total_xp += $submission->xp;
        }

        $attempted_problems = count($submissions);

        $contest_id = intval($contest_id);
        $user_id = intval($user_id);

        return response()->json([
            'user' => [
                'id' => $user->id,
                'username' => $user->username
            ],
            'contest' => [
                'contest_id' => $contest_id,
                'total_penalty' => $total_penalty,
                'total_xp' => $total_xp,
                'attempted_problems' => $attempted_problems
            ],
            "submissions" => $submissions
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contest;
use App\Models\ContestProblem;
use App\Models\ContestParticipant;  
use App\Models\User;

class ContestGetController extends Controller
{
    /**
     * Get all contests
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllContests()
    {
        $contests = Contest::with(['problems', 'user:id,username'])
                           ->withCount(['participants', 'problems'])
                           ->get();

        return response()->json([
            'message' => 'All contests',
            'contests' => $contests
        ]);
    }



    /**
     * Get all upcoming contests
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUpcomingContests()
    {
        $contests = Contest::where('start_time', '>', now())
                           ->with(['problems', 'user:id,username'])
                           ->withCount(['participants', 'problems'])
                           ->get();

        return response()->json([
            'message' => 'Upcoming contests',
            'contests' => $contests
        ]);
    }




    /**
     * Get all contests that are currently running
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRunningContests()
    {
        $contests = Contest::where('start_time', '<', now())
                           ->where('end_time', '>', now())
                           ->with(['problems', 'user:id,username'])
                           ->withCount(['participants', 'problems'])
                           ->get();

        if($contests->isEmpty()){
            return response()->json([
                'message' => 'No contests are currently running'
            ]);
        }

        return response()->json([
            'message' => 'Running contests',
            'contests' => $contests
        ]);
    }




    /**
     * Get all contests that have ended
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function allEndedContests()
    {
        $contests = Contest::where('end_time', '<', now())
                           ->with(['problems', 'user:id,username'])
                           ->withCount(['participants', 'problems'])
                           ->get();

        if($contests->isEmpty()){
            return response()->json([
                'message' => 'No contests have ended'
            ]);
        }

        return response()->json([
            'message' => 'Ended contests',
            'contests' => $contests
        ]);
    }



    /**
     * Get all contests created by the currently logged in user
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function myCreatedContests()
    {
        $this_user_id = auth()->user()->id;
        $this_user = User::find($this_user_id);

        $contests = Contest::where('created_by', $this_user_id)
                           ->with(['problems'])
                           ->withCount(['participants', 'problems'])
                           ->get();

        return response()->json([
            'message' => 'My created contests',
            'creator' => $this_user,
            'contests' => $contests
        ]);
    }




    /**
     * Get all contests participated by the currently logged in user
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function userCreatedContests($user_id)
    {
        $user = User::find($user_id);

        if(!$user){
            return response()->json([
                'message' => 'User not found'
            ]);
        }

        $contests = Contest::where('created_by', $user_id)
                           ->with(['problems'])
                           ->withCount(['participants', 'problems'])
                           ->get();

        return response()->json([
            'message' => 'User created contests',
            'creator' => $user,
            'contests' => $contests
        ]);
    }





    /**
     * Get single contest by id
     * 
     * @param $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleContest($contest_id)
    {
        $contest = Contest::where('id', $contest_id)
                          ->where('start_time', '>', now())
                          ->with(['fullProblems', 'user:id,username'])
                          ->withCount(['participants', 'problems'])
                          ->get();

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        return response()->json([
            'message' => 'Contest found',
            'contest' => $contest
        ]);
    }

    
}

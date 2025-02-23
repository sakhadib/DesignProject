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
        $contests = Contest::where('type', 'admin-created')
                           ->with(['user:id,username'])
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
                           ->where('type', 'admin-created')
                           ->with(['user:id,username'])
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
                           ->where('type', 'admin-created')
                           ->with(['user:id,username'])
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
                           ->where('type', 'admin-created')
                           ->with(['user:id,username'])
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
                          ->with(['user:id,username'])
                          ->withCount(['participants', 'problems', 'submissions'])
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




    /**
     * Get problems of a contest
     * 
     * @param $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProblems($contest_id)
    {
        $contest = Contest::find($contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        if($contest->start_time > now()){
            return response()->json([
                'message' => 'Contest has not started yet'
            ]);
        }

        $problems = ContestProblem::where('contest_id', $contest_id)
                                  ->with('problem')
                                  ->get();

        return response()->json([
            'message' => 'Problems of the contest',
            'contest' => $contest,
            'problems' => $problems
        ]);
    }




    /**
     * Get Participant List of a contest
     * 
     * @param $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getParticipantList($contest_id)
    {
        $contest = Contest::find($contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        $participants = ContestParticipant::where('contest_id', $contest_id)
                                         ->with('user:id,username')
                                         ->get(['id', 'user_id']);

        return response()->json([
            'message' => 'Participants of the contest',
            'contest' => $contest,
            'participants' => $participants
        ]);
    }




    /**
     * Get My Participated Contests
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function myParticipatedContests()
    {
        $this_user_id = auth()->user()->id;
        $this_user = User::find($this_user_id);

        $contests = ContestParticipant::where('user_id', $this_user_id)
                                     ->with('contest')
                                     ->get();

        return response()->json([
            'message' => 'My participated contests',
            'user' => $this_user,
            'contests' => $contests
        ]);
    }




    /**
     * Contests that current user is registered in and in future
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function myFutureContests()
    {
        $this_user_id = auth()->user()->id;
        $this_user = User::find($this_user_id);

        $contests = ContestParticipant::where('user_id', $this_user_id)
                                     ->whereHas('contest', function($query){
                                         $query->where('start_time', '>', now());
                                     })
                                     ->with('contest')
                                     ->get();

        return response()->json([
            'message' => 'My future contests',
            'user' => $this_user,
            'contests' => $contests
        ]);
    }





    /**
     * Get all contests participated by a user
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function userParticipatedContests($user_id)
    {
        $user = User::find($user_id);

        if(!$user){
            return response()->json([
                'message' => 'User not found'
            ]);
        }

        $contests = ContestParticipant::where('user_id', $user_id)
                                     ->with('contest')
                                     ->get();

        return response()->json([
            'message' => 'User participated contests',
            'user' => $user,
            'contests' => $contests
        ]);
    }



    /**
     * Summary of amIregistered
     * 
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function amIregistered(Request $request)
    {
        $request->validate([
            'contest_id' => 'required'
        ]);

        $this_user_id = auth()->user()->id;
        $user = User::find($this_user_id);

        $contest = ContestParticipant::where('contest_id', $request->contest_id)
                                     ->with('contest')
                                     ->where('user_id', $this_user_id)
                                     ->first();

        if($contest){
            return response()->json([
                'message' => 'User is registered in the contest',
                'contest' => $contest,
                'user' => $user
            ]);
        }

        return response()->json([
            'message' => 'User is not registered in the contest'
        ]);
    }




    

    
}

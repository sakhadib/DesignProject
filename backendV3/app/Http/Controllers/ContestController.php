<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contest;
use App\Models\ContestProblem;
use App\Models\ContestParticipant;
use App\Models\Problem;
use App\Models\User;
use App\Models\Submission;

class ContestController extends Controller
{
    /** 
     * Create a new contest
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */    
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        $this_user_id = auth()->user()->id;
        $this_user = User::find($this_user_id);

        $visibility = "private";
        $type = "user-created";
        $status = "pending";

        $password = "default";

        if($this_user->isAdmin()){
            $visibility = "public";
            $type = "admin-created";
        }
        else{
            $password = $request->password;
        }

        $contest = new Contest();
        $contest->title = $request->title;
        $contest->description = $request->description;
        $contest->start_time = $request->start_time;
        $contest->end_time = $request->end_time;
        $contest->password = $password;
        $contest->visibility = $visibility;
        $contest->type = $type;
        $contest->status = $status;
        $contest->created_by = $this_user_id;
        $contest->save();

        return response()->json([
            'message' => 'Contest Created Successfully',
            'contest' => $contest
        ]);

    }


    /**
     * Update a contest
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'contest_id' => 'required',
        ]);

        $contest = Contest::find($request->contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        $this_user_id = auth()->user()->id;

        if($contest->created_by != $this_user_id){
            return response()->json([
                'message' => 'You do not have permission to edit this contest'
            ]);
        }

        if($request->title){
            $contest->title = $request->title;
        }

        if($request->description){
            $contest->description = $request->description;
        }

        if($request->start_time){
            $start_time = strtotime($request->start_time);
            $current_time = strtotime(now());
            if($start_time < $current_time + 600){
            return response()->json([
                'message' => 'Start time must be at least 10 minutes in the future'
            ]);
            }
            $contest->start_time = $request->start_time;
        }

        if($request->end_time){
            $end_time = strtotime($request->end_time);
            $start_time = strtotime($contest->start_time);
            if($end_time < $start_time + 600){
            return response()->json([
                'message' => 'End time must be at least 10 minutes after start time'
            ]);
            }
            $contest->end_time = $request->end_time;
        }

        if($request->password){
            $contest->password = $request->password;
        }

        $contest->save();

        return response()->json([
            'message' => 'Contest Edited Successfully',
            'contest' => $contest
        ]);


    }




    /**
     * Delete a contest
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $request->validate([
            'contest_id' => 'required'
        ]);

        $contest = Contest::find($request->contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        $this_user_id = auth()->user()->id;

        if($contest->created_by != $this_user_id || !User::find($this_user_id)->isAdmin()){
            return response()->json([
                'message' => 'You do not have permission to delete this contest'
            ]);
        }

        $contest->delete();

        return response()->json([
            'message' => 'Contest Deleted Successfully'
        ]);
    }




    /**
     * Add a problem to a contest
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addProblem(Request $request)
    {
        $request->validate([
            'contest_id' => 'required',
            'problem_id' => 'required'
        ]);

        $contest = Contest::find($request->contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        $this_user_id = auth()->user()->id;

        if($contest->created_by != $this_user_id){
            return response()->json([
                'message' => 'You do not have permission to add problems to this contest'
            ]);
        }

        $problem = Problem::find($request->problem_id);

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ]);
        }

        $points = $problem->xp;
        if($request->points){
            $points = $request->points;
        }

        $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();
        $order = $number_of_problems + 1;

        $contest_problem = new ContestProblem();
        $contest_problem->contest_id = $contest->id;
        $contest_problem->problem_id = $problem->id;
        $contest_problem->points = $points;
        $contest_problem->order = $order;
        $contest_problem->added_by = $this_user_id;
        $contest_problem->save();

        $problem->inContest();

        return response()->json([
            'message' => 'Problem added to contest successfully',
        ]);
    }



    /**
     * Remove a problem from a contest
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeProblem(Request $request)
    {
        $request->validate([
            'contest_id' => 'required',
            'problem_id' => 'required'
        ]);

        $contest = Contest::find($request->contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        $this_user_id = auth()->user()->id;

        if($contest->created_by != $this_user_id){
            return response()->json([
                'message' => 'You do not have permission to remove problems from this contest'
            ]);
        }

        $problem = Problem::find($request->problem_id);

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ]);
        }

        $contest_problem = ContestProblem::where('contest_id', $contest->id)
                                         ->where('problem_id', $problem->id)
                                         ->first();

        if(!$contest_problem){
            return response()->json([
                'message' => 'Problem not found in this contest'
            ]);
        }

        $contest_problem->delete();

        $problem->approve();

        return response()->json([
            'message' => 'Problem removed from contest successfully',
        ]);
    }




    /**
     * Register for a contest
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'contest_id' => 'required'
        ]);

        $contest = Contest::find($request->contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        if($contest->type == "user-created")
        {
            $request->validate([
                'password' => 'required'
            ]);

            if($contest->password != $request->password){
                return response()->json([
                    'message' => 'Incorrect password'
                ]);
            }
        }

        $this_user_id = auth()->user()->id;

        $contest_participant = new ContestParticipant();
        $contest_participant->contest_id = $contest->id;
        $contest_participant->user_id = $this_user_id;
        $contest_participant->save();

        return response()->json([
            'message' => 'Registered for contest successfully',
        ]);
    }



    /**
     * Unregister from a contest
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unregister(Request $request)
    {
        $request->validate([
            'contest_id' => 'required'
        ]);

        $contest = Contest::find($request->contest_id);

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ]);
        }

        $this_user_id = auth()->user()->id;

        $contest_participant = ContestParticipant::where('contest_id', $contest->id)
                                                 ->where('user_id', $this_user_id)
                                                 ->first();

        if(!$contest_participant){
            return response()->json([
                'message' => 'You are not registered for this contest'
            ]);
        }

        $contest_participant->delete();

        return response()->json([
            'message' => 'Unregistered from contest successfully',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contest;
use App\Models\ContestProblem;
use App\Models\ContestParticipant;
use App\Models\Problem;
use App\Models\User;

class ContestController extends Controller
{
    /**
     * * Create a new Contest.
     * Any user can create a contest. 
     * 
     * @param Request $request -> title, description, start_time, end_time, status, type, visibility, password
     * @return \Illuminate\Http\JsonResponse
     */
    public function createContest(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'status' => 'required|in:active,upcoming,ended',
            'type' => 'required|in:public,private',
            'visibility' => 'required|in:visible,hidden',
            'password' => 'required_if:type,private|string',
        ]);


        if (!\DateTime::createFromFormat('Y-m-d H:i:s', $request->start_time) || !\DateTime::createFromFormat('Y-m-d H:i:s', $request->end_time)) {
            return response()->json([
            'message' => 'Invalid date format. Please use Y-m-d H:i:s format.',
            ], 400);
        }

        if($request->start_time <= now()){
            return response()->json([
                'message' => 'Start time must be greater than current time',
            ], 400);
        }

        if($request->start_time >= $request->end_time){
            return response()->json([
                'message' => 'End time must be greater than start time',
            ], 400);
        }

        $contest = Contest::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => $request->status,
            'type' => $request->type,
            'visibility' => $request->visibility,
            'password' => $request->password,
            'created_by' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Contest created successfully',
            'contest' => $contest,
        ]);
    }





    /**
     * * Edit a Contest.
     * Only the creator of the contest can edit it.
     * 
     * @param Request $request -> contest_id, title, description, start_time, end_time, status, type, visibility, password
     * @return \Illuminate\Http\JsonResponse
     */
    public function editContest(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'status' => 'required|in:active,upcoming,ended',
            'type' => 'required|in:public,private',
            'visibility' => 'required|in:visible,hidden',
            'password' => 'required_if:type,private|string',
        ]);

        if (!\DateTime::createFromFormat('Y-m-d H:i:s', $request->start_time) || !\DateTime::createFromFormat('Y-m-d H:i:s', $request->end_time)) {
            return response()->json([
            'message' => 'Invalid date format. Please use Y-m-d H:i:s format.',
            ], 400);
        }

        $contest = Contest::where('id', $request->contest_id)
            ->where('created_by', auth()->id())
            ->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        $contest->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => $request->status,
            'type' => $request->type,
            'visibility' => $request->visibility,
            'password' => $request->password,
        ]);

        return response()->json([
            'message' => 'Contest updated successfully',
            'contest' => $contest,
        ]);
    }





    /**
     * * Delete a Contest.
     * Only the creator of the contest can delete it. if its active or ended then it can't be deleted. 
     * 
     * @param Request $request -> contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteContest(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
        ]);

        $contest = Contest::where('id', $request->contest_id)
            ->where('created_by', auth()->id())
            ->whereNotIn('status', ['active', 'ended'])
            ->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found or it is active/ended',
            ], 404);
        }

        $contest->delete();

        return response()->json([
            'message' => 'Contest deleted successfully',
        ]);
    }






    /**
     * * Add a problem to a contest.
     * Only the creator of the contest can add problems to it.
     * 
     * @param Request $request -> contest_id, problem_id, points, order
     * @return \Illuminate\Http\JsonResponse
     */
    public function addProblem(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
            'problem_id' => 'required|integer',
            'points' => 'required|integer',
            'order' => 'required|integer',
        ]);

        $contest = Contest::where('id', $request->contest_id)
            ->where('created_by', auth()->id())
            ->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        $problem = Problem::where('id', $request->problem_id)->first();

        if (!$problem) {
            return response()->json([
                'message' => 'Problem not found',
            ], 404);
        }

        if(!$problem->isPublished()){
            return response()->json([
                'message' => 'Problem is not published yet',
            ], 400);
        }

        $contestProblem = ContestProblem::create([
            'contest_id' => $request->contest_id,
            'problem_id' => $request->problem_id,
            'points' => $request->points,
            'order' => $request->order,
            'added_by' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Problem added to contest successfully',
            'contest_problem' => $contestProblem,
        ]);
    }







    /**
     * * Remove a problem from a contest.
     * Only the creator of the contest can remove problems from it.
     * 
     * @param Request $request -> contest_id, problem_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeProblem(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
            'problem_id' => 'required|integer',
        ]);

        $contest = Contest::where('id', $request->contest_id)
            ->where('created_by', auth()->id())
            ->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        $contestProblem = ContestProblem::where('contest_id', $request->contest_id)
            ->where('problem_id', $request->problem_id)
            ->first();

        if (!$contestProblem) {
            return response()->json([
                'message' => 'Problem not found in contest',
            ], 404);
        }

        if(auth()->id() != $contestProblem->added_by){
            return response()->json([
                'message' => 'You are not allowed to remove this problem',
            ], 403);
        }

        $contestProblem->delete();

        return response()->json([
            'message' => 'Problem removed from contest successfully',
        ]);
    }





    

    /**
     * * Register for a contest.
     * Any user can register for a contest.
     * 
     * @param Request $request -> contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function joinContest(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
        ]);

        $contest = Contest::where('id', $request->contest_id)->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        if ($contest->type == 'private' && $contest->password != $request->password) {
            return response()->json([
                'message' => 'Invalid password',
            ], 400);
        }

        $ContestParticipant = ContestParticipant::where('contest_id', $request->contest_id)
            ->where('user_id', auth()->id())
            ->first();

        if ($ContestParticipant) {
            return response()->json([
                'message' => 'Already registered for contest',
            ], 400);
        }

        $contestParticipant = ContestParticipant::create([
            'contest_id' => $request->contest_id,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Registered for contest successfully',
            'contest_participant' => $contestParticipant,
        ]);
    }







    /**
     * * Unregister from a contest.
     * Any user can unregister from a contest.
     * 
     * @param Request $request -> contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function leaveContest(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
        ]);

        $contest = Contest::where('id', $request->contest_id)->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        if($contest->status == 'active' || $contest->status == 'ended'){
            return response()->json([
                'message' => 'Can\'t unregister from active/ended contest',
            ], 400);
        }

        $contestParticipant = ContestParticipant::where('contest_id', $request->contest_id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$contestParticipant) {
            return response()->json([
                'message' => 'Not registered for this contest',
            ], 404);
        }

        $contestParticipant->delete();

        return response()->json([
            'message' => 'Unregistered from contest successfully',
        ]);
    }




    


    /**
     * * Get all public upcoming contests.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function allUpcomingContests()
    {
        $contests = Contest::where('type', 'public')
            ->where('status', 'upcoming')
            ->orderBy('created_at', 'desc')
            ->withCount(['participants', 'problems'])
            ->with(['user'])
            ->get(['id', 'title', 'start_time', 'end_time', 'status', 'type']);

        return response()->json([
            'contests' => $contests->map(function ($contest) {
                return [
                    'id' => $contest->id,
                    'title' => $contest->title,
                    'start_time' => $contest->start_time,
                    'end_time' => $contest->end_time,
                    'status' => $contest->status,
                    'number_of_participants' => $contest->participants_count,
                    'number_of_problems' => $contest->problems_count,
                    'contest_creator' => $contest->user
                ];
            }),
        ]);   
    }
    







    /**
     * * Get all public active contests.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function allActiveContests()
    {
        $contests = Contest::where('type', 'public')
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->with(['user'])
            ->withCount(['participants', 'problems'])
            ->get();

        

        return response()->json([
            'contests' => $contests->map(function ($contest) {
                return [
                    'id' => $contest->id,
                    'title' => $contest->title,
                    'start_time' => $contest->start_time,
                    'end_time' => $contest->end_time,
                    'status' => $contest->status,
                    'number_of_participants' => $contest->participants_count,
                    'number_of_problems' => $contest->problems_count,
                    'contest_creator' => $contest->user
                ];
            }),
        ]);
    }




    


    /**
     * * Get all public ended contests.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function allEndedContests()
    {
        $contests = Contest::where('type', 'public')
            ->where('status', 'ended')
            ->orderBy('created_at', 'desc')
            ->with(['user'])
            ->withCount(['participants', 'problems'])
            ->get();


        return response()->json([
            'contests' => $contests->map(function ($contest) {
                return [
                    'id' => $contest->id,
                    'title' => $contest->title,
                    'start_time' => $contest->start_time,
                    'end_time' => $contest->end_time,
                    'status' => $contest->status,
                    'number_of_participants' => $contest->participants_count,
                    'number_of_problems' => $contest->problems_count,
                    'contest_creator' => $contest->user
                ];
            }),
        ]);
    }







    /**
     * * Get all contests created by this user.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function myCreatedContests()
    {
        $contests = Contest::where('created_by', auth()->id())
            ->orderBy('created_at', 'desc')
            ->withCount(['participants', 'problems'])
            ->get();
        
        $me = User::where('id', auth()->id())->first();

        return response()->json([
            'message' => 'My created contests',
            'contests' => $contests->map(function ($contest) {
                return [
                    'id' => $contest->id,
                    'title' => $contest->title,
                    'start_time' => $contest->start_time,
                    'end_time' => $contest->end_time,
                    'status' => $contest->status,
                    'number_of_participants' => $contest->participants_count,
                    'number_of_problems' => $contest->problems_count,
                ];
            }),
            'total' => $contests->count(),
            'public' => $contests->where('type', 'public')->count(),
            'private' => $contests->where('type', 'private')->count(),
            'me' => $me,
        ]);
    }






    /**
     * * Get all contests created by some user.
     * 
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function userCreatedContests($user_id)
    {
        $user = User::where('id', $user_id)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }
        
        $contests = Contest::where('created_by', $user_id)
                ->where('type', 'public')
                ->orderBy('created_at', 'desc')
                ->withCount(['participants', 'problems'])
                ->get();

        if(count($contests) == 0){
            return response()->json([
                'message' => 'No contests found',
            ], 404);
        }


        return response()->json([
            'message' => 'Contests created by this user',
            'contests' => $contests->map(function ($contest) {
                return [
                    'id' => $contest->id,
                    'title' => $contest->title,
                    'start_time' => $contest->start_time,
                    'end_time' => $contest->end_time,
                    'status' => $contest->status,
                    'number_of_participants' => $contest->participants_count,
                    'number_of_problems' => $contest->problems_count,
                ];
            }),
            'public' => $contests->where('type', 'public')->count(),
            'private' => $contests->where('type', 'private')->count(),
            'user' => $user,
        ]);
    }






    /**
     * * Get a contest. it can be public or private.
     * 
     * @param int $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleContest($contest_id)
    {
        $contest = Contest::where('id', $contest_id)
            ->with(['user'])
            ->withCount(['participants', 'problems'])
            ->first(['id', 'title', 'description', 'start_time', 'end_time', 'type']);

        $returnable_contest = [
            'id' => $contest->id,
            'title' => $contest->title,
            'description' => $contest->description,
            'start_time' => $contest->start_time,
            'end_time' => $contest->end_time,
            'type' => $contest->type,
            'number_of_participants' => $contest->participants_count,
            'number_of_problems' => $contest->problems_count,
            'contest_creator' => $contest->user,
        ];

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        if ($contest->status == 'upcoming') {
            return response()->json([
                'message' => 'Can\'t access upcoming contest',
            ], 400);
        }

        if ($contest->type == 'private') {
            $contestParticipant = ContestParticipant::where('contest_id', $contest_id)
                ->where('user_id', auth()->id())
                ->first();

            if (!$contestParticipant) {
                return response()->json([
                    'message' => 'You are not registered for this contest',
                ], 403);
            }
        }

        // now the contest is either active or ended and also if private then the user is registered for it

        $contestProblems = ContestProblem::where('contest_id', $contest_id)
            ->orderBy('order', 'asc')
            ->with(['problem'])
            ->get()
            ->map(function ($contestProblem) {
                return [
                    'id' => $contestProblem->problem->id,
                    'title' => $contestProblem->problem->title,
                    'xp' => $contestProblem->problem->xp,
                    'points' => $contestProblem->points,
                    'order' => $contestProblem->order,
                    'tags' => json_decode($contestProblem->problem->tags), // Decode tags as JSON
                ];
            });

        return response()->json([
            'contest' => $returnable_contest,
            'problems' => $contestProblems,
        ]);
    }






    /**
     * * Get all participants of a contest.
     * 
     * @param int $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function contestParticipants($contest_id)
    {
        $contest = Contest::where('id', $contest_id)->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        $contestParticipants = ContestParticipant::where('contest_id', $contest_id)
        ->with(['user'])
        ->get();


        return response()->json([
            'participants' => $contestParticipants->map(function ($contestParticipant) {
                return [
                    'user_id' => $contestParticipant->user->id,
                    'username' => $contestParticipant->user->username,
                    'registration_time' => $contestParticipant->created_at,
                ];
            }),
        ]);
    }    
}

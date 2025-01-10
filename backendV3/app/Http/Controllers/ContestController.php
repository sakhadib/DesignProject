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
    public function registerContest(Request $request)
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
    public function unregisterContest(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|integer',
        ]);

        $contestParticipant = ContestParticipant::where('contest_id', $request->contest_id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$contestParticipant) {
            return response()->json([
                'message' => 'Not registered for contest',
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
            ->get();

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }

        return response()->json([
            'contests' => $contests,
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
            ->get();

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }

        return response()->json([
            'contests' => $contests,
        ]);
    }


    /**
     * * Get all public ended contests.
     */
    public function allEndedContests()
    {
        $contests = Contest::where('type', 'public')
            ->where('status', 'ended')
            ->orderBy('created_at', 'desc')
            ->get();

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }

        return response()->json([
            'contests' => $contests,
        ]);
    }


    /**
     * * Get all contests created by this user.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function myCreatedContests()
    {
        $contests = Contest::where('created_by', auth()->id())->orderBy('created_at', 'desc')->get();

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }

        return response()->json([
            'contests' => $contests,
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
        $contests = Contest::where('created_by', $user_id)
                ->where('type', 'public')
                ->orderBy('created_at', 'desc')->get();

        if(count($contests) == 0){
            return response()->json([
                'message' => 'No contests found',
            ], 404);
        }

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }

        return response()->json([
            'contests' => $contests,
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
        $contest = Contest::where('id', $contest_id)->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        if ($contest->status == 'upcoming'){
            return response()->json([
                'message' => 'Can\'t access upcoming contest',
            ], 400);
        }

        if($contest->type == 'private'){
            $contestParticipant = ContestParticipant::where('contest_id', $contest_id)
                ->where('user_id', auth()->id())
                ->first();

            if(!$contestParticipant){
                return response()->json([
                    'message' => 'You are not registered for this contest',
                ], 403);
            }
        }

        // now the contest is either active or ended and also if private then the user is registered for it

        $Problems = [];
        $contestProblems = ContestProblem::where('contest_id', $contest_id)->orderBy('order', 'asc')->get();

        foreach ($contestProblems as $contestProblem) {
            $problem = Problem::where('id', $contestProblem->problem_id)->first();
            $Problems[] = [
                'problem_id' => $problem->id,
                'title' => $problem->title,
                'xp' => $problem->xp,
                'points' => $contestProblem->points,
                'order' => $contestProblem->order,
            ];
        }

        return response()->json([
            'contest' => $contest,
            'problems' => $Problems
        ]);
    }



    /**
     * * Get contests of a date or earlier.
     * 
     * @param string $date
     * @return \Illuminate\Http\JsonResponse
     */
    public function contestsOfDate($date)
    {
        $validatedDate = \DateTime::createFromFormat('Y-m-d', $date);
        if (!$validatedDate || $validatedDate->format('Y-m-d') !== $date) {
            return response()->json([
                'message' => 'Invalid date format. Please use Y-m-d format.',
            ], 400);
        }
    
        $contests = Contest::where('start_time', '<=', $date)->get();

        if(count($contests) == 0){
            return response()->json([
                'message' => 'No contests found',
            ], 404);
        }

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }
    
        return response()->json([
            'contests' => $contests,
        ]);
    }


    /**
     * * Get contest of a date range.
     * 
     * @param string $start_date
     * @param string $end_date
     * @return \Illuminate\Http\JsonResponse
     */
    public function contestsOfDateRange($start_date, $end_date)
    {
        $validatedStartDate = \DateTime::createFromFormat('Y-m-d', $start_date);
        $validatedEndDate = \DateTime::createFromFormat('Y-m-d', $end_date);
        if (!$validatedStartDate || $validatedStartDate->format('Y-m-d') !== $start_date || !$validatedEndDate || $validatedEndDate->format('Y-m-d') !== $end_date) {
            return response()->json([
                'message' => 'Invalid date format. Please use Y-m-d format.',
            ], 400);
        }
    
        $contests = Contest::where('start_time', '>=', $start_date)
            ->where('end_time', '<=', $end_date)
            ->get();

        if(count($contests) == 0){
            return response()->json([
                'message' => 'No contests found',
            ], 404);
        }

        foreach($contests as $contest){
            $number_of_participants = ContestParticipant::where('contest_id', $contest->id)->count();
            $number_of_problems = ContestProblem::where('contest_id', $contest->id)->count();

            $contest->number_of_participants = $number_of_participants;
            $contest->number_of_problems = $number_of_problems;
        }
    
        return response()->json([
            'contests' => $contests,
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

        $contestParticipants = ContestParticipant::where('contest_id', $contest_id)->get();

        $participants = [];
        foreach($contestParticipants as $contestParticipant){
            $user = User::where('id', $contestParticipant->user_id)->first();
            $participants[] = [
                'user_id' => $user->id,
                'name' => $user->username,
                'registration_time' => $contestParticipant->created_at,
            ];
        }

        return response()->json([
            'participants' => $participants,
        ]);
    }


    /**
     * * Get all problems of a contest.
     * 
     * @param int $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function contestProblems($contest_id)
    {
        $contest = Contest::where('id', $contest_id)->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        $contestProblems = ContestProblem::where('contest_id', $contest_id)
                                        ->orderBy('order', 'asc')->get();

        $problems = [];
        foreach($contestProblems as $contestProblem){
            $problem = Problem::where('id', $contestProblem->problem_id)->first();
            $problems[] = [
                'problem_id' => $problem->id,
                'title' => $problem->title,
                'points' => $contestProblem->points,
                'order' => $contestProblem->order,
            ];
        }

        return response()->json([
            'problems' => $problems,
        ]);
    }



    /**
     * * Get contest status.
     * 
     * @param int $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function contestStatus($contest_id)
    {
        $contest = Contest::where('id', $contest_id)->first();

        if (!$contest) {
            return response()->json([
                'message' => 'Contest not found',
            ], 404);
        }

        return response()->json([
            'contest' => $contest,
        ]);
    }


    




    

    
}

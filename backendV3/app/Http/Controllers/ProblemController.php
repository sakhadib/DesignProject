<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;

use App\Models\Problem;
use App\Models\User;

class ProblemController extends Controller
{
    public function createProblem(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'xp' => 'required|integer',
            'answer' => 'required|string',
            'note' => 'nullable|string',
            'topics' => 'nullable|string',
            'target' => 'nullable|string'
        ]);

        $user = auth()->user();

        $topics = explode(',', $request->topics);
        $tags = [
            'target' => $request->target,
            'topics' => $topics
        ];

        $assignable_tags = json_encode($tags);
        
        $problem = new Problem();
        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->xp = $request->xp;
        $problem->answer = $request->answer;
        $problem->note = $request->note;
        $problem->tags = $assignable_tags;
        $problem->user_id = $user->id;
        $problem->save();

        return response()->json([
            'message' => 'Problem created successfully',
            'problem' => $problem
        ]);
    }

    public function editProblem(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'required|string',
            'xp' => 'required|integer',
            'answer' => 'required|string',
            'note' => 'nullable|string',
            'topics' => 'nullable|string',
            'target' => 'nullable|string'
        ]);

        $user = auth()->user();
        
        $problem = Problem::find($request->id);

        if (!$problem) {
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        if ($problem->user_id !== $user->id) {
            return response()->json([
                'message' => 'You are not authorized to edit this problem'
            ], 401);
        }

        if ($problem->isPublished()) {
            return response()->json([
                'message' => 'You cannot edit a problem that is published'
            ], 401);
        }

        $topics = explode(',', $request->topics);
        $tags = [
            'target' => $request->target,
            'topics' => $topics
        ];

        $savable_tags = json_encode($tags);

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->xp = $request->xp;
        $problem->answer = $request->answer;
        $problem->note = $request->note;
        $problem->tags = $savable_tags;
        $problem->save();

        return response()->json([
            'message' => 'Problem edited successfully',
            'problem' => $problem
        ]);
    }

    public function viewSingleProblem($id)
    {
        $problem = Problem::find($id);

        if (!$problem) {
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        $prob_title = $problem->title;
        $prob_description = $problem->description;
        $prob_xp = $problem->xp;
        $prob_tags = $problem->tags;

        return response()->json([
            'message' => 'Problem found',
            'problem' => [ 
                'id'=> $id,
                'title' => $prob_title,
                'description' => $prob_description,
                'xp' => $prob_xp,
                'tags' => $prob_tags
            ]
        ]);
    }

    public function viewAllProblems()
    {
        $problems = Problem::where('status', 'published')->get(['id','title', 'xp', 'tags', 'status']);

        if(count($problems) === 0) {
            return response()->json([
                'message' => 'No problems found'
            ], 404);
        }

        return response()->json([
            'problems' => $problems
        ]);
    }


    public function viewApprovedProblems()
    {
        $problems = Problem::where('status', 'approved')->get(['id','title', 'description', 'xp', 'tags']);

        if(count($problems) === 0) {
            return response()->json([
                'message' => 'No problems found'
            ], 404);
        }

        return response()->json([
            'problems' => $problems
        ]);
    }


    public function viewPendingProblems()
    {
        $problems = Problem::where('status', 'pending')->get(['id','title', 'xp', 'tags']);

        if(count($problems) === 0) {
            return response()->json([
                'message' => 'No problems found'
            ], 404);
        }

        return response()->json([
            'problems' => $problems
        ]);
    }


    public function myUnsolvedProblems()
    {
        $user = auth()->user();
        $submissions = Submission::where('user_id', $user->id)
                                 ->groupBy(['problem_id', 'user_id'])
                                 ->selectRaw('problem_id, max(xp) as xp, count(xp) as submission_count')
                                 ->get();

        $problems = [];
        foreach($submissions as $submission) {
            $problem = Problem::where('id', $submission->problem_id)
                              ->select('id', 'title', 'xp', 'tags')
                              ->first();

            $problem->recieved_max_xp = $submission->xp;
            $problem->total_submissions = $submission->submission_count;
            if ($submission->xp <= ($problem->xp * 0.4)) {
                $problems[] = $problem;
            }
        }

        if(count($problems) === 0) {
            return response()->json([
                'message' => 'No unsolved problems found'
            ], 404);
        }

        return response()->json([
            'problems' => $problems
        ]);
    }
}

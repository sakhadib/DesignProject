<?php

namespace App\Http\Controllers;

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
            'tags' => 'nullable|string'
        ]);

        $user = auth()->user();
        
        $problem = new Problem();
        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->xp = $request->xp;
        $problem->answer = $request->answer;
        $problem->note = $request->note;
        $problem->tags = $request->tags;
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
            'tags' => 'nullable|string'
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

        $problem->title = $request->title;
        $problem->description = $request->description;
        $problem->xp = $request->xp;
        $problem->answer = $request->answer;
        $problem->note = $request->note;
        $problem->tags = $request->tags;
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
        $prob_tags = json_decode($problem->tags, true);

        return response()->json([
            'message' => 'Problem found',
            'problem' => [
                'title' => $prob_title,
                'description' => $prob_description,
                'xp' => $prob_xp,
                'tags' => $prob_tags
            ]
        ]);
    }

    public function viewAllProblems()
    {
        $problems = Problem::where('status', 'published')->get(['id','title', 'xp', 'tags'])->map(function ($problem) {
            $problem->tags = json_decode($problem->tags, true);
            return $problem;
        });

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
        $problems = Problem::where('status', 'approved')->get(['id','title', 'xp', 'tags'])->map(function ($problem) {
            $problem->tags = json_decode($problem->tags, true);
            return $problem;
        });

        if(count($problems) === 0) {
            return response()->json([
                'message' => 'No problems found'
            ], 404);
        }

        return response()->json([
            'problems' => $problems
        ]);
    }



    /**
     * 
     */
}

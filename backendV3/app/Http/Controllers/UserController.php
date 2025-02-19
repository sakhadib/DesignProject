<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Problem;
use App\Models\Contest;
use App\Models\ContestProblem;
use App\Models\Submission;
use App\Models\ContestParticipant;
use App\Models\Blog;

class UserController extends Controller
{
    /**
     * get All user list
     * 
     * @return \Illuminate\Http\Response
     */
    public function allUsers()
    {
        $users = User::withCount(['blog', 'participatedContest', 'submission', 'problem'])->get();

        return response()->json(
            [
                'message' => 'All users list',
                'data' => $users
            ]
        );
    }




    /**
     * return the user details by user id
     * 
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function userDetails($user_id)
    {
        $user = User::where('id', $user_id)
                    ->with(['shortBlog'])
                    ->withCount(['participatedContest', 'submission', 'problem'])
                    ->first();

        $submissions = Submission::selectRaw('DATE(created_at) as date, COUNT(*) as submission_count')
                     ->where('user_id', $user_id)
                     ->groupBy('date')
                     ->get();

        $user->submissions_summary = $submissions;

        return response()->json(
            [
                'message' => 'User details',
                'data' => $user
            ]
        ); 
    }




    /**
     * Get user details by username
     * 
     * @param string $username
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserDetailsByUsername($username)
    {
        $user = User::where('username', $username)
                    ->with(['shortBlog'])
                    ->withCount(['participatedContest', 'submission', 'problem'])
                    ->first();

        $submissions = Submission::selectRaw('DATE(created_at) as date, COUNT(*) as submission_count')
                     ->where('user_id', $user->id)
                     ->groupBy('date')
                     ->get();

        $user->submissions_summary = $submissions;

        return response()->json(
            [
                'message' => 'User details',
                'data' => $user
            ]
        );
    }

}

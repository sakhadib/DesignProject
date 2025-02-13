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

}

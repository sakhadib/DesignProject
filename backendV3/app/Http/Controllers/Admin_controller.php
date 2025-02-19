<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Admin;
use App\Models\Problem;
use App\Models\Blog;
use App\Models\ContestProblem;
use App\Models\Contest;

class Admin_controller extends Controller
{
    /**
     * * Summary of isThisUserAdmin
     * 
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function isThisUserAdmin(){
        $user = auth()->user();
        $this_user = User::find($user->id);

        return response()->json([
            'admin status' => $this_user->isAdmin()
        ]);
    }

    /**
     * * Make a user an admin
     * ! Only admins can make a user an admin
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeAdmin(Request $request){
        $request->validate([
            'user_id' => 'required'
        ]);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to make this user an admin'
            ]);
        }
        
        $newAdminUser = User::find($request->user_id);
        $newAdminUser->makeAdmin();
        return response()->json([
            'message' => 'New Admin Added Successfully'
        ]);
    }


    /**
     * * Remove admin status from a user
     * ! Only admins can remove admin status from a user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeAdmin(Request $request){
        $request->validate([
            'user_id' => 'required'
        ]);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to remove admin status from this user'
            ]);
        }

        $newAdminUser = User::find($request->user_id);
        $admin = Admin::where('user_id', $newAdminUser->id)->first();
        $admin->delete();
        return response()->json([
            'message' => 'Admin status removed successfully'
        ]);
    }



    /**
     * * Approve a problem
     * ! Only admins can approve a problem
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function approveProblem(Request $request){
        $request->validate([
            'problem_id' => 'required'
        ]);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to approve a problem'
            ]);
        }

        $problem = Problem::find($request->problem_id);

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        $problem->approve();
        return response()->json([
            'message' => 'Problem approved successfully',
            'problem' => $problem
        ]);
    }

    /**
     * Summary of makeProblemStateToinContest
     * 
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function makeProblemStateToinContest(Request $request){
        $request->validate([
            'problem_id' => 'required'
        ]);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to approve a problem'
            ]);
        }

        $problem = Problem::find($request->problem_id);

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        $problem->inContest();
        return response()->json([
            'message' => 'Problem state changed to in contest successfully',
            'problem' => $problem
        ]);
    }


    /**
     * * Unpublish a problem
     * ! Only admins can unpublish a problem
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unpublishProblem(Request $request){
        $request->validate([
            'problem_id' => 'required'
        ]);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to unpublish a problem'
            ]);
        }

        $problem = Problem::find($request->problem_id);

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        $problem->unpublish();
        return response()->json([
            'message' => 'Problem unpublished successfully',
            'problem' => $problem
        ]);
    }


    /**
     * Get problem of a contest
     * 
     * @param $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getContestProblems($contest_id){
        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to view contest problems'
            ]);
        }

        $problems = ContestProblem::where('contest_id', $contest_id)
                                  ->with('singleProblem')
                                  ->get();

        return response()->json([
            'message' => 'Contest problems',
            'problems' => $problems
        ]);

    }


    /**
     * * Remove a problem
     * ! Only admins can remove a problem. Once problem is published, it cannot be removed. It can only be unpublished
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeProblem(Request $request){
        $request->validate([
            'problem_id' => 'required'
        ]);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to remove a problem'
            ]);
        }

        $problem = Problem::find($request->problem_id);

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        if($problem->isPublished()){
            return response()->json([
                'message' => 'Published problems cannot be removed. Unpublish it first'
            ]);
        }

        $problem->delete();
        return response()->json([
            'message' => 'Problem removed successfully'
        ]);
    }





    /**
     * * Get a problem
     * 
     * @param $problem_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleProblem($problem_id){
        $problem = Problem::find($problem_id);

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to remove a problem'
            ]);
        }

        if(!$problem){
            return response()->json([
                'message' => 'Problem not found'
            ], 404);
        }

        return response()->json([
            'messege' => 'Problem found',
            'problem' => $problem
        ]);
    }



    /**
     * * Get single contest
     * 
     * @param $contest_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleContest($contest_id){

        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to view contest'
            ]);
        }

        $contest = Contest::where('id', $contest_id)
                          ->with(['user:id,username'])
                          ->withCount(['participants', 'problems', 'submissions'])
                          ->get();;

        if(!$contest){
            return response()->json([
                'message' => 'Contest not found'
            ], 404);
        }

        return response()->json([
            'messege' => 'Contest found',
            'contest' => $contest
        ]);
    }




    /**
     * Admin gets user list
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserList(){
        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to view user list'
            ]);
        }

        $users = User::withCount(['problem', 'blog'])->get();

        foreach($users as $user){
            $user->admin = $user->isAdmin();
        }

        return response()->json([
            'message' => 'User list',
            'users' => $users
        ]);
    }



    /**
     * Get everything of specific user
     * 
     * get only 'id', 'title', 'xp' for related problems
     * get only 'id', 'title', for related blogs
     * 
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser($user_id){
        $this_user = auth()->user();
        $is_this_user_admin = User::find($this_user->id)->isAdmin();

        if(!$is_this_user_admin){
            return response()->json([
                'message' => 'You do not have permission to view user list'
            ]);
        }

        $user = User::withCount(['blog', 'problem'])->find($user_id);

        $problems = Problem::where('user_id', $user_id)->get(['id', 'title', 'xp', 'tags']);
        $blogs = Blog::where('user_id', $user_id)->get(['id', 'title']);
        $user->admin = $user->isAdmin();

        return response()->json([
            'message' => 'User found',
            'user' => $user,
            'blogs' => $blogs,
            'problems' => $problems,
        ]);
    }
}

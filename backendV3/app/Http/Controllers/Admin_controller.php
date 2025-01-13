<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Admin;
use App\Models\Problem;

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

        $problem->publish();
        return response()->json([
            'message' => 'Problem approved successfully',
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
}

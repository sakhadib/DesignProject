<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Notice;
use App\Models\User;

class NoticeController extends Controller
{
    /**
     * * Create a new notice
     * ! Only admins can create a notice
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNotice(Request $request){
        $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);

        $user = auth()->user();

        $full_user = User::find($user->id);
        if(!$full_user->isAdmin()){
            return response()->json([
                'message' => 'You do not have permission to create a notice'
            ], 401);
        }

        $notice = new Notice();
        $notice->title = $request->title;
        $notice->content = $request->content;
        $notice->user_id = $user->id;
        $notice->save();

        return response()->json([
            'message' => 'Notice created successfully',
            'notice' => $notice
        ]);
    }

    /**
     * * Update a notice
     * ! Only the creator of the notice can update it. Hence, only admins can update their own notices
     * 
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateNotice(Request $request){
        $request->validate([
            'id' => 'required',
            'title' => 'required',
            'content' => 'required'
        ]);

        $id = $request->id;

        $user = auth()->user();

        $full_user = User::find($user->id);
        if(!$full_user->isAdmin()){
            return response()->json([
                'message' => 'You do not have permission to update a notice'
            ], 401);
        }


        $notice = Notice::find($id);

        if(!$notice){
            return response()->json([
                'message' => 'Notice not found'
            ], 404);
        }

        if($notice->user_id != $user->id){
            return response()->json([
                'message' => 'You do not have permission to update this notice'
            ], 401);
        }

        $notice->title = $request->title;
        $notice->content = $request->content;
        $notice->save();

        return response()->json([
            'message' => 'Notice updated successfully',
            'notice' => $notice
        ], 200);
    }


    /**
     * * Delete a notice
     * ! Only the creator of the notice can delete it. Hence, only admins can delete their own notices
     * 
     * @param request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteNotice(Request $request){
        $request->validate([
            'id' => 'required'
        ]);

        $user = auth()->user();

        $full_user = User::find($user->id);
        if(!$full_user->isAdmin()){
            return response()->json([
                'message' => 'You do not have permission to delete a notice'
            ], 401);
        }

        $notice = Notice::find($request->id);

        if(!$notice){
            return response()->json([
                'message' => 'Notice not found'
            ], 404);
        }

        if($notice->user_id != $user->id){
            return response()->json([
                'message' => 'You do not have permission to delete this notice'
            ], 401);
        }

        $notice->delete();

        return response()->json([
            'message' => 'Notice deleted successfully'
        ], 200);
    }


    /**
     * * Get all notices
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function allNotices(){
        $notices = Notice::all();
        return response()->json([
            'notices' => $notices
        ]);
    }


    /**
     * * Get a single notice by id
     * 
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function singleNotice($id){
        $notice = Notice::find($id);

        if(!$notice){
            return response()->json([
                'message' => 'Notice not found'
            ], 404);
        }

        return response()->json([
            'notice' => $notice
        ], 200);
    }


    /**
     * * Get Top 5 notices by created_at
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function topNotices(){
        $notices = Notice::orderBy('created_at', 'desc')->take(5)->get();

        if(count($notices) == 0){
            return response()->json([
                'message' => 'No notices found'
            ], 404);
        }

        return response()->json([
            'notices' => $notices
        ]);
    }


    /**
     * * Get Notices by user_id
     * 
     * @param $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function userNotices($user_id){

        $user = User::find($user_id);
        
        if(!$user){
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if(!$user->isAdmin()){
            return response()->json([
                'message' => 'This user is not an admin. So he/she cannot have any notices'
            ], 401);
        }

        $notices = Notice::where('user_id', $user_id)->get();

        if(count($notices) == 0){
            return response()->json([
                'message' => 'No notices found'
            ], 404);
        }

        return response()->json([
            'user' => $user,
            'notices' => $notices
        ]);
    }

}

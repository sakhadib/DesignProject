<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class Admin_controller extends Controller
{
    public function isThisUserAdmin(){
        $user = auth()->user();
        $this_user = User::find($user->id);

        return response()->json([
            'admin status' => $this_user->isAdmin()
        ]);
    }

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
}

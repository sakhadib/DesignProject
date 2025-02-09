<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Models\Blog;
use App\Models\User;

class CommentController extends Controller
{
    public function createComment(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'blog_id' => 'required|integer',
            'parent_id' => 'nullable|integer',
        ]);

        $blog = Blog::find($request->blog_id);

        if (!$blog) {
            return response()->json([
                'message' => 'Blog not found'
            ], 404);
        }

        $comment = new Comment();
        $comment->content = $request->content;
        $comment->blog_id = $request->blog_id;
        $comment->user_id = auth()->user()->id;
        $comment->parent_id = $request->parent_id;
        $comment->save();

        $returnableComment = Comment::with('user:id,username')->find($comment->id);

        return response()->json([
            'message' => 'Comment created successfully',
            'comment' => $returnableComment
        ], 201);
    }




    public function editComment(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'comment_id' => 'required|integer',
        ]);

        $comment = Comment::find($request->comment_id);

        if (!$comment) {
            return response()->json([
                'message' => 'Comment not found'
            ], 404);
        }

        if (!$comment->canBeUpdated()) {
            return response()->json([
                'message' => 'You are not authorized to update this comment'
            ], 401);
        }

        $comment->content = $request->content;
        $comment->save();

        return response()->json([
            'message' => 'Comment updated successfully',
            'comment' => $comment->with('user:id,username')->find($comment->id)
        ], 200);
    }



    public function deleteComment(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|integer',
        ]);

        $comment = Comment::find($request->comment_id);

        if (!$comment) {
            return response()->json([
                'message' => 'Comment not found'
            ], 404);
        }

        if (!$comment->canBeDeleted()) {
            return response()->json([
                'message' => 'You are not authorized to delete this comment'
            ], 401);
        }

        $comment->delete();
        return response()->json([
            'message' => 'Comment deleted successfully'
        ], 200);
    }
}

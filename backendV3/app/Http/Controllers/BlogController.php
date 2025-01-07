<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\User;

class BlogController extends Controller
{
    public function createBlog(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
        ]);

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->content = $request->content;
        $blog->category = $request->category;
        $blog->user_id = auth()->user()->id;
        $blog->save();

        return response()->json([
            'message' => 'Blog created successfully',
            'blog' => $blog
        ], 201);
    }


    public function deleteBlog(Request $request)
    {
       
        $blog = Blog::find($request->id);

        if (!$blog) {
            return response()->json([
                'message' => 'Blog not found'
            ], 404);
        }

        $current_user = auth()->user();
        $blog_author = User::find($blog->user_id);

        if ($current_user->id !== $blog_author->id) {
            return response()->json([
                'message' => 'You are not authorized to delete this blog'
            ], 401);
        }

        $blog->delete();
        return response()->json([
            'message' => 'Blog deleted successfully'
        ], 200);
    }

}

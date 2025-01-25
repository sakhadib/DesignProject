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

    public function editBlog(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
        ]);

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
                'message' => 'You are not authorized to edit this blog'
            ], 401);
        }

        $blog->title = $request->title;
        $blog->content = $request->content;
        $blog->category = $request->category;
        $blog->save();

        return response()->json([
            'message' => 'Blog updated successfully',
            'blog' => $blog
        ], 200);
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

    public function allBlogs()
    {
        $blogs = Blog::with(['user:id,username'])
            ->withCount('votes', 'comments', 'upVotes', 'downVotes')
            ->withSum('votes', 'vote')
            ->with('myvote')
            ->get(['id', 'title', 'category', 'created_at', 'updated_at']);

        $user_id = auth()->user()->id;


        return response()->json([
            'blogs' => $blogs
        ], 200);
    }

    public function singleBlog($id)
    {
        $blog = Blog::with(['user:id,username', 'comments', 'votes'])
            ->withCount('votes', 'comments', 'upVotes', 'downVotes')
            ->withSum('votes', 'vote')
            ->with('myvote')
            ->find($id, ['id', 'title', 'content', 'category', 'created_at', 'updated_at']);

        if (!$blog) {
            return response()->json([
                'message' => 'Blog not found'
            ], 404);
        }

        // $blog->votes_count = $blog->votes->count();
        // $blog->votes_sum = $blog->votes->sum('vote');
        // $blog->comments_count = $blog->comments->count();

        // $user_vote = $blog->votes->where('user_id', auth()->user()->id)->first();

        // $blog->user_vote = $user_vote ? $user_vote->vote : null;
        

        return response()->json([
            'blog' => $blog
        ], 200);
    }


}

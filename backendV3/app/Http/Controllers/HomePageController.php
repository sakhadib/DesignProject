<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models;
use Illuminate\Database\Eloquent\Model;

class HomePageController extends Controller
{
    public function generalCounts()
    {
        $user_count = Models\User::count();
        $problem_count = Models\Problem::where('status', 'published')->count();
        $public_contest_count = Models\Contest::where('type', 'admin-created')->count();
        $private_contest_count = Models\Contest::where('type', 'user-created')->count();
        $in_contest_submission_count = Models\Submission::whereNotNull('contest_id')->count();
        $out_contest_submission_count = Models\Submission::whereNull('contest_id')->count();
        $total_submission_count = Models\Submission::count();
        $blogs_count = Models\Blog::count();
        $comments_count = Models\Comment::count();
        $upVotes_count = Models\Vote::where('vote', 1)->count();
        $downVotes_count = Models\Vote::where('vote', 0)->count();
        $notices_count = Models\Notice::count();

        $count = [
            'user_count' => $user_count,
            'problem_count' => $problem_count,
            'public_contest_count' => $public_contest_count,
            'private_contest_count' => $private_contest_count,
            'in_contest_submission_count' => $in_contest_submission_count,
            'out_contest_submission_count' => $out_contest_submission_count,
            'total_submission_count' => $total_submission_count,
            'blogs_count' => $blogs_count,
            'comments_count' => $comments_count,
            'upVotes_count' => $upVotes_count,
            'downVotes_count' => $downVotes_count,
            'notices_count' => $notices_count
        ];

        return response()->json(['counts' => $count], 200);
    }

    public function LatestThreeNotices()
    {
        $notices = Models\Notice::orderBy('created_at', 'desc')
                                ->with('user:id,username')
                                ->take(3)->get();
        return response()->json([
            'notices' => $notices
        ], 200);
    }

    public function TopThreeBlogByUpvotes()
    {
        $blogs = Models\Vote::where('vote', 1)
                            ->groupBy('blog_id')
                            ->selectRaw('blog_id, count(*) as total')
                            ->orderBy('total', 'desc')
                            ->take(3)
                            ->get();

        $top_blogs = [];
        foreach ($blogs as $b) {
            $blog = Models\Blog::where('id', $b->blog_id)
                                      ->with('user:id,username')
                                      ->first(['id', 'title', 'content', 'user_id', 'created_at']);

            $blog->total_upvotes = $b->total;
            $top_blogs[] = $blog;
        }

        return response()->json([
            'blogs' => $top_blogs
        ], 200);
    }

    public function TopThreeProblemBySubmissions()
    {
        $problems = Models\Submission::groupBy('problem_id')
                                    ->selectRaw('problem_id, count(*) as total')
                                    ->orderBy('total', 'desc')
                                    ->take(3)
                                    ->get();

        $top_problems = [];
        foreach ($problems as $problem) {
            $this_problem = Models\Problem::where('id', $problem->problem_id)
                                            ->first(['id', 'title', 'tags', 'created_at']);
            $this_problem->total_submissions = $problem->total;
            $top_problems[] = $this_problem;
                                        
        }

        return response()->json([
            'problems' => $top_problems
        ], 200);
    }

    public function topThreeUserByRating()
    {
        $ratings = Models\Rating::groupBy('user_id')
                                ->selectRaw('user_id, sum(rating_change) as total')
                                ->orderBy('total', 'desc')
                                ->take(3)
                                ->get();

        $top_users = [];
        foreach ($ratings as $rating) {
            $this_user = Models\User::where('id', $rating->user_id)
                                    ->first(['id', 'username']);
            $this_user->total_rating = $rating->total;
            $top_users[] = $this_user;
        }

        return response()->json([
            'users' => $top_users
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Admin;
use App\Models\Problem;
use App\Models\Blog;
use App\Models\ContestProblem;
use App\Models\Contest;
use App\Models\Notice;
use App\Models\Submission;


class DashboardController extends Controller
{
    public function commonCountValues()
    {
        $userCount = User::count();
        $problemCount = Problem::where('status', 'published')->count();
        $blogCount = Blog::count();
        $publicContestCount = Contest::where('type', 'admin-created')->count();
        $privateContestCount = Contest::where('type', 'user-created')->count();
        $noticeCount = Notice::count();
        $inContestSubmissionCount = Submission::where('contest_id', '!=', null)->count();
        $outContestSubmissionCount = Submission::where('contest_id', null)->count();

        return response()->json([
            'user_count' => $userCount,
            'problem_count' => $problemCount,
            'blog_count' => $blogCount,
            'public_contest_count' => $publicContestCount,
            'private_contest_count' => $privateContestCount,
            'notice_count' => $noticeCount,
            'in_contest_submission_count' => $inContestSubmissionCount,
            'out_contest_submission_count' => $outContestSubmissionCount
        ]);         
    }
}

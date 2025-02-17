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
use Illuminate\Support\Facades\DB;


class DashboardController extends Controller
{
    /**
     * Summary of commonCountValues
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function commonCountValues()
    {
        $this_year = date('Y');
        
        $userCount = User::count();
        $problemCount = Problem::where('status', 'published')->count();
        $blogCount = Blog::count();
        $publicContestCount = Contest::where('type', 'admin-created')->count();


        $this_year_data = [
            'user_count' => User::whereYear('created_at', $this_year)->count(),
            'problem_count' => Problem::where('status', 'published')
                                      ->whereYear('created_at', $this_year)->count(),
            'blog_count' => Blog::whereYear('created_at', $this_year)->count(),
            'public_contest_count' => Contest::where('type', 'admin-created')
                                             ->whereYear('created_at', $this_year)->count(),
        ];

        return response()->json([
            'user_count' => $userCount,
            'problem_count' => $problemCount,
            'blog_count' => $blogCount,
            'public_contest_count' => $publicContestCount,
            'this_year_data' => $this_year_data
        ]);         
    }


    /**
     * Summary of getInContestSubmissionCount
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function getInContestSubmissionCount()
    {
        $submissionCount = Submission::where('contest_id', '!=', null)->count();

        $submissionCountsByDay = Submission::select(DB::raw('DAYOFWEEK(created_at) as day_of_week'), DB::raw('COUNT(*) as count'))
        ->where('contest_id', '!=', null)
        ->groupBy(DB::raw('DAYOFWEEK(created_at)'))
        ->orderBy(DB::raw('DAYOFWEEK(created_at)'))
        ->get()
        ->mapWithKeys(function ($item) {
            $dayMap = [
                1 => 'sun',
                2 => 'mon',
                3 => 'tue',
                4 => 'wed',
                5 => 'thu',
                6 => 'fri',
                7 => 'sat',
            ];

            return [$dayMap[$item->day_of_week] => $item->count];
        });       
        
        $submissionCountByMonth = Submission::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
        ->where('contest_id', '!=', null)
        ->groupBy(DB::raw('MONTH(created_at)'))
        ->orderBy(DB::raw('MONTH(created_at)'))
        ->get()
        ->mapWithKeys(function ($item) {
            $monthMap = [
                1 => 'jan',
                2 => 'feb',
                3 => 'mar',
                4 => 'apr',
                5 => 'may',
                6 => 'jun',
                7 => 'jul',
                8 => 'aug',
                9 => 'sep',
                10 => 'oct',
                11 => 'nov',
                12 => 'dec',
            ];

            return [$monthMap[$item->month] => $item->count];
        });


        $submissionCountByYear = Submission::select(DB::raw('YEAR(created_at) as year'), DB::raw('COUNT(*) as count'))
        ->where('contest_id', '!=', null)
        ->groupBy(DB::raw('YEAR(created_at)'))
        ->orderBy(DB::raw('YEAR(created_at)'))
        ->get()
        ->mapWithKeys(function ($item) {
            return [$item->year => $item->count];
        });

        return response()->json([
            'message' => 'Submission count in contest',
            'total_submission_count' => $submissionCount,
            'submission_counts_by_day' => $submissionCountsByDay,
            'submission_count_by_month' => $submissionCountByMonth,
            'submission_count_by_year' => $submissionCountByYear
        ]);
    }


    /**
     * Summary of getOutContestSubmissionCount
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function getOutContestSubmissionCount()
    {
        $submissionCount = Submission::where('contest_id', null)->count();

        $submissionCountsByDay = Submission::select(DB::raw('DAYOFWEEK(created_at) as day_of_week'), DB::raw('COUNT(*) as count'))
        ->where('contest_id', null)
        ->groupBy(DB::raw('DAYOFWEEK(created_at)'))
        ->orderBy(DB::raw('DAYOFWEEK(created_at)'))
        ->get()
        ->mapWithKeys(function ($item) {
            $dayMap = [
                1 => 'sun',
                2 => 'mon',
                3 => 'tue',
                4 => 'wed',
                5 => 'thu',
                6 => 'fri',
                7 => 'sat',
            ];

            return [$dayMap[$item->day_of_week] => $item->count];
        });       
        
        $submissionCountByMonth = Submission::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
        ->where('contest_id', null)
        ->groupBy(DB::raw('MONTH(created_at)'))
        ->orderBy(DB::raw('MONTH(created_at)'))
        ->get()
        ->mapWithKeys(function ($item) {
            $monthMap = [
                1 => 'jan',
                2 => 'feb',
                3 => 'mar',
                4 => 'apr',
                5 => 'may',
                6 => 'jun',
                7 => 'jul',
                8 => 'aug',
                9 => 'sep',
                10 => 'oct',
                11 => 'nov',
                12 => 'dec',
            ];

            return [$monthMap[$item->month] => $item->count];
        });


        $submissionCountByYear = Submission::select(DB::raw('YEAR(created_at) as year'), DB::raw('COUNT(*) as count'))
        ->where('contest_id', null)
        ->groupBy(DB::raw('YEAR(created_at)'))
        ->orderBy(DB::raw('YEAR(created_at)'))
        ->get()
        ->mapWithKeys(function ($item) {
            return [$item->year => $item->count];
        });

        return response()->json([
            'message' => 'Submission count out contest',
            'total_submission_count' => $submissionCount,
            'submission_counts_by_day' => $submissionCountsByDay,
            'submission_count_by_month' => $submissionCountByMonth,
            'submission_count_by_year' => $submissionCountByYear
        ]);
    }



   
}
